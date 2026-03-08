// ─── Simple iCal Parser ──────────────────────────────────────────────────────
// Parses VEVENT blocks from iCal feeds (Booking.com, Airbnb, etc.)

export interface ICalEvent {
  uid: string;
  summary: string;
  dtstart: string; // YYYY-MM-DD
  dtend: string; // YYYY-MM-DD
  description?: string;
}

function parseICalDate(value: string): string {
  // Handles: 20260315 or 20260315T120000Z or 2026-03-15
  const clean = value.replace(/[^0-9]/g, "").slice(0, 8);
  if (clean.length !== 8) return value;
  return `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
}

function unfold(text: string): string {
  // iCal line folding: lines starting with space/tab are continuations
  return text.replace(/\r?\n[ \t]/g, "");
}

export function parseICal(icalText: string): ICalEvent[] {
  const unfolded = unfold(icalText);
  const lines = unfolded.split(/\r?\n/);
  const events: ICalEvent[] = [];

  let inEvent = false;
  let current: Partial<ICalEvent> = {};

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      current = {};
      continue;
    }

    if (line === "END:VEVENT") {
      inEvent = false;
      if (current.uid && current.dtstart && current.dtend) {
        events.push({
          uid: current.uid,
          summary: current.summary || "Blocked",
          dtstart: current.dtstart,
          dtend: current.dtend,
          description: current.description,
        });
      }
      continue;
    }

    if (!inEvent) continue;

    // Parse property:value, handling parameters like DTSTART;VALUE=DATE:20260315
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).split(";")[0].toUpperCase();
    const value = line.slice(colonIdx + 1).trim();

    switch (key) {
      case "UID":
        current.uid = value;
        break;
      case "SUMMARY":
        current.summary = value.replace(/\\n/g, " ").replace(/\\,/g, ",");
        break;
      case "DTSTART":
        current.dtstart = parseICalDate(value);
        break;
      case "DTEND":
        current.dtend = parseICalDate(value);
        break;
      case "DESCRIPTION":
        current.description = value.replace(/\\n/g, "\n").replace(/\\,/g, ",");
        break;
    }
  }

  return events;
}
