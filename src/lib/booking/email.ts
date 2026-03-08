import type { Booking } from "./types";
import { getRoomType } from "./rooms";

// ─── Email Notifications via Resend ──────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const HOTEL_EMAIL = process.env.HOTEL_EMAIL || "info@hotelquinto.com";

export async function sendBookingNotification(
  booking: Booking
): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const room = getRoomType(booking.roomTypeId);
  const roomName = room?.nameEn || booking.roomTypeId;

  // Email to hotel
  await sendEmail({
    to: HOTEL_EMAIL,
    subject: `New Booking ${booking.id} — ${booking.guestName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1c1917;">New Booking Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #78716c;">Reference</td><td style="padding: 8px 0; font-weight: bold;">${booking.id}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Guest</td><td style="padding: 8px 0;">${booking.guestName}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Email</td><td style="padding: 8px 0;">${booking.guestEmail}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Phone</td><td style="padding: 8px 0;">${booking.guestPhone}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Room</td><td style="padding: 8px 0;">${roomName}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Check-in</td><td style="padding: 8px 0;">${booking.checkIn}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Check-out</td><td style="padding: 8px 0;">${booking.checkOut}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Nights</td><td style="padding: 8px 0;">${booking.nights}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Guests</td><td style="padding: 8px 0;">${booking.adults} adults${booking.children ? `, ${booking.children} children` : ""}</td></tr>
          <tr><td style="padding: 8px 0; color: #78716c;">Total</td><td style="padding: 8px 0; font-weight: bold;">$${booking.totalPriceUSD} USD</td></tr>
          ${booking.specialRequests ? `<tr><td style="padding: 8px 0; color: #78716c;">Requests</td><td style="padding: 8px 0;">${booking.specialRequests}</td></tr>` : ""}
        </table>
      </div>
    `,
  });

  // Confirmation email to guest
  if (booking.guestEmail) {
    await sendEmail({
      to: booking.guestEmail,
      subject: `Booking Confirmed — Hotel Quinto (${booking.id})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1c1917;">Your Booking is Confirmed!</h2>
          <p style="color: #57534e;">Thank you for choosing Hotel Quinto. Here are your booking details:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #78716c;">Reference</td><td style="padding: 8px 0; font-weight: bold;">${booking.id}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Room</td><td style="padding: 8px 0;">${roomName}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Check-in</td><td style="padding: 8px 0;">${booking.checkIn} (from 4:00 PM)</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Check-out</td><td style="padding: 8px 0;">${booking.checkOut} (until 2:00 PM)</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Guests</td><td style="padding: 8px 0;">${booking.adults + booking.children}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Total</td><td style="padding: 8px 0; font-weight: bold;">$${booking.totalPriceUSD} USD</td></tr>
          </table>
          <p style="color: #57534e; margin-top: 20px;">Free cancellation up to 48 hours before check-in.</p>
          <p style="color: #57534e;">Questions? Contact us on <a href="https://wa.me/573202190476">WhatsApp</a> or email <a href="mailto:info@hotelquinto.com">info@hotelquinto.com</a></p>
          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 20px 0;" />
          <p style="color: #a8a29e; font-size: 12px;">Hotel Quinto · Montenegro, Quindío, Colombia</p>
        </div>
      `,
    });
  }
}

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hotel Quinto <bookings@hotelquinto.com>",
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Email send failed:", err);
    }
  } catch (e) {
    console.error("Email send error:", e);
  }
}
