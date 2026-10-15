import type { Metadata, Viewport } from "next";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { profile, siteUrl, education, telHref } from "@/lib/content";

const description =
  "Asmamaw Alemayehu Abate: civil engineer and former General Manager of Amhara Road Work Enterprise, with experience in road construction, road maintenance operations, construction management and corporate governance in Ethiopia.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Civil Engineer and Construction Management`,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  keywords: [
    "Asmamaw Alemayehu Abate", "civil engineer Ethiopia", "construction management", "road construction",
    "road maintenance", "Bahir Dar", "Amhara Road Work Enterprise", "infrastructure development",
  ],
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: `${profile.name} | Civil Engineer`,
    description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} | Civil Engineer`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#061328",
  width: "device-width",
  initialScale: 1,
};

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Civil Engineer",
    description,
    url: siteUrl,
    image: `${siteUrl}${profile.photo}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Bahir Dar", addressCountry: "ET" },
    sameAs: [profile.linkedin],
    knowsLanguage: profile.languages,
    alumniOf: [...new Set(education.map((e) => e.institution))].map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    })),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-dvh flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:bg-gold-light focus:px-4 focus:py-2 focus:text-navy-950"
        >
          Skip to content
        </a>
        <SiteHeader
          name={profile.name}
          title="Civil Engineer"
          email={profile.email}
          phone={profile.phones[0]}
          phoneHref={telHref(profile.phones[0])}
          location={profile.location}
          linkedin={profile.linkedin}
        />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
