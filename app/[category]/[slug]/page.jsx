import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DSidebar from "../../../components/DSidebar";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import PrevNextArticles from "@/components/PrevNextArticles";
import RelatedNews from "@/components/RelatedNews";

// ══════════════════════════════════════════════════════════════════════════════
// ⚙️  CHANGE YOUR DOMAIN HERE — only this one line needs updating
// ══════════════════════════════════════════════════════════════════════════════
const SITE_URL  = "https://shadowledger-nu.vercel.app";
// ══════════════════════════════════════════════════════════════════════════════

const SITE_NAME = "Shadow Ledger";
const NEWS_API  = "https://my-api-usa.com/p16/API/api/news";

// ── Fetch ────────────────────────────────────────────────────────────────────
async function getNews() {
  try {
    const res = await fetch(NEWS_API, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

// ── Normalize raw API item → page shape ──────────────────────────────────────
function normalizeItem(item) {
  const category =
    item.category?.category_name?.toLowerCase().replace(/\s+/g, "-") || "";

  return {
    slug:            item.encode_title,
    heading:         item.title || item.news_title,
    metaTitle:       item.meta_title,
    metaDescription: item.meta_description,
    metaKeyword:     item.meta_keyword,
    image:           item.photo_url,
    heroImage:       item.photo_url,
    alt:             item.img_alt || item.title || item.news_title,
    date:            item.news_date,
    excerpt:         item.news_content_short,
    newsContent:     item.news_content,
    category,
  };
}

// ── Helper: ensure absolute image URL ────────────────────────────────────────
function absoluteImage(url) {
  if (!url) return `${SITE_URL}/images/og-default.webp`;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

// ────────────────────────────────────────────────────────────────────────────
// METADATA  (Next.js App Router)
// ────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const rawNews = await getNews();
  const normalized = rawNews.map(normalizeItem).filter(item => item.category !== "puerto-rico");
  const post = normalized.find(
    (p) => p.slug === slug && p.category === category
  );

  // ── Check if this is Puerto Rico category (for noindex) ────────────────────
  const isPuertoRico = 
    category?.toLowerCase() === "puerto-rico" ||
    category?.toLowerCase().includes("puerto");

  if (!post) {
    return { 
      title: `Article Not Found | ${SITE_NAME}`, 
      robots: "noindex" // Not found pages are always noindex
    };
  }

  const canonicalUrl  = `${SITE_URL}/${category}/${slug}`;
  const heroImageUrl  = absoluteImage(post.heroImage);
  const categoryLabel = category.replace(/-/g, " ");
  const tags          = post.metaKeyword?.split(",").map((k) => k.trim()) ?? [];

  return {
    // ── Core ────────────────────────────────────────────────────────────────
    title:       post.metaTitle,
    description: post.metaDescription,
    keywords:    post.metaKeyword,

    // ── Canonical ───────────────────────────────────────────────────────────
    alternates: { canonical: canonicalUrl },

    // ── Robots (Google News + AIO friendly) ─────────────────────────────────
    robots: isPuertoRico ? {
      index: false,      // ← Hide Puerto Rico from search (no index)
      follow: false,     // ← Do not follow links on this page
      googleBot: {
        index: false,    // ← No Google indexing
        follow: false,
        "max-snippet": -1,
        "max-image-preview": "none",  // No image previews
        "max-video-preview": -1,
      },
    } : {
      index: true,
      follow: true,
      googleBot: {
        index:                true,
        follow:               true,
        "max-snippet":        -1,
        "max-image-preview":  "large",
        "max-video-preview":  -1,
      },
    },

    // ── Open Graph ──────────────────────────────────────────────────────────
    openGraph: {
      type:          "article",
      siteName:       SITE_NAME,
      title:          post.metaTitle,
      description:    post.metaDescription,
      url:            canonicalUrl,
      locale:         "en_US",
      images: [{
        url:    heroImageUrl,
        width:  1200,
        height: 630,
        alt:    post.heading,
      }],
      publishedTime:  new Date(post.date).toISOString(),
      modifiedTime:   new Date(post.date).toISOString(),
      authors:        [`${SITE_URL}/author/staff`],
      section:        categoryLabel,
      tags,
    },

    // ── Twitter / X Card ────────────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      site:        "@shadowledger",
      creator:     "@shadowledger",
      title:       post.metaTitle,
      description: post.metaDescription,
      images:      [{ url: heroImageUrl, alt: post.heading }],
    },

    // ── Extra article meta (Google News + AIO entity signals) ────────────────
    other: {
      "article:published_time": new Date(post.date).toISOString(),
      "article:modified_time":  new Date(post.date).toISOString(),
      "article:author":         `${SITE_NAME} Staff`,
      "article:section":        categoryLabel,
      "article:tag":            post.metaKeyword ?? "",
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────────────────
export default async function ArticleDetailPage({ params }) {
  const { category, slug } = await params;

  const rawNews    = await getNews();
  const normalized = rawNews.map(normalizeItem).filter(item => item.category !== "puerto-rico");

  const post = normalized.find(
    (p) => p.slug === slug && p.category === category
  );
  if (!post) notFound();

  // ── Sorted article list ────────────────────────────────────────────────────
  const allArticles = [...normalized].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const currentIndex = allArticles.findIndex(
    (a) => a.slug === slug && a.category === category
  );

  const prevPost =
    currentIndex + 1 < allArticles.length ? allArticles[currentIndex + 1] : null;
  const nextPost =
    currentIndex - 1 >= 0                 ? allArticles[currentIndex - 1] : null;

  const relatedPosts = allArticles
    .filter((a) => a.category === category && a.slug !== slug)
    .slice(0, 3);

  const sidebarCategories = [
    "business", "world", "finance", "technology",
    "politics", "lifestyle", "opinion", "investigation",
  ];

  // ── Shared URL vars ────────────────────────────────────────────────────────
  const canonicalUrl = `${SITE_URL}/${category}/${slug}`;
  const heroImageUrl = absoluteImage(post.heroImage);
  const encodedUrl   = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(post.heading);
  const categoryLabel = category.replace(/-/g, " ");

  // ══════════════════════════════════════════════════════════════════════════
  // JSON-LD SCHEMAS
  // ══════════════════════════════════════════════════════════════════════════

  // 1. NewsArticle — core AIO signal
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type":    "NewsArticle",
    headline:           post.metaTitle,
    alternativeHeadline: post.heading,
    description:        post.metaDescription,
    image: [{
      "@type":  "ImageObject",
      url:       heroImageUrl,
      width:     1200,
      height:    630,
      caption:   post.heading,
    }],
    datePublished:  new Date(post.date).toISOString(),
    dateModified:   new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name:    `${SITE_NAME} Staff`,
      url:     `${SITE_URL}/author/staff`,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name:    SITE_NAME,
      url:     SITE_URL,
      logo: {
        "@type":  "ImageObject",
        url:       `${SITE_URL}/images/logo.webp`,
        width:     512,
        height:    512,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection:   categoryLabel,
    keywords:         post.metaKeyword,
    isAccessibleForFree: true,
    inLanguage:          "en-US",
    // Speakable — tells Google which parts to read aloud in AIO
    speakable: {
      "@type":     "SpeakableSpecification",
      cssSelector: ["h1", ".article-excerpt"],
    },
  };

  // 2. BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1,
        name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2,
        name: categoryLabel.replace(/\b\w/g, (c) => c.toUpperCase()),
        item: `${SITE_URL}/${category}` },
      { "@type": "ListItem", position: 3,
        name: post.heading, item: canonicalUrl },
    ],
  };

  // 3. Organization / Publisher entity
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type":    "NewsMediaOrganization",
    "@id":      `${SITE_URL}/#organization`,
    name:       SITE_NAME,
    url:        SITE_URL,
    logo: {
      "@type": "ImageObject",
      url:      `${SITE_URL}/images/logo.webp`,
      width:    512,
      height:   512,
    },
    sameAs: [
      "https://facebook.com/shadowledger",
      "https://x.com/shadowledger",
      "https://www.instagram.com/shadowledger",
    ],
    contactPoint: {
      "@type":     "ContactPoint",
      contactType: "Editorial",
      url:          SITE_URL,
    },
  };

  // 4. WebPage — ties entity graph together for AIO
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type":    "WebPage",
    "@id":       canonicalUrl,
    url:         canonicalUrl,
    name:        post.metaTitle,
    description: post.metaDescription,
    inLanguage:  "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id":   `${SITE_URL}/#website`,
      url:      SITE_URL,
      name:     SITE_NAME,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url:      heroImageUrl,
    },
    breadcrumb: breadcrumbJsonLd,
    datePublished: new Date(post.date).toISOString(),
    dateModified:  new Date(post.date).toISOString(),
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-white">

      {/* JSON-LD */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <div className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* ── LEFT: Article ── */}
          <div className="lg:col-span-3">

            {/* Hero Image */}
            <div className="relative w-full h-[350px] sm:h-[480px] overflow-hidden mb-3">
              <Image
                src={post.heroImage}
                alt={post.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
                className="object-cover"
              />
            </div>

            {/* Date · Category */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <time dateTime={new Date(post.date).toISOString()}>
                {post.date}
              </time>
              <span>•</span>
              <Link
                href={`/${category}`}
                title={`View all ${categoryLabel} articles`}
                className="uppercase font-semibold text-[#d43939] hover:underline tracking-wide"
              >
                {categoryLabel}
              </Link>
            </div>

            {/* H1 */}
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-black mb-3">
              {post.heading}
            </h1>

            {/* Excerpt — speakable target for AIO */}
            {post.excerpt && (
              <p className="article-excerpt text-lg text-gray-600 mb-5 leading-relaxed border-l-4 border-[#d43939] pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Article body — raw HTML from API */}
            {post.newsContent && (
              <div
                className="
                  prose prose-base max-w-none text-gray-800
                  prose-headings:font-extrabold prose-headings:text-black
                  prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-2
                  prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2
                  prose-p:leading-7 prose-p:mb-4
                  prose-ul:list-disc prose-ul:list-inside prose-ul:mb-4
                  prose-ol:list-decimal prose-ol:list-inside prose-ol:mb-4
                  prose-li:text-base prose-li:leading-7
                  prose-a:text-[#d43939] prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-[#d43939]
                  prose-blockquote:pl-6 prose-blockquote:italic
                  prose-strong:font-bold
                "
                dangerouslySetInnerHTML={{ __html: post.newsContent }}
              />
            )}

            {/* Share */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-300">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-600">
                  Share
                </span>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  title="Share on Facebook"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <FaFacebookF size={18} />
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank" rel="noopener noreferrer"
                  title="Share on X"
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <FaXTwitter size={18} />
                </Link>
                <Link
                  href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
                  target="_blank" rel="noopener noreferrer"
                  title="Share on Pinterest"
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <FaPinterestP size={18} />
                </Link>
              </div>
            </div>

            <PrevNextArticles prevPost={prevPost} nextPost={nextPost} />
            <RelatedNews currentCategory={category} relatedPosts={relatedPosts} />

          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="lg:col-span-1 px-1">
            <DSidebar
              heroArticle={allArticles[0]}
              selectedArticles={allArticles.slice(1, 3)}
              smallArticles={allArticles.slice(4, 6)}
              categories={sidebarCategories}
              bannerImage="/images/demo.webp"
              bannerText="Don't Miss 30% Sale on Mom Jeans"
              bannerHref="/"
            />
          </div>

        </div>
      </div>
    </main>
  );
}