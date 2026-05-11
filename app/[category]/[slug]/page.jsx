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
const SITE_URL = "https://www.washingtoninsider.org";
// ══════════════════════════════════════════════════════════════════════════════

const SITE_NAME = "Washington Insider";
const NEWS_API = "https://my-api-usa.com/p16/API/api/news";

// ── Allowed categories
const ALLOWED_CATEGORIES = [
  "business",
  "world",
  "finance",
  "technology",
  "politics",
  "lifestyle",
  "opinion",
  "investigation",
];

// Category → Author ID mapping
const categoryAuthorMap = {
  business: 1,
  world: 2,
  finance: 3,
  technology: 4,
  politics: 5,
  lifestyle: 6,
  opinion: 7,
  investigation: 8,
};

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
    slug: item.encode_title,
    heading: item.title || item.news_title,
    metaTitle: item.meta_title,
    metaDescription: item.meta_description,
    metaKeyword: item.meta_keyword,
    image: item.photo_url,
    heroImage: item.photo_url,
    alt: item.img_alt || item.title || item.news_title,
    date: item.news_date,
    excerpt: item.news_content_short,
    newsContent: item.news_content,
    category,
  };
}

// ── Helper: ensure absolute image URL ────────────────────────────────────────
function absoluteImage(url) {
  if (!url) return `${SITE_URL}/images/og-default.webp`;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

// ────────────────────────────────────────────────────────────────────────────
// METADATA
// ────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const rawNews = await getNews();

  const normalized = rawNews
    .map(normalizeItem)
    .filter(item => item.category !== "puerto-rico" && ALLOWED_CATEGORIES.includes(item.category));

  const post = normalized.find((p) => p.slug === slug && p.category === category);

  const isPuertoRico = category?.toLowerCase() === "puerto-rico" || category?.toLowerCase().includes("puerto");

  if (!post) {
    return { title: `Article Not Found | ${SITE_NAME}`, robots: "noindex" };
  }

  const canonicalUrl = `${SITE_URL}/${category}/${slug}`;
  const heroImageUrl = absoluteImage(post.heroImage);
  const categoryLabel = category.replace(/-/g, " ");
  const tags = post.metaKeyword?.split(",").map((k) => k.trim()) ?? [];

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeyword,
    alternates: { canonical: canonicalUrl },
    robots: isPuertoRico ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      images: [{ url: heroImageUrl, width: 1200, height: 630, alt: post.heading }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [{ url: heroImageUrl }],
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────────────────
export default async function ArticleDetailPage({ params }) {
  const { category, slug } = await params;

  const rawNews = await getNews();

  const normalized = rawNews
    .map(normalizeItem)
    .filter(
      (item) =>
        item.category !== "puerto-rico" &&
        ALLOWED_CATEGORIES.includes(item.category)
    );

  const post = normalized.find((p) => p.slug === slug && p.category === category);
  if (!post) notFound();

  const allArticles = [...normalized].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const currentIndex = allArticles.findIndex(
    (a) => a.slug === slug && a.category === category
  );

  const prevPost =
    currentIndex + 1 < allArticles.length ? allArticles[currentIndex + 1] : null;
  const nextPost =
    currentIndex - 1 >= 0 ? allArticles[currentIndex - 1] : null;

  const relatedPosts = allArticles
    .filter((a) => a.category === category && a.slug !== slug)
    .slice(0, 3);

  const sidebarCategories = ALLOWED_CATEGORIES;

  const canonicalUrl = `${SITE_URL}/${category}/${slug}`;
  const heroImageUrl = absoluteImage(post.heroImage);
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(post.heading);
  const categoryLabel = category.replace(/-/g, " ");

  // ── Fetch Author for this article (using categoryAuthorMap) ───────────────
  const authorId = categoryAuthorMap[post.category] || 1;
  let author = null;
  try {
    const authorRes = await fetch(`https://my-api-usa.com/p16/API/api/client/${authorId}`);
    const authorData = await authorRes.json();
    if (authorData.status && authorData.data) {
      author = authorData.data;
    }
  } catch (err) {
    console.error("Author fetch failed:", err);
  }

  // JSON-LD (unchanged)
  const articleJsonLd = { /* ... your existing articleJsonLd ... */ };
  const breadcrumbJsonLd = { /* ... your existing breadcrumbJsonLd ... */ };
  const organizationJsonLd = { /* ... your existing organizationJsonLd ... */ };
  const webPageJsonLd = { /* ... your existing webPageJsonLd ... */ };

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <div className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* LEFT: Article */}
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <div className="relative w-full h-[350px] sm:h-[480px] overflow-hidden mb-3">
              <Image src={post.heroImage} alt={post.alt} fill priority sizes="(max-width: 768px) 100vw, 75vw" className="object-cover" />
            </div>

            {/* Date · Category */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
              <span>•</span>
              <Link href={`/${category}`} className="uppercase font-semibold text-[#d43939] hover:underline tracking-wide">
                {categoryLabel}
              </Link>
            </div>

            {/* H1 */}
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-black mb-3">{post.heading}</h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="article-excerpt text-lg text-gray-600 mb-5 leading-relaxed border-l-4 border-[#d43939] pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Article body */}
            {post.newsContent && (
              <div className="prose prose-base max-w-none text-gray-800 ..." dangerouslySetInnerHTML={{ __html: post.newsContent }} />
            )}

 

            {/* Share */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-300">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-600">Share</span>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook" className="text-gray-500 hover:text-blue-600 transition-colors">
                  <FaFacebookF size={18} />
                </Link>
                <Link href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" title="Share on X" className="text-gray-500 hover:text-black transition-colors">
                  <FaXTwitter size={18} />
                </Link>
                <Link href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`} target="_blank" rel="noopener noreferrer" title="Share on Pinterest" className="text-gray-500 hover:text-red-600 transition-colors">
                  <FaPinterestP size={18} />
                </Link>
              </div>
            </div>

                       {/* ──────────────────────────────────────────────── */}
            {/* NEW: Author Detail Section (exactly as in your image) */}
            {/* ──────────────────────────────────────────────── */}
            {author && (
              <div className="mt-6 pt-8 border-t-2 border-dashed border-gray-300">
                <div className="flex items-start gap-6">
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">
                    <Image
                      src={author.photo_url}
                      alt={author.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-2">{author.name}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {author.meta_description || author.title || "Author bio not available."}
                    </p>
                    <Link
                      href={`/author/${author.url || "#"}`}
                      className="mt-4 inline-block text-[#d43939] font-semibold hover:underline"
                    >
                      View All Posts by Author →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <PrevNextArticles prevPost={prevPost} nextPost={nextPost} />
            <RelatedNews currentCategory={category} relatedPosts={relatedPosts} />
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-1 px-1">
            <DSidebar
              heroArticle={allArticles[0]}
              selectedArticles={allArticles.slice(1, 3)}
              smallArticles={allArticles.slice(3, 5)}
              categories={sidebarCategories}
              bannerImage="/images/mirrorstandard.webp"
              bannerHref="https://www.mirrorstandard.com/"
            />
          </div>
        </div>
      </div>
    </main>
  );
}