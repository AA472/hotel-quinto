"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Calendar,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

type Tier = "intro" | "standard" | "premium";

const CALENDLY_URLS: Record<Tier, string> = {
  intro: process.env.NEXT_PUBLIC_CALENDLY_INTRO || "",
  standard: process.env.NEXT_PUBLIC_CALENDLY_STANDARD || "",
  premium: process.env.NEXT_PUBLIC_CALENDLY_PREMIUM || "",
};

const tierLabels: Record<Tier, { title: string; duration: string }> = {
  intro: { title: "Intro Call", duration: "30 minutes" },
  standard: { title: "Standard Consultation", duration: "60 minutes" },
  premium: { title: "Premium Consultation", duration: "90 minutes" },
};

export default function ConsultationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-forest" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const tier = searchParams.get("tier") as Tier | null;

  const [status, setStatus] = useState<"loading" | "verified" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`/api/stripe/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => setStatus(data.valid ? "verified" : "error"))
      .catch(() => setStatus("error"));
  }, [sessionId]);

  const validTier = tier && tier in CALENDLY_URLS ? tier : null;
  const calendlyUrl = validTier ? CALENDLY_URLS[validTier] : "";
  const label = validTier ? tierLabels[validTier] : null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="font-heading text-2xl font-bold tracking-tight text-stone-900"
            >
              Hotel <span className="text-gold">Quinto</span>
            </Link>
            <Link
              href="/consultations"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Back to Consultations
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-forest mx-auto mb-4" />
            <p className="text-stone-500 text-lg">Confirming your payment…</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-stone-900 mb-3">
              Something went wrong
            </h1>
            <p className="text-stone-500 text-lg mb-8">
              We couldn&apos;t verify your payment. If you were charged, please
              contact us and we&apos;ll sort it out.
            </p>
            <Link
              href="/consultations"
              className="inline-flex items-center gap-2 text-forest hover:text-forest-light font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Consultations
            </Link>
          </div>
        )}

        {status === "verified" && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-forest" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-3">
              Payment Confirmed!
            </h1>
            {label && (
              <p className="text-stone-500 text-lg mb-2">
                {label.title} — {label.duration}
              </p>
            )}
            <p className="text-stone-500 text-lg mb-10">
              Now pick a time that works for you.
            </p>

            {calendlyUrl ? (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-forest hover:bg-forest-light text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Schedule Your Session
              </a>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <p className="text-amber-800 font-medium">
                  Scheduling link is being set up. Jason will email you within 24
                  hours to schedule your session.
                </p>
              </div>
            )}

            <div className="mt-12 bg-white rounded-xl shadow-sm p-6 text-left space-y-4">
              <h2 className="font-heading text-lg font-bold text-stone-900">
                What happens next?
              </h2>
              <ol className="space-y-3 text-stone-600 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  Choose a date and time using the scheduling link above.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  You&apos;ll receive a calendar invite with a video call link.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  Join the call at your scheduled time and bring your questions!
                </li>
              </ol>
            </div>

            <p className="mt-8 text-stone-400 text-sm">
              A confirmation email has been sent to your inbox.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
