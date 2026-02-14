import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a3c34] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-heading text-8xl font-bold text-gold/20 mb-4">404</p>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-stone-400 mb-8">
          Looks like you wandered off the trail. Let&apos;s get you back to the
          hotel.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <a
            href="https://www.hotelquinto.com/booking-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-6 py-3 rounded-lg font-medium transition-all"
          >
            Book a Room
          </a>
        </div>
        <p className="mt-12 font-heading text-lg text-white/30">
          Hotel <span className="text-gold/40">Quinto</span>
        </p>
      </div>
    </div>
  );
}
