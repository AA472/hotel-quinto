import { NextRequest, NextResponse } from "next/server";
import { getAllBookings, updateBookingStatus } from "@/lib/booking/store";
import type { Booking } from "@/lib/booking/types";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await getAllBookings();
  return NextResponse.json({ bookings });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = (await req.json()) as {
    id: string;
    status: Booking["status"];
  };

  if (!id || !status) {
    return NextResponse.json(
      { error: "id and status required" },
      { status: 400 }
    );
  }

  await updateBookingStatus(id, status);
  return NextResponse.json({ success: true });
}
