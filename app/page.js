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
  const res = await fetch(API_URL, { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const news = await getNews();

  // ─────────────────────────────────────────────
  // Convert API → categoryPageData structure
  // IMPORTANT: excerpt mapping added
  // ─────────────────────────────────────────────
  const categoryPageData = news.reduce((acc, item) => {
    const categoryName = item.category?.category_name
      ?.toLowerCase()
      .replace(/\s+/g, "-");

    if (!categoryName) return acc;

    if (!acc[categoryName]) acc[categoryName] = [];

    acc[categoryName].push({
      slug: item.encode_title,
      heading: item.title || item.news_title,
      metaTitle: item.meta_title,

      image: item.photo_url,
      heroImage: `${IMAGE_URL}/${item.photo}`,
      alt: item.img_alt,

      date: item.news_date,

      // ✅ DESCRIPTION FIX
      excerpt: item.news_content_short,
      metaDescription: item.meta_description,

      category: categoryName,
    });

    return acc;
  }, {});

  // ───────────────── Categories Mapping ─────────────────

  const politicsArticles = (categoryPageData["politics"] || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  const trendingArticles = (categoryPageData["business"] || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const featuredArticles = (categoryPageData["technology"] || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const UsnewsArticles = (categoryPageData["world"] || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // This goes to FourNews → now excerpt will show
  const lawandjusticeArticles = (categoryPageData["finance"] || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const civilRightsArticles = (categoryPageData["lifestyle"] || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const investigationArticles = (categoryPageData["investigation"] || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const allArticles = Object.entries(categoryPageData)
    .flatMap(([cat, posts]) => posts.map((p) => ({ ...p, category: cat })))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-3">

            <LatestNews />

            <PoliticsNews politicsArticles={politicsArticles} />

            <TrendingFeatured
              trendingArticles={trendingArticles}
              trendingCategory="business"
              featuredArticles={featuredArticles}
              featuredCategory="technology"
            />

            {/* Sponsored */}
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

            {/* World */}
            <ArticleCard article={UsnewsArticles[0]} category="world" />

            {/* Finance → FourNews (description now works) */}
            <Fournews
              lawandjusticeArticles={lawandjusticeArticles}
              category="finance"
            />

            {/* Lifestyle */}
            <Fourcard
              civilRightsArticles={civilRightsArticles}
              category="lifestyle"
            />

            {/* Investigation */}
            <section className="w-full py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {investigationArticles.map((article) => {
                  const title = article.heading || article.metaTitle;
                  const image = article.image || article.heroImage;

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
                              className="object-cover"
                            />
                          </div>
                        </Link>

                        <div className="flex-1 flex flex-col min-w-0">
                          <Link href={`/investigation/${article.slug}`}>
                            <h3 className="text-lg font-bold text-black">
                              {title}
                            </h3>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 px-1">
            <Sidebar
              heroArticle={allArticles[0]}
              selectedArticles={allArticles.slice(1, 3)}
              smallArticles={allArticles.slice(4, 6)}
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