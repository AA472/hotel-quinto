import { NextRequest, NextResponse } from "next/server";
import { checkAvailability } from "@/lib/booking/availability";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  if (!checkIn || !checkOut) {
    return NextResponse.json(
      { error: "checkIn and checkOut are required" },
      { status: 400 }
    );
  }

  const ciDate = new Date(checkIn);
  const coDate = new Date(checkOut);
  if (isNaN(ciDate.getTime()) || isNaN(coDate.getTime())) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD" },
      { status: 400 }
    );
  }
  if (coDate <= ciDate) {
    return NextResponse.json(
      { error: "checkOut must be after checkIn" },
      { status: 400 }
    );
  }

  const results = await checkAvailability({
    checkIn,
    checkOut,
    guests: guests ? parseInt(guests, 10) : undefined,
  });

  return NextResponse.json({ availability: results });
}
