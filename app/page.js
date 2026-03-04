import Image from "next/image";
import Link from "next/link";
import LatestNews from "../components/LatestNews";
import PoliticsNews from "../components/PoliticsNews";
import ArticleCard from "../components/OneNews";
import Fournews from "../components/FourNews";
import Fourcard from "../components/Fourcard";
import Sidebar from "../components/Sidebar";
import TrendingFeatured from "../components/TrendingFeatured";

// API
const API_URL = "https://my-api-usa.com/p16/API/api/news";
const IMAGE_URL = "https://my-api-usa.com/p16/API/api/news-images";

async function getNews() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("API fetch failed");
    return await res.json();
  } catch (error) {
    console.error("News API error:", error);
    return []; // return empty array on failure
  }
}

// Static dummy author (used for EVERY news item)
const dummyAuthor = {
  name: "News Desk",
  profileImage: "/images/default-author.webp",
  country: "USA",
  slug: "news-desk",
};

export default async function Home() {
  const news = await getNews();

  // Convert API response to categoryPageData structure
  const categoryPageData = news.reduce((acc, item) => {
    const categoryName = item.category?.category_name
      ?.toLowerCase()
      .replace(/\s+/g, "-");

    if (!categoryName) return acc;

    if (!acc[categoryName]) acc[categoryName] = [];

    acc[categoryName].push({
      slug: item.encode_title || "#",
      heading: item.title || item.news_title || "Untitled",
      metaTitle: item.meta_title || "",

      image: item.photo_url || "/images/placeholder.webp",
      heroImage: item.photo ? `${IMAGE_URL}/${item.photo}` : "/images/placeholder.webp",
      alt: item.img_alt || "News image",

      date: item.news_date || new Date().toISOString().split("T")[0],

      excerpt: item.news_content_short || item.excerpt || "",
      metaDescription: item.meta_description || "",

      category: categoryName,
    });

    return acc;
  }, {});

  // Flatten all articles + attach category & dummy author
  const allArticles = Object.entries(categoryPageData).flatMap(
    ([category, articles]) =>
      articles.map((article) => ({
        ...article,
        category,
        author: dummyAuthor, // dummy for all
      }))
  );

  // 4 latest from ALL categories
  const latestArticles = allArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const latestNewsItems = latestArticles.map((article, index) => ({
    id: article.id || index,
    image: article.image,
    alt: article.alt || article.heading,
    heading: article.heading || article.metaTitle,
    slug: article.slug,
    category: article.category,
    date: article.date,
    author: dummyAuthor,
  }));

  // Other sections (with dummy author attached where needed)
  const politicsArticles = (categoryPageData["politics"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2)
    .map(a => ({ ...a, author: dummyAuthor }));

  const trendingArticles = (categoryPageData["business"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(a => ({ ...a, author: dummyAuthor }));

  const featuredArticles = (categoryPageData["technology"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(a => ({ ...a, author: dummyAuthor }));

  const UsnewsArticles = (categoryPageData["world"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(a => ({ ...a, author: dummyAuthor }));

  const lawandjusticeArticles = (categoryPageData["finance"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(a => ({ ...a, author: dummyAuthor }));

  const civilRightsArticles = (categoryPageData["lifestyle"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(a => ({ ...a, author: dummyAuthor }));

  const investigationArticles = (categoryPageData["investigation"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(a => ({ ...a, author: dummyAuthor }));

  const opinionArticles = (categoryPageData["opinion"] || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
    .map(a => ({ ...a, author: dummyAuthor }));

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
                <Link
                  href="https://www.progresskingdom.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

            <Fournews
              lawandjusticeArticles={lawandjusticeArticles}
              category="finance"
            />

            <Fourcard
              civilRightsArticles={civilRightsArticles}
              category="lifestyle"
            />

            <section className="w-full py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {investigationArticles.map((article) => {
                  const title = article.heading || article.metaTitle || "Untitled";
                  const image = article.image || article.heroImage || "/images/placeholder.webp";

                  return (
                    <div key={article.slug} className="flex flex-col">
                      <div className="flex gap-4">
                        <Link
                          href={`/investigation/${article.slug}`}
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
                            href={`/investigation/${article.slug}`}
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
              categories={[
                "business",
                "world",
                "finance",
                "technology",
                "politics",
                "lifestyle",
                "opinion",
                "investigation",
              ]}
              bannerImage="/images/demo.webp"
              bannerText="Don't Miss 30% Sale"
              bannerHref="/"
            />
          </div>
        </div>
      </div>
    </main>
  );
}