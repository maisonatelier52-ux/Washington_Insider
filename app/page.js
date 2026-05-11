import Image from "next/image";
import Link from "next/link";
import LatestNews from "../components/LatestNews";
import PoliticsNews from "../components/PoliticsNews";
import ArticleCard from "../components/OneNews";
import Fournews from "../components/FourNews";
import Fourcard from "../components/Fourcard";
import Sidebar from "../components/Sidebar";
import TrendingFeatured from "../components/TrendingFeatured";

// ══════════════════════════════════════════════════════════════════════════════
// SITE SETTINGS
// ══════════════════════════════════════════════════════════════════════════════
const SITE_URL = "https://www.washingtoninsider.org/";
const SITE_NAME = "Washington Insider";
const SITE_DESCRIPTION =
  "Washington Insider delivers breaking news, in-depth investigations, and analysis across business, politics, technology, finance, and world affairs.";

const API_URL = "https://my-api-usa.com/p16/API/api/news";

// ══════════════════════════════════════════════════════════════════════════════
// ALLOWED CATEGORIES (all singular — important for routing)
// ══════════════════════════════════════════════════════════════════════════════
const ALLOWED_CATEGORIES = [
  "business",
  "world",
  "finance",
  "technology",
  "politics",
  "lifestyle",
  "opinion",
  "investigation", // ← singular, matches route
];

// ── Fetch News ────────────────────────────────────────────────────────────────
async function getNews() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("API fetch failed");
    return await res.json();
  } catch (error) {
    console.error("News API error:", error);
    return [];
  }
}

// ── Dummy Author (used everywhere) ───────────────────────────────────────────
const dummyAuthor = {
  name: "News Desk",
  profileImage: "/images/default-author.webp",
  country: "USA",
  slug: "news-desk",
};

// ══════════════════════════════════════════════════════════════════════════════
// SEO METADATA
// ══════════════════════════════════════════════════════════════════════════════
export const metadata = {
  title: {
    default: `${SITE_NAME} — Breaking News, Politics, Business & World`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Breaking News, Politics, Business & World`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/images/og-home.webp`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} homepage`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@washingtoninsider",
    creator: "@washingtoninsider",
    title: `${SITE_NAME} — Breaking News, Politics, Business & World`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/og-home.webp`],
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default async function Home() {
  const news = await getNews();

  // Filter only allowed categories
  const filteredNews = news.filter((item) => {
    const categoryName = item.category?.category_name?.toLowerCase();
    return ALLOWED_CATEGORIES.includes(categoryName);
  });

  // Group by category (force singular where needed)
  const categoryPageData = filteredNews.reduce((acc, item) => {
    let categoryName = item.category?.category_name
      ?.toLowerCase()
      .replace(/\s+/g, "-");

    // Force singular for consistency (prevents routing issues)
    if (categoryName === "investigations") categoryName = "investigation";

    if (!categoryName || !ALLOWED_CATEGORIES.includes(categoryName)) return acc;

    if (!acc[categoryName]) acc[categoryName] = [];

    acc[categoryName].push({
      slug: item.encode_title || "#",
      heading: item.title || item.news_title || "Untitled",
      metaTitle: item.meta_title || "",
      image: item.photo_url || "/images/placeholder.webp",
      heroImage: item.photo_url || "/images/placeholder.webp",
      alt: item.img_alt || "News image",
      date: item.news_date || new Date().toISOString().split("T")[0],
      excerpt: item.news_content_short || "",
      metaDescription: item.meta_description || "",
      category: categoryName,
    });

    return acc;
  }, {});

  // Flatten + attach dummy author
  const allArticles = Object.entries(categoryPageData).flatMap(([category, articles]) =>
    articles.map((article) => ({
      ...article,
      category,
      author: dummyAuthor,
    }))
  );

  const sortByDate = (arr) =>
    [...arr].sort((a, b) => new Date(b.date) - new Date(a.date));

  // ── Sections ────────────────────────────────────────────────────────────────
  const latestArticles = sortByDate(allArticles).slice(0, 4);

  const politicsArticles = sortByDate(categoryPageData["politics"] || []).slice(0, 2).map((a) => ({ ...a, author: dummyAuthor }));
  const trendingArticles = sortByDate(categoryPageData["business"] || []).slice(0, 4).map((a) => ({ ...a, author: dummyAuthor }));
  const featuredArticles = sortByDate(categoryPageData["technology"] || []).slice(0, 4).map((a) => ({ ...a, author: dummyAuthor }));
  const UsnewsArticles = sortByDate(categoryPageData["world"] || []).map((a) => ({ ...a, author: dummyAuthor }));
  const lawandjusticeArticles = sortByDate(categoryPageData["finance"] || []).slice(0, 4).map((a) => ({ ...a, author: dummyAuthor }));
  const civilRightsArticles = sortByDate(categoryPageData["lifestyle"] || []).slice(0, 4).map((a) => ({ ...a, author: dummyAuthor }));
  const investigationArticles = sortByDate(categoryPageData["investigation"] || []).slice(0, 4).map((a) => ({ ...a, author: dummyAuthor }));
  const opinionArticles = sortByDate(categoryPageData["opinion"] || []).slice(0, 6).map((a) => ({ ...a, author: dummyAuthor }));

  // Latest News Items
  const latestNewsItems = latestArticles.map((article, index) => ({
    id: index,
    image: article.image,
    alt: article.alt || article.heading,
    heading: article.heading || article.metaTitle,
    slug: article.slug,
    category: article.category,
    date: article.date,
    author: dummyAuthor,
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <LatestNews latestNewsItems={latestNewsItems} />

            <PoliticsNews politicsArticles={politicsArticles} />

            <TrendingFeatured
              trendingArticles={trendingArticles}
              trendingCategory="business"
              featuredArticles={featuredArticles}
              featuredCategory="technology"
            />

            <div className="w-full bg-white py-[30px] pb-10 mx-auto text-center p-5 max-w-[1300px]">
              <div className="max-w-[1100px] mx-auto">
                <Link href="https://www.progresskingdom.com/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/progresskingdom.webp"
                    alt="Progress Kingdom"
                    width={1100}
                    height={125}
                    className="w-full h-auto rounded-md"
                  />
                </Link>
              </div>
            </div>

            {UsnewsArticles[0] && (
              <ArticleCard article={UsnewsArticles[0]} category="world" />
            )}

            <Fournews lawandjusticeArticles={lawandjusticeArticles} category="finance" />

            <Fourcard civilRightsArticles={civilRightsArticles} category="lifestyle" />

            {/* FIXED: Investigation section – now uses /investigation/... */}
            <section className="w-full py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {investigationArticles.map((article) => {
                  const title = article.heading || article.metaTitle || "Untitled";
                  const image = article.image || article.heroImage || "/images/placeholder.webp";

                  return (
                    <div key={article.slug} className="flex flex-col">
                      <div className="flex gap-4">
                        <Link
                          href={`/investigation/${article.slug}`} // ← FIXED: singular
                          className="flex-shrink-0"
                          title={title}
                        >
                          <div className="relative w-[125px] h-[100px] overflow-hidden group">
                            <Image
                              src={image}
                              alt={article.alt || title}
                              fill
                              sizes="150px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>

                        <div className="flex-1 flex flex-col min-w-0">
                          <Link
                            href={`/investigation/${article.slug}`} // ← FIXED: singular
                            className="block group"
                            title={title}
                          >
                            <h3 className="text-lg font-bold text-black leading-snug break-words group-hover:text-[#d43939] transition-colors duration-300">
                              {title.length > 65 ? `${title.slice(0, 65)}...` : title}
                            </h3>
                          </Link>
                          <div className="mt-3 w-20 h-0.5 bg-gray-300" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 px-1">
            <Sidebar
              heroArticle={opinionArticles[0]}
              selectedArticles={opinionArticles.slice(1, 3)}
              smallArticles={opinionArticles.slice(4, 6)}
              categories={ALLOWED_CATEGORIES} // ← clean allowed list
              bannerImage="/images/mirrorstandard.webp"
              bannerHref="https://www.mirrorstandard.com/"
            />
          </div>
        </div>
      </div>
    </main>
  );
}