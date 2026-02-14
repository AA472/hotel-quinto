import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Hotel Quinto",
  description: "Privacy policy for Hotel Quinto website and services.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-[#1a3c34] py-8">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="font-heading text-2xl font-bold text-white"
          >
            Hotel <span className="text-gold">Quinto</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-stone max-w-none space-y-6 text-stone-600 leading-relaxed">
          <p className="text-sm text-stone-400">
            Last updated: February 2026
          </p>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mt-8 mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you use our website or make a booking, we may collect the
              following information:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Name, email address, and phone number when you contact us or
                make a reservation
              </li>
              <li>
                Payment information processed securely through our booking
                platform
              </li>
              <li>
                Messages sent through our chat assistant or WhatsApp
              </li>
              <li>
                Usage data such as pages visited, collected through cookies and
                analytics tools
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mt-8 mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Process and manage your reservations</li>
              <li>Respond to your inquiries via chat, email, or WhatsApp</li>
              <li>Send booking confirmations and pre-arrival information</li>
              <li>Improve our website and guest experience</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mt-8 mb-3">
              3. Third-Party Services
            </h2>
            <p>
              Our website uses the following third-party services that may
              collect data:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Vercel</strong> — Website hosting
              </li>
              <li>
                <strong>Groq</strong> — Powers our AI chat assistant (messages
                you send in the chat are processed by Groq&apos;s API)
              </li>
              <li>
                <strong>Google Maps</strong> — Embedded map on our location
                section
              </li>
              <li>
                <strong>Wix Hotels</strong> — Booking engine and reservation
                management
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mt-8 mb-3">
              4. Cookies
            </h2>
            <p>
              We use essential cookies to ensure our website functions properly.
              Third-party services like Google Maps may set their own cookies.
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mt-8 mb-3">
              5. Data Security
            </h2>
            <p>
              We take reasonable measures to protect your personal information.
              All data is transmitted over HTTPS. We do not store payment
              information on our servers — payments are handled by our booking
              platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mt-8 mb-3">
              6. Your Rights
            </h2>
            <p>
              You have the right to request access to, correction of, or
              deletion of your personal data. To exercise these rights, contact
              us at{" "}
              <a
                href="mailto:info@hotelquinto.com"
                className="text-amber-700 hover:text-amber-600 underline"
              >
                info@hotelquinto.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal mt-8 mb-3">
              7. Contact
            </h2>
            <p>
              If you have questions about this privacy policy, please contact
              us:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@hotelquinto.com"
                  className="text-amber-700 hover:text-amber-600 underline"
                >
                  info@hotelquinto.com
                </a>
              </li>
              <li>Phone: +57 320 219 0476</li>
              <li>
                Address: Montenegro 1.5km vía Circasia, Quindío, Colombia
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <Link
            href="/"
            className="text-amber-700 hover:text-amber-600 font-medium text-sm"
          >
            &larr; Back to Hotel Quinto
          </Link>
        </div>
      </main>
    </div>
  );
}
