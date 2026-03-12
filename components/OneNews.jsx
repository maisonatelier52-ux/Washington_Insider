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

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* CATEGORY → AUTHOR API ID */

const categoryAuthorMap = {
  business: 1,
  world: 2,
  finance: 3,
  technology: 4,
  politics: 5,
  lifestyle: 6,
  opinion: 7,
  investigation: 8
};

export default function ArticleCard({ article, category }) {

  const [author, setAuthor] = useState(null);

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

  /*
  FETCH AUTHOR BASED ON CATEGORY
  */

  useEffect(() => {

    async function fetchAuthor() {

      const authorId = categoryAuthorMap[category] || 1;

      try {

        const res = await fetch(
          `https://my-api-usa.com/p16/API/api/client/${authorId}`
        );

        const data = await res.json();

        if (data.status) {
          setAuthor(data.data);
        }

      } catch (error) {
        console.error("Author fetch error:", error);
      }

    }

    fetchAuthor();

  }, [category]);

  return (
    <article className="group flex flex-col pt-5">

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

      {/* Excerpt */}

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
          href={`/author/${author?.url }`}
          title={`Articles by ${author?.name}`}
          className="font-medium text-gray-700 hover:text-red-600 transition-colors"
        >
          {author?.name }
        </Link>

        <span className="text-gray-400">•</span>

        <Link
          href={`/${category}`}
          title={`View all ${category } articles`}
          className="uppercase text-red-600 font-semibold hover:underline"
        >
          {(category).replace(/-/g, " ")}
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