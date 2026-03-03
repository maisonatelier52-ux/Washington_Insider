// app/authors/[author]/page.jsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// No imports for JSON — we fetch them from /public

const SITE_URL = "https://www.courtnews.org";

// Helper: fetch JSON from public folder
async function fetchJson(url) {
  try {
    const fullUrl = `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
    const res = await fetch(fullUrl, {
      cache: "force-cache", // static caching for build & performance
      next: { revalidate: 3600 }, // optional: revalidate every hour
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
      return null; // or throw if you want hard failure
    }

    return res.json();
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    return null;
  }
}

// ─────────────────────────────────────────────
// Get author by slug
// ─────────────────────────────────────────────
async function getAuthorBySlug(authorSlug) {
  const authorsData = await fetchJson("/data/authors.json");
  if (!authorsData) return null;

  const match = authorsData.categories.find(
    (item) => item.author.slug === authorSlug
  );

  return match ? { ...match.author, category: match.category } : null;
}

// ─────────────────────────────────────────────
// Get articles for category
// ─────────────────────────────────────────────
async function getArticlesByCategory(category) {
  const categoryData = await fetchJson("/data/category/categorypagedata.json");
  if (!categoryData) return [];

  return categoryData[category] || [];
}

// ─────────────────────────────────────────────
// Article Card (same style as category page)
// ─────────────────────────────────────────────
function ArticleCard({ article, author }) {
  // Fallbacks to avoid undefined errors
  const cat = article.category || author.category || "news";
  const image = article.image || article.heroImage || "/images/fallback-article.jpg";
  const title = article.heading || article.metaTitle || "Untitled";
  const href = `/${cat}/${article.slug || "article"}`;
  const excerpt = article.excerpt || article.metaDescription || "";

  return (
    <article className="group flex flex-col">
      {/* Image */}
      <Link href={href} title={title} className="block overflow-hidden">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={article.alt || title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Date */}
      <div className="mt-3 text-xs text-gray-500">
        <time dateTime={new Date(article.date).toISOString()}>
          {article.date || "—"}
        </time>
      </div>

      {/* Title */}
      <Link href={href} title={title} className="mt-1 block">
        <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#d43939] transition-colors duration-200">
          {title}
        </h2>
      </Link>

      {/* Excerpt + Read More */}
      <Link href={href} title={`Read more: ${title}`} className="mt-2 block">
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {excerpt}{" "}
          <span className="text-[#d43939] font-semibold hover:underline">
            Read More
          </span>
        </p>
      </Link>

      {/* Author + Category */}
      <div className="flex items-center gap-2 mt-3 text-xs">
        <Link
          href={`/authors/${author.slug}`}
          title={`Articles by ${author.name}`}
          className="font-medium text-gray-700 hover:text-[#d43939] transition-colors"
        >
          {author.name}
        </Link>
        <span className="text-gray-400">•</span>
        <Link
          href={`/${cat}`}
          title={`View all ${cat.replace(/-/g, " ")} articles`}
          className="uppercase text-[#d43939] font-semibold hover:underline"
        >
          {cat.replace(/-/g, " ")}
        </Link>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default async function AuthorPage({ params }) {
  const { author: rawSlug } = await params;
  const authorSlug = decodeURIComponent(rawSlug);

  // Load author
  const author = await getAuthorBySlug(authorSlug);
  if (!author) notFound();

  // Load raw articles for category
  const rawArticles = await getArticlesByCategory(author.category);

  // Attach category to every article (fixes undefined.replace crash)
  const authorArticles = rawArticles.map((article) => ({
    ...article,
    category: author.category, // ensure category exists
  }));

  // Sort newest first, limit to 6
  const sortedArticles = authorArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-white">
      {/* Author Header */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-full mx-auto px-4 md:px-[10%] py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              <Image
                src={author.profileImage || "/images/default-author.webp"}
                alt={`${author.name} profile`}
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {author.name}
              </h1>

              {author.jobtitle && (
                <p className="text-lg text-[#d43939] font-semibold uppercase tracking-wide mb-3">
                  {author.jobtitle}
                </p>
              )}

              {author.bio && (
                <p className="text-base text-gray-700 max-w-2xl leading-relaxed">
                  {author.bio}
                </p>
              )}

              <div className="mt-4 text-sm text-gray-600">
                {sortedArticles.length} article{sortedArticles.length !== 1 ? "s" : ""} published
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5" aria-label={`Articles by ${author.name}`}>
        <div className="bg-[#d43939] px-4 py-5 mb-8">
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">
            Articles by {author.name}
          </h2>
        </div>

        {sortedArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {sortedArticles.map((article) => (
              <ArticleCard key={article.slug || Math.random()} article={article} author={author} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}