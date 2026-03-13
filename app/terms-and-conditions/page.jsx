import Link from "next/link";

const SITE_URL = "https://shadowledger-nu.vercel.app";
const SITE_NAME = "Shadow Ledger";

export const metadata = {
  title: `Terms and Conditions | ${SITE_NAME}`,
  description:
    `Official Terms and Conditions for using ${SITE_NAME}, including content usage rights, disclaimers, and limitations of liability.`,
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  openGraph: {
    title: `Terms and Conditions | ${SITE_NAME}`,
    description:
      `Review the legal terms that govern access to and use of ${SITE_NAME} — independent reporting on business, politics, technology, finance, and global affairs.`,
    url: `${SITE_URL}/terms-and-conditions`,
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/logo-og.webp`,
        width: 1200,
        height: 630,
        alt: `Terms and Conditions - ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} Terms and Conditions`,
    description:
      `The legal terms and conditions that apply when accessing or using ${SITE_NAME} content and services.`,
    images: [`${SITE_URL}/images/logo-og.webp`],
  },
};

export default function TermsAndConditions() {
  return (
    <>
      {/* JSON-LD STRUCTURED DATA */}
      <script
        id="terms-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms and Conditions",
            url: `${SITE_URL}/terms-and-conditions`,
            description:
              `Terms and Conditions governing the use of ${SITE_NAME}, an independent news platform focused on business, politics, technology, finance, and investigations.`,
            publisher: {
              "@type": "NewsMediaOrganization",
              name: SITE_NAME,
              url: SITE_URL,
            },
          }),
        }}
      />

      {/* Breadcrumb JSON-LD */}
      <script
        id="terms-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Terms and Conditions",
                item: `${SITE_URL}/terms-and-conditions`,
              },
            ],
          }),
        }}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto prose prose-lg prose-neutral">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-black">
              Last updated: March 13, 2026
            </p>
          </div>

          <p className="text-black">
            Welcome to <strong>{SITE_NAME}</strong>. These Terms and Conditions
            ("Terms") govern your access to and use of our website located at
            shadowledger-nu.vercel.app and any related services (collectively, the
            "Service").
          </p>

          <p className="text-black">
            By accessing or using the Service, you agree to be bound by these
            Terms. If you do not agree with any part of these Terms, you must
            not use the Service.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            1. Use of the Service
          </h2>
          <p className="text-black">
            You may use the Service only for lawful purposes and in accordance
            with these Terms. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>
              Violate any applicable federal, state, or local law or regulation
            </li>
            <li>
              Infringe the intellectual property rights or other rights of
              others
            </li>
            <li>
              Transmit viruses, malware, worms, or any other harmful or
              disruptive code
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the Service
            </li>
            <li>
              Use automated systems (bots, scrapers, crawlers) to access,
              monitor, or collect content without express written permission
            </li>
            <li>
              Engage in harassment, threats, impersonation, or any abusive
              behavior
            </li>
          </ul>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            2. Intellectual Property
          </h2>
          <p className="text-black">
            All content published on {SITE_NAME} — including articles, analysis,
            headlines, photographs, graphics, and site design — is owned by
            {SITE_NAME} or its content licensors and is protected by United States
            and international copyright, trademark, and other intellectual
            property laws.
          </p>
          <p className="text-black">
            You are permitted to view, access, and print individual articles for
            your personal, non-commercial use only. Any other use — including
            republication, redistribution, syndication, commercial use, or
            creation of derivative works — is strictly prohibited without our
            prior written consent.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            3. User-Generated Content (If Enabled)
          </h2>
          <p className="text-black">
            At present, {SITE_NAME} does not enable public comments or user
            submissions. If we introduce such features in the future, you will
            retain ownership of any content you submit, but you grant {SITE_NAME}
            a worldwide, non-exclusive, royalty-free, perpetual, irrevocable
            license to use, reproduce, modify, adapt, publish, translate,
            distribute, and display that content in any form or medium.
          </p>
          <p className="text-black">
            You agree that any content you submit will not violate any law or
            infringe third-party rights and will not be unlawful, defamatory,
            obscene, abusive, or otherwise inappropriate. We reserve the right
            to remove or refuse any content at our sole discretion.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            4. Accuracy and Reliability of Information
          </h2>
          <p className="text-black">
            {SITE_NAME} strives to provide accurate, timely, and well-sourced
            reporting. However, we do not warrant or guarantee that all
            information is complete, correct, current, or free from error. The
            Service is provided for general informational purposes only and does
            not constitute legal, financial, professional, or other advice.
          </p>
          <p className="text-black">You use and rely on the content at your own risk.</p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            5. Third-Party Links and Services
          </h2>
          <p className="text-black">
            The Service may contain links to third-party websites, documents, or
            services. We do not endorse, control, or assume responsibility for
            the content, privacy practices, or availability of any third-party
            sites. Accessing them is at your own risk.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            6. Disclaimer of Warranties
          </h2>
          <p className="text-black">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
            WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            7. Limitation of Liability
          </h2>
          <p className="text-black">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {SITE_NAME}, ITS OFFICERS,
            DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY
            DAMAGES ARISING FROM OR RELATING TO YOUR USE OF OR INABILITY TO USE
            THE SERVICE.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            8. Indemnification
          </h2>
          <p className="text-black">
            You agree to indemnify, defend, and hold harmless {SITE_NAME} and its
            affiliates, officers, directors, employees, and agents from and
            against any claims, liabilities, damages, losses, costs, and
            expenses (including reasonable attorneys' fees) arising out of or
            related to your violation of these Terms or your use of the Service.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            9. Changes to These Terms
          </h2>
          <p className="text-black">
            We may modify these Terms at any time. The updated version will be
            posted on this page with a revised "Last updated" date. Your
            continued use of the Service following any changes constitutes your
            acceptance of the revised Terms.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">
            10. Governing Law and Jurisdiction
          </h2>
          <p className="text-black">
            These Terms are governed by the laws of the State of New York, United
            States, without regard to its conflict of law principles. Any legal
            action or proceeding arising out of or relating to these Terms shall
            be brought exclusively in the state or federal courts located in New
            York County, New York.
          </p>

          <h2 className="font-semibold py-3 text-xl mt-10 text-black">11. Contact Us</h2>
          <p className="text-black">
            If you have any questions regarding these Terms and Conditions,
            please contact us at:
          </p>
          <p className="font-medium text-red-600 mt-4">
            legal@shadowledger-nu.vercel.app
          </p>

          {/* <div className="mt-16 pt-8 border-t border-gray-200 text-center text-black text-sm">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </div> */}
        </div>
      </main>
    </>
  );
}