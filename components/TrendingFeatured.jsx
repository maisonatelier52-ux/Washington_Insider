
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────
// SMALL ARTICLE ROW (thumbnail + title + divider)
// ─────────────────────────────────────────────
function SmallArticleRow({ article, category }) {
  const image = article.image || article.heroImage;
  const title = article.heading || article.metaTitle;

  return (
    <li>
      <Link
        href={`/${category}/${article.slug}`}
        title={title}
        className="flex items-center gap-3 group py-3"
      >
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-35 h-20 overflow-hidden">
          <Image
            src={image}
            alt={article.alt || title}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors duration-200">
          {title}
        </h3>
      </Link>

      {/* Divider */}
      <div className="border-t border-gray-200" />
    </li>
  );
}

// ─────────────────────────────────────────────
// SINGLE COLUMN (Trending or Featured)
// ─────────────────────────────────────────────
function NewsColumn({ label, accentColor, articles, category, viewAllHref }) {
  if (!articles || articles.length === 0) return null;

  const hero = articles[0];
  const smalls = articles.slice(1, 4);
  const heroImage = hero.image || hero.heroImage;
  const heroTitle = hero.heading || hero.metaTitle;

  return (
    <section
      className="flex flex-col"
      aria-label={`${label} articles`}
    >
      {/* ── Column Header ── */}
      <div
        className="px-6 py-4"
        style={{ backgroundColor: accentColor }}
      >
        <h2 className="text-white text-base text-xl font-bold uppercase tracking-wider">
          {label}
        </h2>
      </div>

      {/* ── Hero Article ── */}
      <Link
        href={`/${category}/${hero.slug}`}
        title={heroTitle}
        className="block group"
      >
        {/* Hero Image */}
        <div className="relative w-full h-52 sm:h-60 overflow-hidden">
          <Image
            src={heroImage}
            alt={hero.alt || heroTitle}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Hero Meta */}
        <div className="flex items-center gap-3 mt-3 px-1 text-xs text-gray-500">
          <time dateTime={new Date(hero.date).toISOString()}>
            {hero.date}
          </time>
        </div>

        {/* Hero Headline */}
        <h2 className="mt-1 px-1 text-xl font-extrabold text-gray-900 leading-tight line-clamp-3 group-hover:text-red-600 transition-colors duration-200">
          {heroTitle}
        </h2>
      </Link>

      {/* ── Small Articles List ── */}
      <div className="mt-4 border-t border-gray-200">
        <ul>
          {smalls.map((article) => (
            <SmallArticleRow
              key={article.slug}
              article={article}
              category={category}
            />
          ))}
        </ul>
      </div>

      {/* ── VIEW ALL Button ── */}
      <Link
        href={viewAllHref || `/${category}`}
        title={`View all ${label} articles`}
        className="mt-auto block text-center text-white text-sm font-bold uppercase tracking-widest py-3 transition-opacity duration-200 hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        View All
      </Link>
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export default function TrendingFeatured({
  trendingArticles = [],
  trendingCategory = "business",
  trendingLabel = "BUSINESS",
  trendingViewAllHref,

  featuredArticles = [],
  featuredCategory = "technology",
  featuredLabel = "TECHNOLOGY",
  featuredViewAllHref,
}) {
  return (
    <section
      className="max-w-7xl mx-auto  py-1"
      aria-label="Trending and Featured news"
    >
      {/*
        Grid layout:
        - Mobile:  1 column (Trending on top, Featured below)
        - Desktop: 2 equal columns side by side
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT — Trending */}
        <NewsColumn
          label={trendingLabel}
          accentColor="#d43939"
          articles={trendingArticles}
          category={trendingCategory}
          viewAllHref={trendingViewAllHref}
        />

        {/* RIGHT — Featured */}
        <NewsColumn
          label={featuredLabel}
          accentColor="#162238"
          articles={featuredArticles}
          category={featuredCategory}
          viewAllHref={featuredViewAllHref}
        />
      </div>
    </section>
  );
}