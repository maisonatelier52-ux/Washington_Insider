// import React from "react";
// import authorsData from "../../public/data/authors.json";
// import Link from "next/link";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// const NEWS_API = "https://my-api-usa.com/p16/API/api/news";
// const IMAGE_URL = "https://my-api-usa.com/p16/API/api/news-images";

// // Allowed categories (must match API category_name lowercase)
// const categoryConfig = {
//   business: { title: "Business" },
//   world: { title: "World" },
//   finance: { title: "Finance" },
//   technology: { title: "Technology" },
//   politics: { title: "Politics" },
//   lifestyle: { title: "Lifestyle" },
//   opinion: { title: "Opinion" },
//   investigation: { title: "Investigation" },
// };

// // Fetch news
// async function getNews() {
//   try {
//     const res = await fetch(NEWS_API, { cache: "no-store" });
//     if (!res.ok) return [];
//     return res.json();
//   } catch (e) {
//     console.log("API error:", e);
//     return [];
//   }
// }

// export default async function CategoryPage({ params }) {
//   // ⚠️ Next.js 16 FIX
//   const { category } = await params;
//   const categorySlug = category?.toLowerCase();

//   console.log("Category:", categorySlug);

//   // Validate category
//   if (!categorySlug || !categoryConfig[categorySlug]) {
//     notFound();
//   }

//   const config = categoryConfig[categorySlug];

//   // Author
//   const categoryAuthor = authorsData.categories.find(
//     (item) => item.category === categorySlug
//   );

//   const author = categoryAuthor?.author || {
//     name: "Staff Reporter",
//     slug: "staff-reporter",
//   };

//   // Fetch API data
//   const news = await getNews();

//   console.log("Total news:", news.length);

//   // Filter API data by category
//   const sortedArticles = news
//     .filter((item) => {
//       const apiCategory =
//         item.category?.category_name?.toLowerCase() || "";
//       return apiCategory === categorySlug;
//     })
//     .map((item) => ({
//       slug: item.encode_title,
//       title: item.title || item.news_title,
//       image: item.photo_url,
//       date: item.news_date,
//       excerpt:
//         item.news_content_short || item.meta_description || "",
//       alt: item.img_alt,
//     }))
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, 6);

//   console.log("Filtered articles:", sortedArticles.length);

//   return (
//     <main>
//       <section className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
//         {/* Header */}
//         <div className="bg-[#d43939] px-4 py-5 mb-8">
//           <h2 className="text-white text-xl font-bold uppercase tracking-wider">
//             {config.title}
//           </h2>
//         </div>

//         {sortedArticles.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">
//               No articles found for "{categorySlug}"
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
//             {sortedArticles.map((article) => {
//               const href = `/${categorySlug}/${article.slug}`;

//               return (
//                 <article
//                   key={article.slug}
//                   className="group flex flex-col"
//                 >
//                   {/* Image */}
//                   <Link href={href} className="block overflow-hidden">
//                     <div className="relative w-full aspect-[16/10] overflow-hidden">
//                       <Image
//                         src={article.image}
//                         alt={article.alt || article.title}
//                         fill
//                         sizes="(max-width: 640px) 100vw, 50vw"
//                         className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   </Link>

//                   {/* Date */}
//                   <div className="mt-3 text-xs text-gray-500">
//                     <time>
//                       {article.date}
//                     </time>
//                   </div>

//                   {/* Title */}
//                   <Link href={href} className="mt-1 block">
//                     <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#d43939] transition-colors duration-200">
//                       {article.title}
//                     </h2>
//                   </Link>

//                   {/* Excerpt */}
//                   <Link href={href} className="mt-2 block">
//                     <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
//                       {article.excerpt}
//                       <span className="text-[#d43939] font-semibold ml-1">
//                         Read More
//                       </span>
//                     </p>
//                   </Link>

//                   {/* Author */}
//                   <div className="flex items-center gap-2 mt-3 text-xs">
//                     <Link
//                       href={`/authors/${author.slug}`}
//                       className="font-medium text-gray-700 hover:text-[#d43939]"
//                     >
//                       {author.name}
//                     </Link>
//                     <span className="text-gray-400">•</span>
//                     <Link
//                       href={`/${categorySlug}`}
//                       className="uppercase text-[#d43939] font-semibold"
//                     >
//                       {config.title}
//                     </Link>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// ══════════════════════════════════════════════════════════════════════════════
// ⚙️  ONE PLACE — change when real domain is ready
// ══════════════════════════════════════════════════════════════════════════════
const SITE_URL  = "https://shadowledger-nu.vercel.app";
// ══════════════════════════════════════════════════════════════════════════════

const SITE_NAME = "Shadow Ledger";
const SITE_LOGO = `${SITE_URL}/images/logo.webp`;
const NEWS_API  = "https://my-api-usa.com/p16/API/api/news";

// ── Category config ───────────────────────────────────────────────────────────
const categoryConfig = {
  business:      { title: "Business",      description: "Latest business news covering markets, companies, global trade, and economic developments from around the world." },
  world:         { title: "World",         description: "International headlines and breaking global stories covering diplomacy, conflicts, and world affairs." },
  finance:       { title: "Finance",       description: "Financial insights, stock market reports, economic trends, and expert analysis of global finance." },
  technology:    { title: "Technology",    description: "Latest technology news on AI, startups, innovation, cybersecurity, and digital transformation worldwide." },
  politics:      { title: "Politics",      description: "In-depth political coverage of elections, government policy, Capitol Hill, and national political affairs." },
  lifestyle:     { title: "Lifestyle",     description: "News and features on culture, health, travel, food, fashion, and the trends shaping modern life." },
  opinion:       { title: "Opinion",       description: "Expert commentaries, editorials, and perspectives on the issues shaping politics, business, and society." },
  investigation: { title: "Investigation", description: "Original investigative journalism uncovering the facts behind major political, financial, and public interest stories." },
};

// ── Fetch ─────────────────────────────────────────────────────────────────────
async function getNews() {
  try {
    const res = await fetch(NEWS_API, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("API error:", e);
    return [];
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { category } = await params;
  const categorySlug = category?.toLowerCase();

  if (!categorySlug || !categoryConfig[categorySlug]) {
    return { title: "Category Not Found", robots: "noindex" };
  }

  const config       = categoryConfig[categorySlug];
  const canonicalUrl = `${SITE_URL}/${categorySlug}`;
  const ogImage      = `${SITE_URL}/images/og-${categorySlug}.webp`;
  const title        = `${config.title} News — ${SITE_NAME}`;

  return {
    // ── Core ──────────────────────────────────────────────────────────────
    title,
    description: config.description,

    // ── Canonical ─────────────────────────────────────────────────────────
    alternates: { canonical: canonicalUrl },

    // ── Robots ────────────────────────────────────────────────────────────
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        "max-snippet":       -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },

    // ── Open Graph ────────────────────────────────────────────────────────
    openGraph: {
      type:        "website",
      siteName:     SITE_NAME,
      title,
      description:  config.description,
      url:          canonicalUrl,
      locale:       "en_US",
      images: [{
        url:    ogImage,
        width:  1200,
        height: 630,
        alt:    `${config.title} News — ${SITE_NAME}`,
      }],
    },

    // ── Twitter / X ───────────────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      site:        "@shadowledger",
      creator:     "@shadowledger",
      title,
      description: config.description,
      images: [{
        url: ogImage,
        alt: `${config.title} News — ${SITE_NAME}`,
      }],
    },

    // ── Article section signals ────────────────────────────────────────────
    other: {
      "article:section": config.title,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categorySlug = category?.toLowerCase();

  if (!categorySlug || !categoryConfig[categorySlug]) notFound();

  const config = categoryConfig[categorySlug];

  // Fetch + filter
  const news = await getNews();

  const sortedArticles = news
    .filter((item) => item.category?.category_name?.toLowerCase() === categorySlug)
    .map((item) => ({
      slug:    item.encode_title,
      title:   item.title || item.news_title,
      image:   item.photo_url,
      date:    item.news_date,
      excerpt: item.news_content_short || item.meta_description || "",
      alt:     item.img_alt || item.title || item.news_title,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  // ── URLs ───────────────────────────────────────────────────────────────────
  const canonicalUrl = `${SITE_URL}/${categorySlug}`;

  // ════════════════════════════════════════════════════════════════════════
  // JSON-LD SCHEMAS
  // ════════════════════════════════════════════════════════════════════════

  // 1. BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",          item: SITE_URL },
      { "@type": "ListItem", position: 2, name: config.title,    item: canonicalUrl },
    ],
  };

  // 2. WebPage — category index page entity
  const webPageJsonLd = {
    "@context":  "https://schema.org",
    "@type":     "CollectionPage",
    "@id":       `${canonicalUrl}/#webpage`,
    url:          canonicalUrl,
    name:        `${config.title} News — ${SITE_NAME}`,
    description:  config.description,
    inLanguage:   "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id":   `${SITE_URL}/#website`,
      url:      SITE_URL,
      name:     SITE_NAME,
    },
    about: {
      "@type": "Thing",
      name:    config.title,
    },
    breadcrumb: breadcrumbJsonLd,
    publisher: {
      "@type": "NewsMediaOrganization",
      "@id":   `${SITE_URL}/#organization`,
      name:     SITE_NAME,
      url:      SITE_URL,
      logo: {
        "@type": "ImageObject",
        url:      SITE_LOGO,
        width:    512,
        height:   512,
      },
    },
    // Speakable — headings readable by voice / AIO
    speakable: {
      "@type":     "SpeakableSpecification",
      cssSelector: [".category-title", "h1", "h2"],
    },
  };

  // 3. ItemList — article cards on this category page
  const itemListJsonLd = {
    "@context":    "https://schema.org",
    "@type":       "ItemList",
    name:          `${config.title} News`,
    description:   config.description,
    url:            canonicalUrl,
    numberOfItems:  sortedArticles.length,
    itemListElement: sortedArticles.map((article, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      url:      `${SITE_URL}/${categorySlug}/${article.slug}`,
      name:      article.title,
      image: {
        "@type":  "ImageObject",
        url:       article.image?.startsWith("http")
          ? article.image
          : `${SITE_URL}${article.image}`,
        caption:  article.title,
      },
    })),
  };

  // 4. FAQPage — category-specific AIO Q&As
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:    `What is the latest ${config.title.toLowerCase()} news on Shadow Ledger?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:    `${config.description} Browse the latest stories at ${canonicalUrl}.`,
        },
      },
      {
        "@type": "Question",
        name:    `Where can I read ${config.title.toLowerCase()} stories on Shadow Ledger?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:    `All ${config.title} articles are published at ${canonicalUrl} and updated continuously with the latest reporting.`,
        },
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <main>

      {/* JSON-LD — 4 schemas */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">

        {/* Category Header */}
        <div className="bg-[#d43939] px-4 py-5 mb-8">
          <h1 className="category-title text-white text-xl font-bold uppercase tracking-wider">
            {config.title}
          </h1>
        </div>

        {/* Breadcrumb — visible + accessible */}
        {/* <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#d43939] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">›</li>
            <li aria-current="page" className="font-semibold text-[#d43939]">
              {config.title}
            </li>
          </ol>
        </nav> */}

        {/* Category description — helps Google understand page topic */}
        {/* <p className="text-sm text-gray-500 mb-8 max-w-2xl leading-relaxed">
          {config.description}
        </p> */}

        {sortedArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found for &ldquo;{categorySlug}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {sortedArticles.map((article) => {
              const href = `/${categorySlug}/${article.slug}`;

              return (
                <article key={article.slug} className="group flex flex-col">

                  {/* Image */}
                  <Link href={href} className="block overflow-hidden">
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.alt || article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </Link>

                  {/* Date */}
                  <div className="mt-3 text-xs text-gray-500">
                    <time dateTime={new Date(article.date).toISOString()}>
                      {article.date}
                    </time>
                  </div>

                  {/* Title — h2 (h1 is the category name above) */}
                  <Link href={href} className="mt-1 block">
                    <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#d43939] transition-colors duration-200">
                      {article.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <Link href={href} className="mt-2 block">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                      <span className="text-[#d43939] font-semibold ml-1">
                        Read More
                      </span>
                    </p>
                  </Link>

                  {/* Category tag */}
                  <div className="flex items-center gap-2 mt-3 text-xs">
                    <Link
                      href={`/${categorySlug}`}
                      className="uppercase text-[#d43939] font-semibold hover:underline"
                    >
                      {config.title}
                    </Link>
                  </div>

                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}