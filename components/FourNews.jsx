
// import Image from "next/image";
// import Link from "next/link";


// // ─────────────────────────────────────────────
// // Helper: get author by category
// // ─────────────────────────────────────────────
// function getAuthorByCategory(category) {
//   const match = authorsData.categories.find(
//     (item) => item.category === category
//   );
//   return (
//     match?.author || {
//       name: "Staff Reporter",
//       profileImage: "/images/default-author.webp",
//       slug: "staff-reporter",
//     }
//   );
// }

// // ─────────────────────────────────────────────
// // Single Card
// // ─────────────────────────────────────────────
// function ArticleCard({ lawandjusticeArticles, category }) {
//   // support mixed-category arrays where category lives on the article itself
//   const cat = lawandjusticeArticles.category || category;
//   const image = lawandjusticeArticles.image || lawandjusticeArticles.heroImage;
//   const title = lawandjusticeArticles.heading || lawandjusticeArticles.metaTitle;
//   const href = `/${cat}/${lawandjusticeArticles.slug}`;
//   const author = getAuthorByCategory(cat);

//   return (
//     <article className="group flex flex-col">

//       {/* ── Image ── */}
//       <Link href={href} title={title} className="block overflow-hidden">
//         <div className="relative w-full aspect-[15/9] overflow-hidden">
//           <Image
//             src={image}
//             alt={lawandjusticeArticles.alt || title}
//             fill
//             sizes="(max-width: 640px) 100vw, 50vw"
//             className="object-cover "
//             loading="lazy"
//           />
//         </div>
//       </Link>

//       {/* ── Date ── */}
//       <div className="mt-3 text-xs text-gray-500">
//         <time dateTime={new Date(lawandjusticeArticles.date).toISOString()}>
//           {lawandjusticeArticles.date}
//         </time>
//       </div>

//       {/* ── Title ── */}
//       <Link href={href} title={title} className="mt-1 block">
//         <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
//           {title}
//         </h2>
//       </Link>

//       {/* ── Excerpt + Read More ── */}
//       <Link href={href} title={`Read more: ${title}`} className="mt-2 block">
//         <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
//           {lawandjusticeArticles.excerpt || lawandjusticeArticles.metaDescription}{" "}
//           <span className="text-red-600 font-semibold hover:underline">
//             Read More
//           </span>
//         </p>
//       </Link>

//       {/* ── Author + Category ── */}
//       <div className="flex items-center gap-2 mt-3 text-xs">
//         <Link
//           href={`/authors/${author.slug}`}
//           title={`Articles by ${author.name}`}
//           className="font-medium text-gray-700 hover:text-red-600 transition-colors"
//         >
//           {author.name}
//         </Link>
//         <span className="text-gray-400">•</span>
//         <Link
//           href={`/${cat}`}
//           title={`View all ${cat} articles`}
//           className="uppercase text-red-600 font-semibold hover:underline"
//         >
//           {cat.replace(/-/g, " ")}
//         </Link>
//       </div>
//     </article>
//   );
// }

// // ─────────────────────────────────────────────
// // 2×2 Grid
// // ─────────────────────────────────────────────
// export default function ArticleGrid({ lawandjusticeArticles = [], category }) {
//   if (!lawandjusticeArticles.length) return null;

//   // Always show exactly 4 cards
//   const cards = lawandjusticeArticles.slice(0, 4);

//   return (
//     <section
//       className="max-w-7xl mx-auto py-8 pb-0"
//       aria-label="Latest articles"
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
//         {cards.map((article) => (
//           <ArticleCard
//             key={article.slug}
//             lawandjusticeArticles={article}
//             category={category}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

// Static dummy author – same for all cards (no data source needed)
const dummyAuthor = {
  name: "News Desk",
  slug: "news-desk",
};

function ArticleCard({ lawandjusticeArticles, category }) {
  // Safe defaults for all fields
  const cat = lawandjusticeArticles.category || category || "news";
  const image = lawandjusticeArticles.image || lawandjusticeArticles.heroImage || "/images/placeholder.webp";
  const title = lawandjusticeArticles.heading || lawandjusticeArticles.metaTitle || "Untitled";
  const href = `/${cat}/${lawandjusticeArticles.slug || "#"}`;
  const excerpt = lawandjusticeArticles.excerpt || lawandjusticeArticles.metaDescription || "";
  const date = lawandjusticeArticles.date || new Date().toISOString().split("T")[0];
  const alt = lawandjusticeArticles.alt || title;
  const author = dummyAuthor; // always dummy

  return (
    <article className="group flex flex-col">

      {/* Image */}
      <Link href={href} title={title} className="block overflow-hidden">
        <div className="relative w-full aspect-[15/9] overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Date */}
      <div className="mt-3 text-xs text-gray-500">
        <time dateTime={new Date(date).toISOString()}>
          {date}
        </time>
      </div>

      {/* Title */}
      <Link href={href} title={title} className="mt-1 block">
        <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
          {title}
        </h2>
      </Link>

      {/* Excerpt + Read More */}
      <Link href={href} title={`Read more: ${title}`} className="mt-2 block">
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {excerpt}{" "}
          <span className="text-red-600 font-semibold hover:underline">
            Read More
          </span>
        </p>
      </Link>

      {/* Author + Category */}
      <div className="flex items-center gap-2 mt-3 text-xs">
        <Link
          href={`/authors/${author.slug}`}
          title={`Articles by ${author.name}`}
          className="font-medium text-gray-700 hover:text-red-600 transition-colors"
        >
          {author.name}
        </Link>
        <span className="text-gray-400">•</span>
        <Link
          href={`/${cat}`}
          title={`View all ${cat} articles`}
          className="uppercase text-red-600 font-semibold hover:underline"
        >
          {cat.replace(/-/g, " ")}
        </Link>
      </div>
    </article>
  );
}

export default function ArticleGrid({ lawandjusticeArticles = [], category }) {
  if (!lawandjusticeArticles.length) return null;

  // Show up to 4 cards
  const cards = lawandjusticeArticles.slice(0, 4);

  return (
    <section
      className="max-w-7xl mx-auto py-8 pb-0"
      aria-label="Latest articles"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
        {cards.map((article, index) => (
          <ArticleCard
            key={article.slug || `${category}-${index}`}
            lawandjusticeArticles={article}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}