import Link from "next/link";

const SITE_URL = "https://www.washingtoninsider.org/";
const SITE_NAME = "Washington Insider";

export const metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description:
    `Read ${SITE_NAME}'s Privacy Policy to understand how we collect, use, protect, and handle your information while you access our independent news and investigative journalism platform.`,
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: `${SITE_NAME} Privacy Policy`,
    description:
      `Learn how ${SITE_NAME} protects your privacy and manages information including cookies, analytics, and data usage on our news and investigations site.`,
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/logo-og.webp`,
        width: 1200,
        height: 630,
        alt: `Privacy Policy - ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} Privacy Policy`,
    description:
      `Understand how ${SITE_NAME} collects, uses, and safeguards user information across our independent news platform.`,
    images: [`${SITE_URL}/images/logo-og.webp`],
  },
};

export default function PrivacyPolicy() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/privacy-policy#webpage`,
    url: `${SITE_URL}/privacy-policy`,
    name: `${SITE_NAME} Privacy Policy`,
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
        name: "Privacy Policy",
        item: `${SITE_URL}/privacy-policy`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD STRUCTURED DATA */}
      <script
        id="privacy-policy-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <script
        id="privacy-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto prose prose-lg prose-neutral">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-black">
              Last updated: March 13, 2026
            </p>
          </div>

          <p className="text-black">
            At <strong>{SITE_NAME}</strong>, we are committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at {SITE_URL}.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li><strong>Automatically Collected:</strong> IP address, browser type and version, device information, operating system, pages visited, time and duration of visits, referring site</li>
            <li><strong>Cookies & Similar Technologies:</strong> We use cookies and similar tracking technologies for site analytics, performance, and basic functionality. You can manage or disable cookies through your browser settings.</li>
            <li><strong>Voluntarily Provided:</strong> Email address (if you subscribe to updates or newsletters), name or other details if you contact us directly</li>
          </ul>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>To operate, maintain, secure, and improve our website</li>
            <li>To analyze how visitors interact with our news and investigative reporting</li>
            <li>To detect, prevent, and respond to technical issues or malicious activity</li>
            <li>To communicate with you if you subscribe to our newsletter (you can unsubscribe at any time)</li>
          </ul>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">3. Sharing of Information</h2>
          <p className="text-black">
            We do <strong>not</strong> sell your personal information to third parties.
            We may share anonymized or aggregated data with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Analytics and performance providers (e.g., Google Analytics)</li>
            <li>Hosting, CDN, and security service providers (e.g., Cloudflare)</li>
            <li>Law enforcement or government authorities when required by law or valid legal process</li>
          </ul>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">4. Third-Party Services</h2>
          <p className="text-black">
            We may use the following third-party services (each with its own privacy policy):
          </p>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Google Analytics (website usage analytics)</li>
            <li>Cloudflare (security, performance, and DDoS protection)</li>
            <li>Email newsletter service provider (only if you subscribe)</li>
          </ul>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">5. Your Rights and Choices</h2>
          <p className="text-black">
            Depending on your location and applicable law, you may have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data (subject to legal exceptions)</li>
            <li>Opt out of cookies and tracking via your browser settings</li>
            <li>Unsubscribe from any email communications at any time</li>
          </ul>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">6. Data Security</h2>
          <p className="text-black">
            We use reasonable administrative, technical, and physical safeguards to protect your information. 
            However, no method of transmission over the Internet or electronic storage is completely secure.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">7. Children's Privacy</h2>
          <p className="text-black">
            Our website is not directed to children under the age of 13. 
            We do not knowingly collect personal information from children under 13. 
            If we become aware that we have collected such information, we will take steps to delete it.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">8. Changes to This Privacy Policy</h2>
          <p className="text-black">
            We may update this Privacy Policy from time to time. 
            The “Last updated” date at the top of this page indicates when the policy was last revised. 
            We encourage you to review this page periodically.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">9. Contact Us</h2>
          <p className="text-black">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="font-medium text-red-600 mt-4">
            privacy@washingtoninsider.org
          </p>

          {/* <div className="mt-16 pt-8 border-t border-gray-200 text-center text-black text-sm">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </div> */}
        </div>
      </main>
    </>
  );
}