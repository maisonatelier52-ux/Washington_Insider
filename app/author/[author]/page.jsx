// app/author/[author]/page.jsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const API_BASE = "https://my-api-usa.com/p16/API/api";

/* AUTHOR ID → CATEGORY NAME */

const authorCategoryMap = {
  1: "Business",
  2: "World",
  3: "Finance",
  4: "Technology",
  5: "Politics",
  6: "Lifestyle",
  7: "Opinion",
  8: "Investigation"
};

/* FETCH HELPER */

async function fetchJson(url) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

/* GET AUTHOR */

async function getAuthorBySlug(slug) {

  for (let i = 1; i <= 8; i++) {

    const data = await fetchJson(`${API_BASE}/client/${i}`);

    if (data?.status && data.data.url === slug) {
      return data.data;
    }

  }

  return null;
}

/* GET NEWS */

async function getArticlesByCategory(categoryName) {

  const news = await fetchJson(`${API_BASE}/news`);

  if (!news) return [];

  const articles = Array.isArray(news) ? news : news.data;

  if (!articles) return [];

  return articles.filter(
    (article) =>
      article.category &&
      article.category.category_name &&
      article.category.category_name.toLowerCase() === categoryName.toLowerCase()
  );
}

/* ARTICLE CARD */

function ArticleCard({ article, author }) {

  const category = article.category?.category_name?.toLowerCase();

  const title =
    article.news_title ||
    article.title ||
    "Untitled";

  const image =
    article.photo_url || "/images/fallback-article.jpg";

  const excerpt =
    article.news_content_short ||
    article.meta_description ||
    "";

  const date = article.news_date;

  const href = `/${category}/${article.encode_title}`;

  return (
    <article className="group flex flex-col">

      <Link href={href}>

        <div className="relative w-full aspect-[16/10] overflow-hidden">

          <Image
            src={image}
            alt={article.img_alt || title}
            fill
            sizes="(max-width:640px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

        </div>

      </Link>

      <div className="mt-3 text-xs text-gray-500">
        <time dateTime={date}>{date}</time>
      </div>

      <Link href={href}>
        <h2 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#d43939]">
          {title}
        </h2>
      </Link>

      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {excerpt}
        <span className="text-[#d43939] font-semibold ml-1">
          Read More
        </span>
      </p>

      <div className="flex items-center gap-2 mt-3 text-xs">

        <Link
          href={`/author/${author.url}`}
          className="font-medium text-gray-700 hover:text-[#d43939]">
          {author.name}
        </Link>

        <span className="text-gray-400">•</span>

        <Link
          href={`/${category}`}
          className="uppercase text-[#d43939] font-semibold">
          {category}
        </Link>

      </div>

    </article>
  );
}

/* PAGE */

export default async function AuthorPage({ params }) {

  const { author } = await params;

  const slug = decodeURIComponent(author).toLowerCase();

  /* GET AUTHOR */

  const authorData = await getAuthorBySlug(slug);

  if (!authorData) notFound();

  /* AUTHOR CATEGORY */

  const categoryName = authorCategoryMap[authorData.id];

  if (!categoryName) notFound();

  /* GET NEWS */

  const rawArticles = await getArticlesByCategory(categoryName);

  const articles = rawArticles
    .sort(
      (a, b) =>
        new Date(b.news_date) - new Date(a.news_date)
    )
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-white">

      {/* AUTHOR HEADER */}

      <section className="bg-gray-50 border-b">

        <div className="max-w-full mx-auto px-4 md:px-[10%] py-10">

          <div className="flex flex-col sm:flex-row gap-6">

            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md">

              <Image
                src={authorData.photo_url || "/images/default-author.webp"}
                alt={authorData.name}
                fill
                sizes="128px"
                className="object-cover"
                priority
              />

            </div>

            <div>

              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {authorData.name}
              </h1>

              <p className="text-lg text-[#d43939] font-semibold uppercase mb-3">
                {authorData.title}
              </p>

              <p className="text-base text-gray-700 max-w-2xl">
                {authorData.meta_description}
              </p>

              <div className="mt-4 text-sm text-gray-600">
                {articles.length} article
                {articles.length !== 1 ? "s" : ""} published
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ARTICLES */}

      <section className="max-w-full mx-auto px-4 md:px-[10%] py-8">

        <div className="bg-[#d43939] px-4 py-5 mb-8">

          <h2 className="text-white text-xl font-bold uppercase">
            Articles by {authorData.name}
          </h2>

        </div>

        {articles.length === 0 ? (

          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles published yet.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">

            {articles.map((article) => (

              <ArticleCard
                key={article.news_id}
                article={article}
                author={authorData}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}