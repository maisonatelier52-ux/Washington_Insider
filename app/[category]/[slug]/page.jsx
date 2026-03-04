

// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import categoryPageData from "../../../public/data/category/categorypagedata.json";
// import authorsData from "../../../public/data/authors.json";
// import Sidebar from "../../../components/Sidebar";
// import { FaFacebookF } from "react-icons/fa6";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaPinterestP } from "react-icons/fa";
// import PrevNextArticles from "@/components/PrevNextArticles";
// import RelatedNews from "@/components/RelatedNews";

// const SITE_URL = "";

// export async function generateMetadata({ params }) {
//   const { category, slug } = await params;
//   const post = categoryPageData[category]?.find((item) => item.slug === slug);

//   if (!post) {
//     return {
//       title: "Article Not Found | CourtNews",
//       description: "The requested article could not be found.",
//       robots: "noindex",
//     };
//   }

//   const fullImageUrl = post.heroImage?.startsWith("http")
//     ? post.heroImage
//     : `${SITE_URL}${post.heroImage}`;
//   const canonicalUrl = `${SITE_URL}/${category}/${slug}`;

  

//   return {
//     title: post.metaTitle,
//     description: post.metaDescription,
//     keywords: post.keywords || [category.replace(/-/g, " ")],
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title: post.metaTitle,
//       description: post.metaDescription,
//       url: canonicalUrl,
//       type: "article",
//       siteName: "CourtNews",
//       images: [{ url: fullImageUrl, width: 1200, height: 630, alt: post.heading }],
//       publishedTime: new Date(post.date).toISOString(),
//       modifiedTime: new Date(post.modifiedDate || post.date).toISOString(),
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.metaTitle,
//       description: post.metaDescription,
//       images: [fullImageUrl],
//     },
//   };
// }

// export default async function ArticleDetailPage({ params }) {
//   const { category, slug } = await params;

//   const post = categoryPageData[category]?.find((item) => item.slug === slug);
//   if (!post) notFound();

//   const categoryAuthor = authorsData.categories.find(
//     (item) => item.category === category
//   );
//   const author = categoryAuthor?.author || {
//     name: "CourtNews Staff",
//     slug: "staff-reporter",
//     profileImage: "/images/default-author.webp",
//     bio: "",
//     jobtitle: "Staff Reporter",
//   };

//   const allArticles = Object.entries(categoryPageData)
//     .flatMap(([cat, posts]) => posts.map((p) => ({ ...p, category: cat })))
//     .sort((a, b) => new Date(b.date) - new Date(a.date));

//       // Find current article index in allArticles
//   const currentIndex = allArticles.findIndex(
//     (art) => art.category === category && art.slug === slug
//   );

//   // Prev / Next articles
//   let prevPost = null;
//   let nextPost = null;

//   if (currentIndex !== -1) {
//     // Previous = older article (next in array since newest first)
//     if (currentIndex + 1 < allArticles.length) {
//       prevPost = allArticles[currentIndex + 1];
//     }
//     // Next = newer article (previous in array)
//     if (currentIndex - 1 >= 0) {
//       nextPost = allArticles[currentIndex - 1];
//     }
//   }

//   // Related articles = same category, newest 3, exclude current
//   const relatedPosts = allArticles
//     .filter((art) => art.category === category && art.slug !== slug)
//     .slice(0, 3);

//   const fullImageUrl = post.heroImage?.startsWith("http")
//     ? post.heroImage
//     : `${SITE_URL}${post.heroImage}`;
//   const canonicalUrl = `${SITE_URL}/${category}/${slug}`;
//   const body = post.body;

//   const encodedUrl = encodeURIComponent(canonicalUrl);
//   const encodedTitle = encodeURIComponent(post.heading);

//   const tags = Array.isArray(post.tags)
//     ? post.tags
//     : typeof post.tags === "string"
//     ? post.tags.split(",").map((t) => t.trim())
//     : [];

//   const articleJsonLd = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     headline: post.metaTitle,
//     description: post.metaDescription,
//     image: [{ "@type": "ImageObject", url: fullImageUrl, width: 1200, height: 630 }],
//     datePublished: new Date(post.date).toISOString(),
//     dateModified: new Date(post.modifiedDate || post.date).toISOString(),
//     author: { "@type": "Person", name: author.name, url: `${SITE_URL}/authors/${author.slug}` },
//     publisher: {
//       "@type": "Organization",
//       name: "CourtNews",
//       url: SITE_URL,
//       logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
//     },
//     mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
//   };

//   const breadcrumbJsonLd = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
//       { "@type": "ListItem", position: 2, name: category.replace(/-/g, " "), item: `${SITE_URL}/${category}` },
//       { "@type": "ListItem", position: 3, name: post.heading, item: canonicalUrl },
//     ],
//   };

//   return (
//     <main className="min-h-screen bg-white">
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

//       <div className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

//           {/* ── LEFT: Article ── */}
//           <div className="lg:col-span-3">

//             {/* Hero Image */}
//             <div className="relative w-full h-[350px] sm:h-[480px] overflow-hidden mb-3">
//               <Image
//                 src={post.heroImage}
//                 alt={post.heading}
//                 fill
//                 priority
//                 sizes="(max-width: 768px) 100vw, 75vw"
//                 className="object-cover"
//               />
//             </div>

            

//               {/* Date · Category */}
//               <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
//                 <time dateTime={new Date(post.date).toISOString()}>
//                   {post.date}
//                 </time>
//                 <span>•</span>
//                 <Link
//                   href={`/${category}`}
//                   title={`View all ${category.replace(/-/g, " ")} articles`}
//                   className="uppercase font-semibold text-[#d43939] hover:underline tracking-wide"
//                 >
//                   {category.replace(/-/g, " ")}
//                 </Link>
//               </div>

//               {/* H1 Heading */}
//               <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-black mb-3">
//                 {post.heading}
//               </h1>

//               {/* Author byline */}
//               <div className="flex items-center border-l-4 border-[#d43939] pl-3 mb-4">
//                 <p className="text-md text-gray-600">
//                   by{" "}
//                   <Link
//                     href={`/authors/${author.slug}`}
//                     title={author.name}
//                     className="font-semibold text-black hover:text-[#d43939] transition-colors"
//                   >
//                     {author.name}
//                   </Link>
//                 </p>
//               </div>

//               {/* ── BODY ── */}
//               {body && (
//                 <div className="text-gray-800 text-base leading-relaxed">

//                   {/* Drop Cap */}
//                   {body.dropcap && (
//                     <p className="mb-4 text-base leading-7">
//                       {body.dropcap.letter}{body.dropcap.text}
//                     </p>
//                   )}

//                   {/* Top paragraphs */}
//                   {body.paragraphs?.map((paragraph, idx) => (
//                     <p key={idx} className="mb-4 text-base leading-7 text-gray-800">
//                       {paragraph}
//                     </p>
//                   ))}

//                   {/* Sections */}
//                   {body.sections?.map((section, sectionIdx) => {

//                     // H2
//                     if (section.type === "h2") {
//                       return (
//                         <h2 key={sectionIdx} className="text-2xl font-extrabold text-black mt-5 mb-2">
//                           {section.text}
//                         </h2>
//                       );
//                     }

//                     // H3
//                     if (section.type === "h3") {
//                       return (
//                         <h3 key={sectionIdx} className="text-xl font-bold text-black mt-4 mb-2">
//                           {section.text}
//                         </h3>
//                       );
//                     }

//                     // Paragraph
//                     if (section.type === "paragraph") {
//                       return (
//                         <p key={sectionIdx} className="mb-4 text-base leading-7 text-gray-800">
//                           {section.text}
//                         </p>
//                       );
//                     }

//                     // Dark highlight box
//                     if (section.type === "highlight") {
//                       return (
//                         <div key={sectionIdx} className="bg-[#162238] text-white px-6 py-4 my-6">
//                           <p className="text-base leading-7">{section.text}</p>
//                         </div>
//                       );
//                     }

//                     // Bullet list
//                     if (section.type === "bulletList") {
//                       return (
//                         <ul key={sectionIdx} className="list-disc list-inside mb-4 space-y-1 text-gray-800">
//                           {section.items?.map((item, i) => (
//                             <li key={i} className="text-base leading-7">{item}</li>
//                           ))}
//                         </ul>
//                       );
//                     }

//                     // Numbered list
//                     if (section.type === "numberedList") {
//                       return (
//                         <ol key={sectionIdx} className="list-decimal list-inside mb-4 space-y-1 text-gray-800">
//                           {section.items?.map((item, i) => (
//                             <li key={i} className="text-base leading-7">{item}</li>
//                           ))}
//                         </ol>
//                       );
//                     }

//                     // Pull quote
//                     if (section.type === "quote") {
//                       return (
//                         <blockquote key={sectionIdx} className="border-l-4 border-[#d43939] pl-6 my-8 text-xl font-semibold italic text-gray-700">
//                           <p className="mb-2">{section.text}</p>
//                           {section.author && (
//                             <cite className="text-sm font-normal not-italic text-gray-500">— {section.author}</cite>
//                           )}
//                         </blockquote>
//                       );
//                     }

                   

//                     // Full width section
//                     if (section.type === "fullWidth") {
//                       return (
//                         <div key={sectionIdx} className="mt-5">
//                           {section.title && (
//                             <h2 className="text-2xl font-extrabold text-black mt-8 mb-4">{section.title}</h2>
//                           )}
//                           {section.content?.map((text, idx) => (
//                             <p key={idx} className="mb-4 text-base leading-7 text-gray-800">{text}</p>
//                           ))}

//                           {section.subsections?.map((subsection, subIdx) => (
//                             <div key={subIdx} className="mt-5">
//                               {subsection.title && (
//                                 <h3 className="text-xl font-bold text-black mt-6 mb-3">{subsection.title}</h3>
//                               )}
//                               {subsection.text?.map((text, txtIdx) => (
//                                 <p key={txtIdx} className="mb-4 text-base leading-7 text-gray-800">{text}</p>
//                               ))}
//                               {subsection.checklist?.map((item, itemIdx) => (
//                                 <p key={itemIdx} className="text-sm font-semibold mb-2">
//                                   <span className="text-[#d43939]">✓</span> {item}
//                                 </p>
//                               ))}
//                               {subsection.additionalText?.map((text, addIdx) => (
//                                 <p key={`sub-add-${addIdx}`} className="mb-4 text-base leading-7 text-gray-800">{text}</p>
//                               ))}
//                             </div>
//                           ))}
//                         </div>
//                       );
//                     }

//                     // Final section
//                     if (section.type === "finalSection") {
//                       return (
//                         <div key={sectionIdx} className="mt-5">
//                           {section.title && (
//                             <h2 className="text-2xl font-extrabold text-black mt-8 mb-4">{section.title}</h2>
//                           )}
//                           {section.intro?.map((text, idx) => (
//                             <p key={idx} className="mb-4 text-base leading-7 text-gray-800">{text}</p>
//                           ))}
//                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                             <div>
//                               {section.twoColumnContent?.left?.map((text, idx) => (
//                                 <p key={idx} className="mb-4 text-base leading-7 text-gray-800">{text}</p>
//                               ))}
//                             </div>
//                             {section.twoColumnContent?.rightQuote && (
//                               <div className="flex items-center justify-center">
//                                 <blockquote className="text-center text-xl italic text-gray-800 font-semibold pl-4 border-l-4 border-[#d43939]">
//                                   {section.twoColumnContent.rightQuote.text}
//                                   <span className="block mt-2 text-sm text-gray-500">
//                                     — {section.twoColumnContent.rightQuote.author}
//                                   </span>
//                                 </blockquote>
//                               </div>
//                             )}
//                           </div>
//                           {section.conclusion?.map((text, idx) => (
//                             <p key={`conclusion-${idx}`} className="mb-4 mt-4 text-base leading-7 text-gray-800">{text}</p>
//                           ))}
//                         </div>
//                       );
//                     }

//                     return null;
//                   })}

//                 </div>
//               )}

//               {/* ── SHARE + TAGS ── */}
//               <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-300">
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm font-bold uppercase tracking-widest text-gray-600">Share</span>
//                   <Link
//                     href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
//                     target="_blank" rel="noopener noreferrer" title="Share on Facebook"
//                     className="text-gray-500 hover:text-blue-600 transition-colors"
//                   >
//                     <FaFacebookF size={18} />
//                   </Link>
//                   <Link
//                     href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
//                     target="_blank" rel="noopener noreferrer" title="Share on X"
//                     className="text-gray-500 hover:text-black transition-colors"
//                   >
//                     <FaXTwitter size={18} />
//                   </Link>
//                   <Link
//                     href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
//                     target="_blank" rel="noopener noreferrer" title="Share on Pinterest"
//                     className="text-gray-500 hover:text-red-600 transition-colors"
//                   >
//                     <FaPinterestP size={18} />
//                   </Link>
//                 </div>

//                 {tags.length > 0 && (
//                   <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
//                     {tags.map((tag) => (
//                       <span key={tag} className="hover:text-[#d43939] cursor-default">{tag}</span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* ── AUTHOR PROFILE ── */}
//               <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300 flex items-start gap-4">
//                 <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden ">
//                   <Image
//                     src={author.profileImage}
//                     alt={author.name}
//                     fill
//                     sizes="56px"
//                     className="object-cover"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div>
//                   <Link
//                     href={`/authors/${author.slug}`}
//                     title={author.name}
//                     className="text-lg font-extrabold text-gray-900 hover:text-[#d43939] transition-colors"
//                   >
//                     {author.name}
//                   </Link>
//                   {author.jobtitle && (
//                     <p className="text-xs text-[#d43939] font-semibold uppercase mt-0.5">
//                       {author.jobtitle}
//                     </p>
//                   )}
//                   {author.bio && (
//                     <p className="text-sm text-gray-600 mt-1 leading-relaxed">{author.bio}</p>
//                   )}
//                 </div>
                               
                
//               </div>
//                <PrevNextArticles prevPost={prevPost} nextPost={nextPost} />
//                 <RelatedNews currentCategory={category} relatedPosts={relatedPosts} />

            
//           </div>

//           {/* ── RIGHT: Sidebar ── */}
//           <div className="lg:col-span-1 px-1">
//             <Sidebar
//               heroArticle={allArticles[0]}
//               selectedArticles={allArticles.slice(1, 3)}
//               smallArticles={allArticles.slice(4, 6)}
//               categories={["crime", "courts", "political", "investigations", "us-news", "civil-rights", "law-and-justice"]}
//               bannerImage="/images/demo.webp"
//               bannerText="Don't Miss 30% Sale on Mom Jeans"
//               bannerHref="/"
//             />
//           </div>

//         </div>
//       </div>
//     </main>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DSidebar from "../../../components/DSidebar";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import PrevNextArticles from "@/components/PrevNextArticles";
import RelatedNews from "@/components/RelatedNews";

// ── API Config ───────────────────────────────────────────────────────────────
const NEWS_API  = "https://my-api-usa.com/p16/API/api/news";
const IMAGE_URL = "https://my-api-usa.com/p16/API/api/news-images";

const SITE_URL  = "";

// ── Fetch + Normalize ────────────────────────────────────────────────────────
async function getNews() {
  try {
    const res = await fetch(NEWS_API, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

/**
 * Converts a raw API item into the shape the page/sidebar expects.
 */
function normalizeItem(item) {
  const category = item.category?.category_name
    ?.toLowerCase()
    .replace(/\s+/g, "-") || "";

  return {
    slug:            item.encode_title,
    heading:         item.title || item.news_title,
    metaTitle:       item.meta_title,
    metaDescription: item.meta_description,
    metaKeyword:     item.meta_keyword,

    image: item.photo_url,
    heroImage: item.photo_url,
    alt:       item.img_alt || item.title || item.news_title,

    date:    item.news_date,
    excerpt: item.news_content_short,

    // Raw HTML content from API
    newsContent: item.news_content,

    category,
  };
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const news = await getNews();

  const post = news
    .map(normalizeItem)
    .find((p) => p.slug === slug && p.category === category);

  if (!post) {
    return { title: "Article Not Found | News", robots: "noindex" };
  }

  const canonicalUrl = `${SITE_URL}/${category}/${slug}`;

  return {
    title:       post.metaTitle,
    description: post.metaDescription,
    keywords:    post.metaKeyword,
    alternates:  { canonical: canonicalUrl },
    openGraph: {
      title:         post.metaTitle,
      description:   post.metaDescription,
      url:           canonicalUrl,
      type:          "article",
      siteName:      "News",
      images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.heading }],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.metaTitle,
      description: post.metaDescription,
      images:      [post.heroImage],
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ArticleDetailPage({ params }) {
  const { category, slug } = await params;

  const rawNews    = await getNews();
  const normalized = rawNews.map(normalizeItem);

  // ── Find current article ────────────────────────────────────────────────
  const post = normalized.find((p) => p.slug === slug && p.category === category);
  if (!post) notFound();

  // ── All articles sorted newest first ───────────────────────────────────
  const allArticles = [...normalized].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ── Prev / Next ─────────────────────────────────────────────────────────
  const currentIndex = allArticles.findIndex(
    (a) => a.slug === slug && a.category === category
  );

  const prevPost = currentIndex + 1 < allArticles.length
    ? allArticles[currentIndex + 1]
    : null;

  const nextPost = currentIndex - 1 >= 0
    ? allArticles[currentIndex - 1]
    : null;

  // ── Related (same category, exclude current, top 3) ────────────────────
  const relatedPosts = allArticles
    .filter((a) => a.category === category && a.slug !== slug)
    .slice(0, 3);

  // ── Sidebar categories list ─────────────────────────────────────────────
  const sidebarCategories = [
    "business", "world", "finance", "technology",
    "politics", "lifestyle", "opinion", "investigation",
  ];

  // ── JSON-LD ─────────────────────────────────────────────────────────────
  const canonicalUrl  = `${SITE_URL}/${category}/${slug}`;
  const encodedUrl    = encodeURIComponent(canonicalUrl);
  const encodedTitle  = encodeURIComponent(post.heading);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type":    "NewsArticle",
    headline:   post.metaTitle,
    description: post.metaDescription,
    image: [{ "@type": "ImageObject", url: post.heroImage, width: 1200, height: 630 }],
    datePublished: new Date(post.date).toISOString(),
    dateModified:  new Date(post.date).toISOString(),
    publisher: {
      "@type": "Organization",
      name:    "News",
      url:     SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",                            item: SITE_URL },
      { "@type": "ListItem", position: 2, name: category.replace(/-/g, " "),       item: `${SITE_URL}/${category}` },
      { "@type": "ListItem", position: 3, name: post.heading,                      item: canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-full mx-auto px-4 md:px-[10%] py-8 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* ── LEFT: Article ── */}
          <div className="lg:col-span-3">

            {/* Hero Image */}
            <div className="relative w-full h-[350px] sm:h-[480px] overflow-hidden mb-3">
              <Image
                src={post.heroImage}
                alt={post.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
                className="object-cover"
              />
            </div>

            {/* Date · Category */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <Link
                href={`/${category}`}
                title={`View all ${category.replace(/-/g, " ")} articles`}
                className="uppercase font-semibold text-[#d43939] hover:underline tracking-wide"
              >
                {category.replace(/-/g, " ")}
              </Link>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-black mb-3">
              {post.heading}
            </h1>

            {/* ── BODY: API HTML Content ── */}
            {post.newsContent && (
              <div
                className="
                  prose prose-base max-w-none text-gray-800
                  prose-headings:font-extrabold prose-headings:text-black
                  prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-2
                  prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2
                  prose-p:leading-7 prose-p:mb-4
                  prose-ul:list-disc prose-ul:list-inside prose-ul:mb-4
                  prose-ol:list-decimal prose-ol:list-inside prose-ol:mb-4
                  prose-li:text-base prose-li:leading-7
                  prose-a:text-[#d43939] prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-[#d43939]
                  prose-blockquote:pl-6 prose-blockquote:italic
                  prose-strong:font-bold
                "
                dangerouslySetInnerHTML={{ __html: post.newsContent }}
              />
            )}

            {/* ── SHARE ── */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-300">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-600">Share</span>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank" rel="noopener noreferrer" title="Share on Facebook"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <FaFacebookF size={18} />
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank" rel="noopener noreferrer" title="Share on X"
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <FaXTwitter size={18} />
                </Link>
                <Link
                  href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
                  target="_blank" rel="noopener noreferrer" title="Share on Pinterest"
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <FaPinterestP size={18} />
                </Link>
              </div>
            </div>

            {/* ── PREV / NEXT ── */}
            <PrevNextArticles prevPost={prevPost} nextPost={nextPost} />

            {/* ── RELATED NEWS ── */}
            <RelatedNews currentCategory={category} relatedPosts={relatedPosts} />

          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="lg:col-span-1 px-1">
            <DSidebar
              heroArticle={allArticles[0]}
              selectedArticles={allArticles.slice(1, 3)}
              smallArticles={allArticles.slice(4, 6)}
              categories={sidebarCategories}
              bannerImage="/images/demo.webp"
              bannerText="Don't Miss 30% Sale on Mom Jeans"
              bannerHref="/"
            />
          </div>

        </div>
      </div>
    </main>
  );
}