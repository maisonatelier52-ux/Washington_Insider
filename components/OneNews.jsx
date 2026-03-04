// import Image from "next/image";
// import Link from "next/link";

// // Get Author by Category
// function getAuthorByCategory(category) {
//   const categoryAuthor = authorsData.categories.find(
//     (item) => item.category === category
//   );

//   return (
//     categoryAuthor?.author || {
//       name: "Staff Reporter",
//       profileImage: "/images/default-author.webp",
//       country: "USA",
//       slug: "staff-reporter",
//     }
//   );
// }

// export default function ArticleCard({ article, category }) {
//   const image = article.image || article.heroImage;
//   const title = article.heading || article.metaTitle;
//   const href = `/${category}/${article.slug}`;

//   const author = getAuthorByCategory(category);

//   // Tags
//   const tags = Array.isArray(article.tags)
//     ? article.tags
//     : typeof article.tags === "string"
//     ? article.tags.split(",").map((t) => t.trim())
//     : [];

//   return (
//     <article className="group flex flex-col">

//       {/* Image */}
//       <Link href={href} title={title} className="block overflow-hidden">
//         <div className="relative w-full aspect-[16/9] overflow-hidden">
//           <Image
//             src={image}
//             alt={article.alt || title}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover "
//           />
//         </div>
//       </Link>

//       {/* Date */}
//       <div className="mt-3 text-xs text-gray-500">
//         <time dateTime={new Date(article.date).toISOString()}>
//           {article.date}
//         </time>
//       </div>

//       {/* Title */}
//       <Link href={href} title={title} className="mt-1 block">
//         <h2 className="text-xl font-extrabold text-gray-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors duration-200">
//           {title}
//         </h2>
//       </Link>

//       {/* Excerpt */}
//       <Link href={href} title={`Read more: ${title}`} className="mt-2 block">
//         <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
//           {article.excerpt || article.metaDescription}{" "}
//           <span className="text-red-600 font-semibold hover:underline">
//             Read More
//           </span>
//         </p>
//       </Link>

//       {/* Author + Category (BELOW content) */}
//       <div className="flex items-center gap-2 mt-3 text-xs">
//         <Link
//           href={`/author/${author.slug}`}
//           className="font-medium text-gray-700 hover:text-red-600 transition-colors"
//         >
//           {author.name}
//         </Link>

//         <span className="text-gray-400">•</span>

//         <Link
//           href={`/${category}`}
//           className="uppercase text-red-600 font-semibold hover:underline"
//         >
//           {category.replace("-", " ")}
//         </Link>
//       </div>

//       {/* Tags */}
//       {tags.length > 0 && (
//         <p className="mt-3 text-xs text-gray-400">
//           {tags.join(", ")}
//         </p>
//       )}
//     </article>
//   );
// }


import Image from "next/image";
import Link from "next/link";

// Static dummy author – used for all cards since no real author data exists
const dummyAuthor = {
  name: "News Desk",
  slug: "news-desk",
};

export default function ArticleCard({ article, category }) {
  // Safe defaults for all fields
  const image = article.image || article.heroImage || "/images/placeholder.webp";
  const title = article.heading || article.metaTitle || "Untitled";
  const href = `/${category || "news"}/${article.slug || "#"}`;
  const excerpt = article.excerpt || article.metaDescription || "";
  const date = article.date || new Date().toISOString().split("T")[0];
  const tags = Array.isArray(article.tags)
    ? article.tags
    : typeof article.tags === "string"
    ? article.tags.split(",").map(t => t.trim()).filter(Boolean)
    : [];
  const author = dummyAuthor; // always dummy

  return (
    <article className="group flex flex-col">

      {/* Image */}
      <Link href={href} title={title} className="block overflow-hidden">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={article.alt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <h2 className="text-xl font-extrabold text-gray-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors duration-200">
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
          href={`/author/${author.slug}`}
          title={`Articles by ${author.name}`}
          className="font-medium text-gray-700 hover:text-red-600 transition-colors"
        >
          {author.name}
        </Link>

        <span className="text-gray-400">•</span>

        <Link
          href={`/${category || "news"}`}
          title={`View all ${category || "news"} articles`}
          className="uppercase text-red-600 font-semibold hover:underline"
        >
          {(category || "news").replace(/-/g, " ")}
        </Link>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <p className="mt-3 text-xs text-gray-400">
          {tags.join(", ")}
        </p>
      )}
    </article>
  );
}