"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Users,
  RefreshCw,
  Plus,
  Trash2,
  LogIn,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Link,
  ChevronDown,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Booking {
  id: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  adults: number;
  children: number;
  specialRequests?: string;
  status: string;
  source: string;
  totalPriceUSD: number;
  createdAt: string;
}

interface Feed {
  id: string;
  name: string;
  source: string;
  room_type_id: string;
  ical_url: string;
  enabled: boolean;
  last_synced_at: string | null;
}

interface SyncResult {
  feed: string;
  created: number;
  updated: number;
  errors: string[];
}

const ROOM_NAMES: Record<string, string> = {
  standard: "Standard Room",
  family: "Family Suite",
  premium: "Premium Suite",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  checked_in: "bg-blue-100 text-blue-800",
  checked_out: "bg-stone-100 text-stone-600",
  no_show: "bg-red-100 text-red-600",
};

const SOURCE_COLORS: Record<string, string> = {
  direct: "bg-amber-100 text-amber-800",
  "booking.com": "bg-blue-100 text-blue-800",
  airbnb: "bg-rose-100 text-rose-800",
  expedia: "bg-yellow-100 text-yellow-800",
  other: "bg-stone-100 text-stone-600",
};

// ─── Main Admin Page ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<"bookings" | "channels" | "ical">(
    "bookings"
  );

  function login() {
    setToken(password);
    setAuthed(true);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 w-full max-w-sm">
          <h1 className="font-heading text-2xl font-bold text-stone-900 mb-6 text-center">
            Hotel Quinto Admin
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none mb-4"
          />
          <button
            onClick={login}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 flex h-14 items-center justify-between">
          <h1 className="font-heading text-lg font-bold text-stone-900">
            Hotel <span className="text-amber-700">Quinto</span> — Admin
          </h1>
          <div className="flex gap-1">
            {(
              [
                ["bookings", "Bookings"],
                ["channels", "Channels"],
                ["ical", "iCal Feeds"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === key
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === "bookings" && <BookingsTab token={token} />}
        {tab === "channels" && <ChannelsTab token={token} />}
        {tab === "ical" && <ICalTab />}
      </main>
    </div>
  );
}

// ─── Bookings Tab ────────────────────────────────────────────────────────────

function BookingsTab({ token }: { token: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load bookings");
      const data = await res.json();
      setBookings(data.bookings);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    fetchBookings();
  }

  const today = new Date().toISOString().split("T")[0];
  const filtered = bookings.filter((b) => {
    if (filter === "upcoming")
      return b.checkOut >= today && b.status !== "cancelled";
    if (filter === "past") return b.checkOut < today;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(["upcoming", "all", "past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-stone-200 text-stone-900"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({
                bookings.filter((b) => {
                  if (f === "upcoming")
                    return b.checkOut >= today && b.status !== "cancelled";
                  if (f === "past") return b.checkOut < today;
                  return true;
                }).length
              })
            </button>
          ))}
        </div>
        <button
          onClick={fetchBookings}
          className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <Calendar className="h-8 w-8 mx-auto mb-3" />
          <p>No bookings found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl border border-stone-200 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-bold text-stone-900">
                      {b.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[b.status] || "bg-stone-100"}`}
                    >
                      {b.status}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${SOURCE_COLORS[b.source] || "bg-stone-100"}`}
                    >
                      {b.source}
                    </span>
                  </div>
                  <p className="font-semibold text-stone-900">
                    {b.guestName}
                  </p>
                  <p className="text-sm text-stone-500">
                    {b.guestEmail} · {b.guestPhone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-500">
                    {ROOM_NAMES[b.roomTypeId] || b.roomTypeId}
                  </p>
                  <p className="text-sm font-medium text-stone-900">
                    {b.checkIn} → {b.checkOut}
                  </p>
                  <p className="text-sm text-stone-500">
                    {b.nights} nights · {b.adults + b.children} guests
                  </p>
                  <p className="font-bold text-stone-900 mt-1">
                    ${b.totalPriceUSD} USD
                  </p>
                </div>
              </div>
              {b.specialRequests && (
                <p className="text-sm text-stone-500 mt-3 border-t border-stone-100 pt-3">
                  {b.specialRequests}
                </p>
              )}
              <div className="flex gap-2 mt-3 pt-3 border-t border-stone-100">
                <StatusButton
                  current={b.status}
                  target="confirmed"
                  icon={<CheckCircle className="h-3.5 w-3.5" />}
                  onClick={() => updateStatus(b.id, "confirmed")}
                />
                <StatusButton
                  current={b.status}
                  target="checked_in"
                  icon={<LogIn className="h-3.5 w-3.5" />}
                  label="Check In"
                  onClick={() => updateStatus(b.id, "checked_in")}
                />
                <StatusButton
                  current={b.status}
                  target="checked_out"
                  icon={<Clock className="h-3.5 w-3.5" />}
                  label="Check Out"
                  onClick={() => updateStatus(b.id, "checked_out")}
                />
                <StatusButton
                  current={b.status}
                  target="cancelled"
                  icon={<XCircle className="h-3.5 w-3.5" />}
                  onClick={() => updateStatus(b.id, "cancelled")}
                  danger
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusButton({
  current,
  target,
  icon,
  label,
  onClick,
  danger,
}: {
  current: string;
  target: string;
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
  danger?: boolean;
}) {
  if (current === target) return null;
  const displayLabel = label || target.replace("_", " ");
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-stone-600 hover:bg-stone-100"
      }`}
    >
      {icon}
      {displayLabel}
    </button>
  );
}

// ─── Channels Tab ────────────────────────────────────────────────────────────

function ChannelsTab({ token }: { token: string }) {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState<SyncResult[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // New feed form
  const [newName, setNewName] = useState("");
  const [newSource, setNewSource] = useState("booking.com");
  const [newRoom, setNewRoom] = useState("standard");
  const [newUrl, setNewUrl] = useState("");

  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/feeds", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFeeds(data.feeds || []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  async function addFeed() {
    if (!newName || !newUrl) return;
    await fetch("/api/admin/feeds", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        source: newSource,
        room_type_id: newRoom,
        ical_url: newUrl,
      }),
    });
    setNewName("");
    setNewUrl("");
    setShowAdd(false);
    fetchFeeds();
  }

  async function deleteFeed(id: string) {
    await fetch("/api/admin/feeds", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchFeeds();
  }

  async function triggerSync() {
    setSyncing(true);
    setSyncResults(null);
    try {
      const res = await fetch("/api/bookings/sync", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSyncResults(data.results || []);
      fetchFeeds();
    } catch {
      /* ignore */
    } finally {
      setSyncing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-stone-900">Channel Feeds</h2>
        <div className="flex gap-3">
          <button
            onClick={triggerSync}
            disabled={syncing || feeds.length === 0}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {syncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Sync Now
          </button>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center gap-2 border border-stone-200 hover:bg-stone-50 text-stone-700 px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Feed
          </button>
        </div>
      </div>

      {syncResults && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-medium text-green-800 mb-2">Sync Complete</p>
          {syncResults.map((r, i) => (
            <p key={i} className="text-sm text-green-700">
              {r.feed}: {r.created} created, {r.updated} updated
              {r.errors.length > 0 && ` (${r.errors.length} errors)`}
            </p>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
          <h3 className="font-semibold text-stone-900 mb-4">
            Add Channel Feed
          </h3>
          <p className="text-sm text-stone-500 mb-4">
            Paste the iCal export URL from Booking.com or Airbnb. You can find
            this in your property&apos;s calendar sync settings.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Booking.com Standard"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Source
              </label>
              <select
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white focus:border-amber-600 outline-none"
              >
                <option value="booking.com">Booking.com</option>
                <option value="airbnb">Airbnb</option>
                <option value="expedia">Expedia</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Room Type
              </label>
              <select
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white focus:border-amber-600 outline-none"
              >
                <option value="standard">Standard Room</option>
                <option value="family">Family Suite</option>
                <option value="premium">Premium Suite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                iCal URL
              </label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addFeed}
              disabled={!newName || !newUrl}
              className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Add Feed
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="text-stone-500 hover:text-stone-900 px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {feeds.length === 0 ? (
        <div className="text-center py-16 text-stone-400 bg-white rounded-xl border border-stone-200">
          <Link className="h-8 w-8 mx-auto mb-3" />
          <p className="mb-1">No channel feeds configured</p>
          <p className="text-sm">
            Add your Booking.com or Airbnb iCal URLs to sync bookings
            automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-stone-900">{feed.name}</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${SOURCE_COLORS[feed.source] || "bg-stone-100"}`}
                  >
                    {feed.source}
                  </span>
                  <span className="text-xs text-stone-400">
                    {ROOM_NAMES[feed.room_type_id]}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1 font-mono truncate max-w-md">
                  {feed.ical_url}
                </p>
                {feed.last_synced_at && (
                  <p className="text-xs text-stone-400 mt-1">
                    Last synced:{" "}
                    {new Date(feed.last_synced_at).toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteFeed(feed.id)}
                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── iCal Export Tab ─────────────────────────────────────────────────────────

function ICalTab() {
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  const feeds = [
    { label: "All Rooms", url: `${baseUrl}/api/bookings/ical` },
    {
      label: "Standard Room",
      url: `${baseUrl}/api/bookings/ical?room=standard`,
    },
    {
      label: "Family Suite",
      url: `${baseUrl}/api/bookings/ical?room=family`,
    },
    {
      label: "Premium Suite",
      url: `${baseUrl}/api/bookings/ical?room=premium`,
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-stone-900 mb-2">
        iCal Export Feeds
      </h2>
      <p className="text-sm text-stone-500 mb-6">
        Give these URLs to Booking.com, Airbnb, or any channel manager to
        export your direct bookings. They&apos;ll poll this feed to see when
        rooms are occupied.
      </p>

      <div className="space-y-3">
        {feeds.map((feed) => (
          <div
            key={feed.label}
            className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-stone-900">{feed.label}</p>
              <p className="text-sm text-stone-500 font-mono break-all">
                {feed.url}
              </p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(feed.url)}
              className="shrink-0 ml-4 px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Copy
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-900 mb-2">
          How to connect to Booking.com
        </h3>
        <ol className="text-sm text-amber-800 space-y-2 list-decimal list-inside">
          <li>Log into your Booking.com Extranet</li>
          <li>
            Go to <strong>Rates &amp; Availability → Calendar Sync</strong>
          </li>
          <li>
            Paste the iCal export URL for each room type to export your
            direct bookings to them
          </li>
          <li>
            Copy their iCal URL and add it as a channel feed in the Channels
            tab to import their bookings here
          </li>
        </ol>
      </div>

      <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-5">
        <h3 className="font-semibold text-rose-900 mb-2">
          How to connect to Airbnb
        </h3>
        <ol className="text-sm text-rose-800 space-y-2 list-decimal list-inside">
          <li>Go to your Airbnb listing → Calendar → Availability</li>
          <li>
            Scroll to <strong>Connect calendars</strong>
          </li>
          <li>
            Under &quot;Import calendar,&quot; paste the iCal export URL for the
            matching room
          </li>
          <li>
            Copy the &quot;Export calendar&quot; URL and add it as a channel feed
            in the Channels tab
          </li>
        </ol>
      </div>
    </div>
  );
}
