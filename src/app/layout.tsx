import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const OG_IMAGE =
  "https://static.wixstatic.com/media/ea9539_5a227098fbec49ee920ac3ff911f48e1~mv2.jpg/v1/fit/w_1200,h_630,q_90,enc_avif,quality_auto/ea9539_5a227098fbec49ee920ac3ff911f48e1~mv2.jpg";

export const metadata: Metadata = {
  title: "Hotel Quinto — Boutique Eco-Hotel in Colombia's Coffee Region",
  description:
    "A boutique eco-hotel nestled in Colombia's Coffee Cultural Landscape, a UNESCO World Heritage Site. Bamboo architecture, natural pool, river, waterfall, and unforgettable sunsets in Quindío.",
  keywords: [
    "Hotel Quinto",
    "eco hotel Colombia",
    "coffee region hotel",
    "Quindío hotel",
    "Montenegro Colombia",
    "UNESCO heritage hotel",
    "boutique hotel Colombia",
    "hotel eje cafetero",
  ],
  openGraph: {
    title: "Hotel Quinto — Boutique Eco-Hotel in Colombia's Coffee Region",
    description:
      "Boutique eco-hotel in UNESCO's Coffee Cultural Landscape. Bamboo architecture, pool, river, waterfall, and breathtaking sunsets in Quindío, Colombia.",
    url: "https://hotelquinto.com",
    siteName: "Hotel Quinto",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Hotel Quinto pool and bamboo architecture" }],
    locale: "en_US",
    alternateLocale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Quinto — Boutique Eco-Hotel",
    description:
      "A tranquil retreat in Colombia's Coffee Cultural Landscape. UNESCO Heritage Site.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://hotelquinto.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased font-body`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Hotel Quinto",
              url: "https://hotelquinto.com",
              image: OG_IMAGE,
              description:
                "Boutique eco-hotel in Colombia's Coffee Cultural Landscape, a UNESCO World Heritage Site.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Montenegro 1.5km vía Circasia, Vereda La Frontera",
                addressLocality: "Montenegro",
                addressRegion: "Quindío",
                addressCountry: "CO",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 4.566637,
                longitude: -75.75012,
              },
              telephone: "+573202190476",
              email: "info@hotelquinto.com",
              priceRange: "$65 - $160 USD",
              starRating: { "@type": "Rating", ratingValue: "4" },
              checkinTime: "16:00",
              checkoutTime: "14:00",
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Swimming Pool" },
                { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
                { "@type": "LocationFeatureSpecification", name: "Free Parking" },
                { "@type": "LocationFeatureSpecification", name: "Restaurant" },
                { "@type": "LocationFeatureSpecification", name: "Airport Transfer" },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
