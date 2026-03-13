import Image from "next/image";
import Link from "next/link";

// Site constants (consistent with your home page)
const SITE_URL = "https://shadowledger-nu.vercel.app";
const SITE_NAME = "Shadow Ledger";

export const metadata = {
  title: `About ${SITE_NAME} – Independent News & Investigations`,
  description:
    `${SITE_NAME} delivers fearless, in-depth reporting on business, politics, technology, finance, global affairs, and investigative journalism.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About ${SITE_NAME} – Independent News & Investigations`,
    description:
      `${SITE_NAME} is committed to unfiltered, fact-based coverage of the stories that shape economies, governments, and societies.`,
    url: `${SITE_URL}/about`,
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-about.webp`, // ← replace with your real OG image
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – Breaking News & Investigations`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${SITE_NAME}`,
    description:
      `Independent journalism on business, politics, technology, finance, and global events.`,
    images: [`${SITE_URL}/images/logo-og.png`],
  },
};

export default function About() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: `About ${SITE_NAME}`,
    description: metadata.description,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${SITE_URL}/about`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#d43939] text-white px-5 py-2 text-sm font-bold rounded-full mb-6 tracking-wide">
              ABOUT US
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {SITE_NAME}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Truth. Depth. No agenda.
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg prose-red max-w-none mb-16 leading-relaxed text-black">
            <p>
              Welcome to <strong>{SITE_NAME}</strong> — an independent news platform dedicated to fearless, in-depth reporting on the stories that matter most: business, politics, technology, finance, global affairs, and investigative journalism.
            </p>
            <p>
              We exist because too many critical stories — corporate power moves, political corruption, technological disruption, financial scandals, and international crises — are underreported, sanitized, or buried under noise.
            </p>
            <p>
              Our mission is simple: deliver accurate, timely, and unfiltered journalism that respects the reader’s intelligence and demands accountability from those in power.
            </p>
          </div>

          {/* What We Stand For */}
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {[
              {
                title: "Independence",
                desc: "No corporate sponsors. No political affiliations. Our only loyalty is to the facts and to the public’s right to know.",
              },
              {
                title: "Depth & Clarity",
                desc: "We go beyond headlines — analyzing filings, financial reports, court documents, data, and primary sources so you get the full picture.",
              },
              {
                title: "Accountability",
                desc: "We name names, follow the money, and expose failures of power — whether in boardrooms, capitals, or global institutions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Team & Writers */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
              Our Reporting Team
            </h2>
            <p className="text-center text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
              {SITE_NAME} is powered by experienced journalists, financial analysts, investigative reporters, and subject-matter experts who specialize in business, politics, technology, and global affairs.
            </p>
            <div className="text-center">
              <Link
                href="/authors"
                className="inline-block bg-[#d43939] text-white px-9 py-4 rounded-full font-semibold hover:bg-red-700 transition-colors text-lg shadow-sm"
                title="View our contributors"
              >
                Meet Our Contributors →
              </Link>
            </div>
          </div>

          {/* Final Statement */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Why {SITE_NAME} Exists
            </h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Because power without scrutiny becomes corruption.<br />
              Because silence enables abuse.<br />
              Because the public deserves the truth — not spin, not omission, not comfort.
            </p>
            <p className="mt-10 text-xl font-semibold text-black">
              This is {SITE_NAME}.<br />
              We report the stories that shape your world — so you never have to look away.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}