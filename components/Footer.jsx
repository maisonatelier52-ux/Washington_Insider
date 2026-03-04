// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { FaFacebook, FaTwitter, FaInstagram, FaVimeo } from "react-icons/fa";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const tags = [
//     "ANIMALS", "ART", "DECORATION", "FASHION", "FOOD",
//     "HAIR", "LIFE", "MEDIA", "PLACES", "TRAVEL", "WOMAN",
//   ];

//   const footerLinks = [
//     { label: "ABOUT", href: "/about" },
//     { label: "CONTACT", href: "/contact" },
//     { label: "TERMS OF USE", href: "/terms" },
//   ];

//   const socialLinks = [
//     { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", aria: "Follow us on Facebook" },
//     { icon: FaTwitter,    href: "https://twitter.com",    label: "Twitter",    aria: "Follow us on Twitter" },
//     { icon: FaInstagram,  href: "https://instagram.com",  label: "Instagram",  aria: "Follow us on Instagram" },
//     { icon: FaVimeo,      href: "https://vimeo.com",      label: "Vimeo",      aria: "Follow us on Vimeo" },
//   ];

//   const recentArticle = {
//     title: "6 Places That Outshine With Experimental Styles in Amsterdam",
//     date: "February 10, 2026",
//     comments: 3,
//     image: "/images/demo.webp",
//     href: "/article/amsterdam",
//   };

//   // Optional: You can move this to a global schema file or layout if preferred
//   const footerSchema = {
//     "@context": "https://schema.org",
//     "@type": "WebSite",
//     name: "Shadow Ledger",
//     url: "https://shadowledger.com",
//     potentialAction: {
//       "@type": "SubscribeAction",
//       target: "https://shadowledger.com/newsletter",
//     },
//   };

//   return (
//     <footer className="w-full bg-[#162238] text-white">
//       {/* Schema (optional – can be in layout.tsx instead) */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(footerSchema) }}
//         suppressHydrationWarning
//       />

//       {/* Main Content */}
//       <div className="px-5 pt-10 md:px-[8%] lg:px-[3%] xl:max-w-7xl xl:mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-12">
//           {/* Magazine Info */}
//           <div>
//             <h2 className="text-2xl lg:text-3xl font-bold mb-5 pb-4 border-l-4 border-[#d43939] pl-4">
//               Shadow Ledger
//             </h2>
//             <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
//               <p>
//                 <span className="mr-2">★</span>
//                 Consectetur adipiscing elit, sed diam nonumy eirmod tempor indidunt ut labore et dolore magna aliquyam erat...
//               </p>
//               <p>
//                 <span className="mr-2">★</span>
//                 At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren...
//               </p>
//             </div>
//           </div>

//           {/* Featured Article */}
//           <div className="relative  overflow-hidden shadow-xl group">
//             <Image
//             src={recentArticle.image}
//             alt={recentArticle.title}
//             width={400}
//             height={300}
//             className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
//             sizes="(max-width: 768px) 100vw, 33vw"  // optional but recommended for responsive layouts
//             loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//             <div className="absolute bottom-0 left-0 right-0 p-5">
//               <div className="bg-[#d43939]/50 backdrop-blur-sm p-4 ">
//                 <p className="text-xs text-white font-bold mb-1">{recentArticle.date}</p>
//                 <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
//                   {recentArticle.title}
//                 </h3>
//                 <p className="text-xs text-gray-100">
//                   💬 {recentArticle.comments} Comments
//                 </p>
//               </div>
//             </div>
//             <Link
//               href={recentArticle.href}
//               className="absolute inset-0"
//               aria-label={`Read article: ${recentArticle.title}`}
//             />
//           </div>

//           {/* Popular Tags */}
//           <div>
//             <h3 className="text-2xl lg:text-3xl font-bold mb-5 pb-4 border-l-4 border-[#d43939] pl-4">
//               Popular Tags
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//               {tags.map((tag) => (
//                 <Link
//                   key={tag}
//                   href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
//                   className="px-4 py-2.5 border-3 border-white/100 text-white font-bold text-xs 
//                              hover:bg-white hover:text-[#d43939] hover:border-[#d43939] 
//                              transition-all duration-300"
//                 >
//                   {tag}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Newsletter */}
//       <div className="bg-[#d43939] px-6 py-12 md:px-12 md:py-10 ">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
//               Subscribe to Our Newsletter
//             </h2>
//             <p className="text-white/200 text-lg mb-8">
//               No worries, we don't like spam either.
//             </p>

//             <form
//               className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
//               onSubmit={(e) => e.preventDefault()}
//             >
//               <input
//                 type="email"
//                 placeholder="Your e-mail address"
//                 className="flex-1 px-5 py-4 bg-transparent border-2 border-white/60 
//                            text-white placeholder-white/100 rounded-lg outline-none 
//                            focus:border-white focus:bg-white/10 transition-all"
//                 required
//                 aria-required="true"
//               />
//               <button
//                 type="submit"
//                 className="px-10 py-4 bg-[#162238] border-2 border-black-500 text-white font-bold rounded-lg 
//                            hover:bg-white hover:text-[#162238] transition-all duration-300
//                            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#d43939]"
//               >
//                 SUBSCRIBE
//               </button>
//             </form>
//           </div>
//         </div>

//       {/* Bottom Bar */}
//       <div className="bg-gray-100 text-gray-700 px-5 py-5 md:px-[8%] lg:px-[10%]">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
//           <p>© {currentYear} SHADOW LEDGER. ALL RIGHTS RESERVED.</p>

//           <div className="flex items-center gap-6">
//             {socialLinks.map((social) => {
//               const Icon = social.icon;
//               return (
//                 <Link
//                   key={social.label}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-600 hover:text-[#d43939] transition-colors text-xl p-2 rounded-full hover:bg-gray-200"
//                   aria-label={social.aria}
//                   title={social.label}
//                 >
//                   <Icon />
//                 </Link>
//               );
//             })}
//           </div>

//           <div className="flex flex-wrap justify-center gap-5 md:gap-7">
//             {footerLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 href={link.href}
//                 className="hover:text-[#d43939] transition-colors font-medium"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaVimeo } from "react-icons/fa";
import { useState, useEffect } from "react";

// API endpoints
const NEWS_API = "https://my-api-usa.com/p16/API/api/news";
const CATEGORIES_API = "https://my-api-usa.com/p16/API/api/categories";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
    { label: "TERMS OF USE", href: "/terms" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaVimeo, href: "https://vimeo.com", label: "Vimeo" },
  ];

  // Featured article from API
  const [featuredArticle, setFeaturedArticle] = useState(null);
  // Real categories from API
  const [popularCategories, setPopularCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        setLoading(true);

        // Fetch latest news
        const newsRes = await fetch(NEWS_API);
        if (!newsRes.ok) throw new Error("News API failed");
        const newsData = await newsRes.json();

        if (newsData.length > 0) {
          const latest = newsData.sort((a, b) => new Date(b.news_date) - new Date(a.news_date))[0];

          setFeaturedArticle({
            title: latest.title || latest.news_title || "Untitled",
            date: latest.news_date || "Recent",
            comments: latest.comments_count || 0,
            image: latest.photo_url || "/images/demo.webp",
            href: `/${latest.category?.category_name?.toLowerCase().replace(/\s+/g, "-") || "news"}/${latest.encode_title || "#"}`,
          });
        }

        // Fetch real categories
        const catRes = await fetch(CATEGORIES_API);
        if (!catRes.ok) throw new Error("Categories API failed");
        const catData = await catRes.json();

        const categories = catData.map(cat => cat.category_name);

        setPopularCategories(categories);
      } catch (err) {
        console.error("Footer fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFooterData();
  }, []);

  // Schema
  const footerSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shadow Ledger",
    url: "https://shadowledger.com",
    potentialAction: {
      "@type": "SubscribeAction",
      target: "https://shadowledger.com/newsletter",
    },
  };

  return (
    <footer className="w-full bg-[#162238] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(footerSchema) }}
        suppressHydrationWarning
      />

      {/* Main Content */}
      <div className="px-5 pt-10 md:px-[8%] lg:px-[3%] xl:max-w-7xl xl:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-12">
          {/* Magazine Info */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-5 pb-4 border-l-4 border-[#d43939] pl-4">
              Shadow Ledger
            </h2>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                <span className="mr-2">★</span>
                Consectetur adipiscing elit, sed diam nonumy eirmod tempor indidunt ut labore et dolore magna aliquyam erat...
              </p>
              <p>
                <span className="mr-2">★</span>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren...
              </p>
            </div>
          </div>

          {/* Featured Article – real latest news */}
          <div className="relative overflow-hidden shadow-xl group">
            {loading ? (
              <div className="w-full h-64 md:h-72 bg-gray-800 flex items-center justify-center text-white">
                Loading featured article...
              </div>
            ) : featuredArticle ? (
              <>
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  width={400}
                  height={300}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="bg-[#d43939]/50 backdrop-blur-sm p-4">
                    <p className="text-xs text-white font-bold mb-1">{featuredArticle.date}</p>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-xs text-gray-100">
                      💬 {featuredArticle.comments} Comments
                    </p>
                  </div>
                </div>
                <Link
                  href={featuredArticle.href}
                  className="absolute inset-0"
                  aria-label={`Read article: ${featuredArticle.title}`}
                />
              </>
            ) : (
              <div className="w-full h-64 md:h-72 bg-gray-800 flex items-center justify-center text-white">
                No featured article available
              </div>
            )}
          </div>

          {/* Popular Tags – real categories from API */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-5 pb-4 border-l-4 border-[#d43939] pl-4">
              Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {popularCategories.length > 0 ? (
                popularCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-4 py-2.5 border-3 border-white/100 text-white font-bold text-xs 
                               hover:bg-white hover:text-[#d43939] hover:border-[#d43939] 
                               transition-all duration-300"
                  >
                    {cat}
                  </Link>
                ))
              ) : (
                <p className="text-gray-300 text-sm col-span-full text-center">
                  Loading categories...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#d43939] px-6 py-12 md:px-12 md:py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 text-lg mb-8">
            No worries, we don't like spam either.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your e-mail address"
              className="flex-1 px-5 py-4 bg-transparent border-2 border-white/60 text-white placeholder-white/80 rounded-lg outline-none focus:border-white focus:bg-white/10 transition-all"
              required
              aria-required="true"
            />
            <button
              type="submit"
              className="px-10 py-4 bg-[#162238] border-2 border-black-500 text-white font-bold rounded-lg hover:bg-white hover:text-[#162238] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#d43939]"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 text-gray-700 px-5 py-5 md:px-[8%] lg:px-[10%]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p>© {currentYear} SHADOW LEDGER. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#d43939] transition-colors text-xl p-2 rounded-full hover:bg-gray-200"
                  aria-label={social.aria}
                  title={social.label}
                >
                  <Icon />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-5 md:gap-7">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#d43939] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;