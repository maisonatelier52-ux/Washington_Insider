
import Image from "next/image";
import Link from "next/link";
import authorsData from "../public/data/authors.json";

// ─────────────────────────────────────────────
// Helper: get author by category
// ─────────────────────────────────────────────
function getAuthorByCategory(category) {
  const match = authorsData.categories.find(
    (item) => item.category === category
  );
  return (
    match?.author || {
      name: "Staff Reporter",
      profileImage: "/images/default-author.webp",
      slug: "staff-reporter",
    }
  );
}

// ─────────────────────────────────────────────
// Single Card
// ─────────────────────────────────────────────
function ArticleCard({ civilRightsArticles, category }) {
  // support mixed-category arrays where category lives on the article itself
  const cat = civilRightsArticles.category || category;
  const image = civilRightsArticles.image || civilRightsArticles.heroImage;
  const title = civilRightsArticles.heading || civilRightsArticles.metaTitle;
  const href = `/${cat}/${civilRightsArticles.slug}`;
  const author = getAuthorByCategory(cat);

  return (
    <article className="group flex flex-col">

      {/* ── Image ── */}
      <Link href={href} title={title} className="block overflow-hidden">
        <div className="relative w-full aspect-[15/9] overflow-hidden">
          <Image
            src={image}
            alt={civilRightsArticles.alt || title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover "
            loading="lazy"
          />
        </div>
      </Link>

      {/* ── Date ── */}
      <div className="mt-3 text-xs text-gray-500">
        <time dateTime={new Date(civilRightsArticles.date).toISOString()}>
          {civilRightsArticles.date}
        </time>
      </div>

      {/* ── Title ── */}
      <Link href={href} title={title} className="mt-1 block">
        <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
          {title}
        </h2>
      </Link>

    </article>
  );
}

// ─────────────────────────────────────────────
// 2×2 Grid
// ─────────────────────────────────────────────
export default function ArticleGrid({ civilRightsArticles = [], category }) {
  if (!civilRightsArticles.length) return null;

  // Always show exactly 4 cards
  const cards = civilRightsArticles.slice(0, 4);

  return (
    <section
      className="max-w-7xl mx-auto py-8 pb-0"
      aria-label="Latest articles"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
        {cards.map((article) => (
          <ArticleCard
            key={article.slug}
            civilRightsArticles={article}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}