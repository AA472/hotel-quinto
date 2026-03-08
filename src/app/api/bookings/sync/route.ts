import { NextRequest, NextResponse } from "next/server";
import { syncAllFeeds } from "@/lib/booking/ical-sync";

// ─── iCal Sync Endpoint ─────────────────────────────────────────────────────
// Called by Vercel Cron every 15 minutes to pull bookings from OTA channels.
// Can also be triggered manually from the admin panel.
//
// Protected by CRON_SECRET (set in Vercel environment variables).

export async function GET(req: NextRequest) {
  // Verify cron secret or admin password
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const token = authHeader?.replace("Bearer ", "");
  if (token !== cronSecret && token !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await syncAllFeeds();
    return NextResponse.json({
      success: true,
      synced_at: new Date().toISOString(),
      results,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Sync failed" },
      { status: 500 }
    );
  }
}
