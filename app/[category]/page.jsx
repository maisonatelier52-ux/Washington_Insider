import React from "react";
import authorsData from "../../public/data/authors.json";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const NEWS_API = "https://my-api-usa.com/p16/API/api/news";
const IMAGE_URL = "https://my-api-usa.com/p16/API/api/news-images";

// Allowed categories (must match API category_name lowercase)
const categoryConfig = {
  business: { title: "Business" },
  world: { title: "World" },
  finance: { title: "Finance" },
  technology: { title: "Technology" },
  politics: { title: "Politics" },
  lifestyle: { title: "Lifestyle" },
  opinion: { title: "Opinion" },
  investigation: { title: "Investigation" },
};

// Fetch news
async function getNews() {
  try {
    const res = await fetch(NEWS_API, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.log("API error:", e);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  // ⚠️ Next.js 16 FIX
  const { category } = await params;
  const categorySlug = category?.toLowerCase();

  console.log("Category:", categorySlug);

  // Validate category
  if (!categorySlug || !categoryConfig[categorySlug]) {
    notFound();
  }

  const config = categoryConfig[categorySlug];

  // Author
  const categoryAuthor = authorsData.categories.find(
    (item) => item.category === categorySlug
  );

  const author = categoryAuthor?.author || {
    name: "Staff Reporter",
    slug: "staff-reporter",
  };

  // Fetch API data
  const news = await getNews();

  console.log("Total news:", news.length);

  // Filter API data by category
  const sortedArticles = news
    .filter((item) => {
      const apiCategory =
        item.category?.category_name?.toLowerCase() || "";
      return apiCategory === categorySlug;
    })
    .map((item) => ({
      slug: item.encode_title,
      title: item.title || item.news_title,
      image: item.photo_url,
      date: item.news_date,
      excerpt:
        item.news_content_short || item.meta_description || "",
      alt: item.img_alt,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  console.log("Filtered articles:", sortedArticles.length);

  return (
    <main>
      <section className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
        {/* Header */}
        <div className="bg-[#d43939] px-4 py-5 mb-8">
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">
            {config.title}
          </h2>
        </div>

        {sortedArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found for "{categorySlug}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {sortedArticles.map((article) => {
              const href = `/${categorySlug}/${article.slug}`;

              return (
                <article
                  key={article.slug}
                  className="group flex flex-col"
                >
                  {/* Image */}
                  <Link href={href} className="block overflow-hidden">
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.alt || article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Date */}
                  <div className="mt-3 text-xs text-gray-500">
                    <time>
                      {article.date}
                    </time>
                  </div>

                  {/* Title */}
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

                  {/* Author */}
                  <div className="flex items-center gap-2 mt-3 text-xs">
                    <Link
                      href={`/authors/${author.slug}`}
                      className="font-medium text-gray-700 hover:text-[#d43939]"
                    >
                      {author.name}
                    </Link>
                    <span className="text-gray-400">•</span>
                    <Link
                      href={`/${categorySlug}`}
                      className="uppercase text-[#d43939] font-semibold"
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