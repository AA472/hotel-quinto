import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization")?.replace("Bearer ", "");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabase()
    .from("channel_feeds")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ feeds: data });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, source, room_type_id, ical_url } = body;

  if (!name || !source || !room_type_id || !ical_url) {
    return NextResponse.json(
      { error: "name, source, room_type_id, and ical_url are required" },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabase()
    .from("channel_feeds")
    .insert({ name, source, room_type_id, ical_url })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ feed: data }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from("channel_feeds")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
