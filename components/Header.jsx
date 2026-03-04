// "use client";

// import { useState, useCallback, useMemo, useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   FaBars,
//   FaTimes,
//   FaSearch,
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaVimeo,
// } from "react-icons/fa";



// // ── Helpers ──────────────────────────────────────────────────────────────────
// function flattenArticles(data) {
//   const articles = [];
//   if (data && typeof data === "object" && data["breaking"]) {
//     const items = data["breaking"];
//     if (Array.isArray(items)) {
//       items.forEach((item) => articles.push({ ...item, category: "breaking" }));
//     }
//   }
//   return articles;
// }

// // ── Breaking News Ticker ─────────────────────────────────────────────────────
// function BreakingNewsTicker({ articles }) {
//   const ticker = useMemo(() => {
//     const slice = articles.slice(0, 8);
//     return [...slice, ...slice];
//   }, [articles]);

//   if (ticker.length === 0) return null;

//   return (
//     <div
//       className="bg-[#162238] text-white"
//       role="complementary"
//       aria-label="Breaking news ticker"
//     >
//       <div className="max-w-full mx-auto px-4 md:px-[5%] py-2 flex items-center gap-0 overflow-hidden">
//         <div
//           className="flex items-center gap-1.5 shrink-0 bg-[#d43939] text-white text-[11px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 mr-3 select-none z-10"
//           aria-hidden="true"
//         >
//           <span className="inline-block w-2 h-2 rounded-full bg-white blink-dot" />
//           Breaking News
//         </div>

//         <div className="overflow-hidden flex-1 min-w-0" aria-hidden="true">
//           <div className="marquee-track">
//             {ticker.map((article, i) => (
//               <span
//                 key={`${article.slug}-${i}`}
//                 className="inline-flex items-center whitespace-nowrap"
//               >
//                 <Link
//                   href={`/${article.category}/${article.slug}`}
//                   className="text-white hover:text-[#d43939] transition-colors duration-200 text-xs md:text-sm px-3 md:px-4"
//                   tabIndex={-1}
//                 >
//                   {article.heading || article.metaTitle || article.title || "Untitled"}
//                 </Link>
//                 <span className="text-gray-300 select-none px-1">|</span>
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <nav aria-label="Breaking news links" className="sr-only">
//         <ul>
//           {articles.slice(0, 8).map((article) => (
//             <li key={article.slug}>
//               <Link href={`/${article.category}/${article.slug}`}>
//                 {article.heading || article.metaTitle || article.title || "Untitled"}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// // ── Search Input with Live Dropdown ──────────────────────────────────────────
// function SearchInput({ className = "", onResultClick }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const wrapperRef = useRef(null);

//   const allSearchItems = useMemo(
//     () =>
//       Object.entries(categoryPageData).flatMap(([category, posts]) =>
//         posts.map((post) => ({
//           heading: post.heading,
//           slug: post.slug,
//           category,
//           date: post.date,
//         }))
//       ),
//     []
//   );

//   function handleInput(e) {
//     const val = e.target.value;
//     setQuery(val);
//     if (val.trim().length < 2) { setResults([]); return; }
//     setResults(
//       allSearchItems
//         .filter((item) => item.heading?.toLowerCase().includes(val.toLowerCase()))
//         .slice(0, 6)
//     );
//   }

//   function clear() {
//     setQuery("");
//     setResults([]);
//     onResultClick?.();
//   }

//   useEffect(() => {
//     function handleClick(e) {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setResults([]);
//       }
//     }
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   return (
//     <div ref={wrapperRef} className={`relative ${className}`}>
//       <div className="flex items-center bg-white rounded-md px-3 py-2">
//         <FaSearch className="text-gray-500 mr-2 shrink-0" />
//         <input
//           type="text"
//           placeholder="Type keyword to search"
//           value={query}
//           onChange={handleInput}
//           className="flex-1 outline-none text-gray-800 text-sm bg-white"
//           aria-label="Search"
//           autoFocus
//         />
//       </div>

//       {results.length > 0 && (
//         <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[300px]">
//           {results.map((item, index) => (
//             <Link
//               key={`${item.category}-${item.slug}-${index}`}
//               href={`/${item.category}/${item.slug}`}
//               className="block px-4 py-3 text-sm hover:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-colors"
//               onClick={clear}
//             >
//               <div className="font-semibold text-gray-800 line-clamp-2">{item.heading}</div>
//               <div className="text-xs text-gray-500 mt-1 capitalize">
//                 {item.category.replace(/-/g, " ")} · {item.date}
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main Header ──────────────────────────────────────────────────────────────
// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);

//   const toggleMenu = useCallback(() => setIsMenuOpen((p) => !p), []);
//   const toggleSearch = useCallback(() => setSearchOpen((p) => !p), []);
//   const closeMenu = useCallback(() => setIsMenuOpen(false), []);

//   const allArticles = useMemo(() => flattenArticles(categoryPageData), []);

//   // ── Nav items from JSON categories ───────────────────────────────────────
//   const navItems = [
//     { label: "HOME",          href: "/" },
//     { label: "BUSINESS",      href: "/business" },
//     { label: "WORLD",         href: "/world" },
//     { label: "FINANCE",       href: "/finance" },
//     { label: "TECHNOLOGY",    href: "/technology" },
//     { label: "POLITICS",      href: "/politics" },
//     { label: "LIFESTYLE",     href: "/lifestyle" },
//     { label: "OPINION",       href: "/opinion" },
//     { label: "INVESTIGATION", href: "/investigation" },
//   ];

//   const socialLinks = [
//     { icon: FaFacebook,  href: "https://facebook.com",  label: "Facebook" },
//     { icon: FaTwitter,   href: "https://twitter.com",   label: "Twitter" },
//     { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
//     { icon: FaVimeo,     href: "https://vimeo.com",     label: "Vimeo" },
//   ];

//   return (
//     <header className="w-full">
//       {/* Top bar: date + social (desktop only) */}
//       <div className="hidden md:block bg-[#162238] text-white">
//         <div className="max-w-full mx-auto px-4 md:px-[5%] py-2">
//           <div className="flex items-center justify-between">
//             <div className="text-sm font-medium">
//               {new Date()
//                 .toLocaleDateString("en-US", {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })
//                 .replace(/,/g, ", ")}
//             </div>
//             <div className="flex items-center gap-6">
//               {socialLinks.map((social) => (
//                 <Link
//                   key={social.label}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white hover:text-gray-200 transition-colors text-lg"
//                   aria-label={social.label}
//                   title={social.label}
//                 >
//                   <social.icon />
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main red header */}
//       <div className="bg-[#d43939] text-white">
//         <div className="max-w-full mx-auto px-4 md:px-[5%] py-4 md:py-5">

//           {/* Mobile */}
//           <div className="flex items-center justify-between md:hidden">
//             <Link href="/" className="text-2xl font-bold">
//               Shadow Ledger
//             </Link>
//             <button
//               onClick={toggleMenu}
//               className="text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
//               aria-label="Toggle menu"
//               aria-expanded={isMenuOpen}
//             >
//               {isMenuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>

//           {/* Desktop */}
//           <div className="hidden md:flex items-center justify-between">
//             <Link href="/" className="text-3xl font-bold mr-8">
//               Shadow Ledger
//             </Link>
//             <nav className="flex items-center gap-5 flex-1 flex-wrap">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.label}
//                   href={item.href}
//                   className="font-semibold hover:text-gray-200 transition-colors text-lg"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//             {/* Desktop search icon */}
//             {/* <button
//               onClick={toggleSearch}
//               className="text-white hover:text-gray-200 transition-colors text-lg ml-4 shrink-0"
//               aria-label="Toggle search"
//             >
//               <FaSearch />
//             </button> */}
//           </div>
//         </div>

//         {/* Mobile expandable menu */}
//         {isMenuOpen && (
//           <nav
//             className="md:hidden bg-[#d43939] border-t border-red-600 px-4 py-4 animate-slideDown"
//             aria-label="Mobile navigation"
//           >
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="block py-3 text-white font-semibold text-base flex items-center justify-between hover:text-gray-200 transition-colors"
//                 onClick={closeMenu}
//               >
//                 {item.label}
//                 <span className="text-sm">›</span>
//               </Link>
//             ))}

//             <div className="flex gap-4 py-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white hover:text-gray-200 transition-colors text-lg"
//                   aria-label={social.label}
//                 >
//                   <social.icon />
//                 </a>
//               ))}
//             </div>

//             {/* Mobile search with live results */}
//             <div className="py-4">
//               <SearchInput onResultClick={closeMenu} />
//             </div>
//           </nav>
//         )}

//         {/* Desktop expandable search with live results */}
//         {searchOpen && (
//           <div className="hidden md:block bg-[#d43939] border-t border-red-600 px-4 md:px-[10%] py-4 animate-slideDown">
//             <div className="max-w-md ml-auto">
//               <SearchInput onResultClick={() => setSearchOpen(false)} />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Breaking News Ticker */}
//       <BreakingNewsTicker articles={allArticles} />

//       {/* Global styles */}
//       <style jsx global>{`
//         @keyframes marquee {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .marquee-track {
//           display: inline-flex;
//           align-items: center;
//           white-space: nowrap;
//           will-change: transform;
//           animation: marquee 20s linear infinite;
//         }
//         .marquee-track:hover { animation-play-state: paused; }
//         @media (prefers-reduced-motion: reduce) {
//           .marquee-track { animation: none; overflow: hidden; }
//         }
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0; }
//         }
//         .blink-dot { animation: blink 1.2s ease-in-out infinite; }
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slideDown { animation: slideDown 0.3s ease-out; }
//       `}</style>
//     </header>
//   );
// }


"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaVimeo,
} from "react-icons/fa";

// API
const API_URL = "https://my-api-usa.com/p16/API/api/news";

// ── Breaking News Ticker ─────────────────────────────────────────────────────
function BreakingNewsTicker({ articles }) {
  const ticker = useMemo(() => {
    const slice = articles.slice(0, 4);
    return [...slice, ...slice];
  }, [articles]);

  if (ticker.length === 0) return null;

  return (
    <div
      className="bg-[#162238] text-white"
      role="complementary"
      aria-label="Breaking news ticker"
    >
      <div className="max-w-full mx-auto px-4 md:px-[5%] py-2 flex items-center gap-0 overflow-hidden">
        <div
          className="flex items-center gap-1.5 shrink-0 bg-[#d43939] text-white text-[11px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 mr-3 select-none z-10"
          aria-hidden="true"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-white blink-dot" />
          Breaking News
        </div>

        <div className="overflow-hidden flex-1 min-w-0" aria-hidden="true">
          <div className="marquee-track">
            {ticker.map((article, i) => (
              <span
                key={`${article.slug}-${i}`}
                className="inline-flex items-center whitespace-nowrap"
              >
                <Link
                  href={`/${article.category}/${article.slug}`}
                  className="text-white hover:text-[#d43939] transition-colors duration-200 text-xs md:text-sm px-3 md:px-4"
                  tabIndex={-1}
                >
                  {article.heading || article.metaTitle || article.title || "Untitled"}
                </Link>
                <span className="text-gray-300 select-none px-1">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <nav aria-label="Breaking news links" className="sr-only">
        <ul>
          {articles.slice(0, 8).map((article) => (
            <li key={article.slug}>
              <Link href={`/${article.category}/${article.slug}`}>
                {article.heading || article.metaTitle || article.title || "Untitled"}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ── Search Input with Live Dropdown from API ──────────────────────────────────
function SearchInput({ className = "", onResultClick }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Fetch all news once on mount for search
  useEffect(() => {
    async function fetchAllNews() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Search API failed");
        const data = await res.json();

        // Map to search-friendly format
        const searchItems = data.map(item => ({
          heading: item.title || item.news_title || "Untitled",
          slug: item.encode_title || "#",
          category: item.category?.category_name
            ?.toLowerCase()
            .replace(/\s+/g, "-") || "news",
          date: item.news_date || "",
        }));

        // Cache in memory
        window.allSearchItems = searchItems;
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (!window.allSearchItems) fetchAllNews();
  }, []);

  function handleInput(e) {
    const val = e.target.value.trim();
    setQuery(val);

    if (val.length < 2) {
      setResults([]);
      return;
    }

    const filtered = (window.allSearchItems || [])
      .filter(item => item.heading?.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 6);

    setResults(filtered);
  }

  function clear() {
    setQuery("");
    setResults([]);
    onResultClick?.();
  }

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="flex items-center bg-white rounded-md px-3 py-2">
        <FaSearch className="text-gray-500 mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Type keyword to search"
          value={query}
          onChange={handleInput}
          className="flex-1 outline-none text-gray-800 text-sm bg-white"
          aria-label="Search"
          autoFocus
        />
      </div>

      {loading && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-center text-sm text-gray-500">
          Loading...
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[300px] max-h-80 overflow-y-auto">
          {results.map((item, index) => (
            <Link
              key={`${item.category}-${item.slug}-${index}`}
              href={`/${item.category}/${item.slug}`}
              className="block px-4 py-3 text-sm hover:bg-gray-100 border-b border-gray-100 last:border-b-0 transition-colors"
              onClick={clear}
            >
              <div className="font-semibold text-gray-800 line-clamp-2">{item.heading}</div>
              <div className="text-xs text-gray-500 mt-1 capitalize">
                {item.category.replace(/-/g, " ")} · {item.date || "Recent"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Header ──────────────────────────────────────────────────────────────
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [breakingArticles, setBreakingArticles] = useState([]);

  const toggleMenu = useCallback(() => setIsMenuOpen((p) => !p), []);
  const toggleSearch = useCallback(() => setSearchOpen((p) => !p), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Fetch breaking/latest news for ticker
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("News API failed");
        const data = await res.json();

        // Take top 8 newest articles for breaking ticker
        const latest = data
          .sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
          .slice(0, 8)
          .map(item => ({
            slug: item.encode_title || "#",
            heading: item.title || item.news_title || "Untitled",
            category: item.category?.category_name
              ?.toLowerCase()
              .replace(/\s+/g, "-") || "news",
          }));

        setBreakingArticles(latest);
      } catch (err) {
        console.error("Breaking news fetch error:", err);
      }
    }

    fetchNews();
  }, []);

  const navItems = [
    { label: "HOME",          href: "/" },
    { label: "BUSINESS",      href: "/business" },
    { label: "WORLD",         href: "/world" },
    { label: "FINANCE",       href: "/finance" },
    { label: "TECHNOLOGY",    href: "/technology" },
    { label: "POLITICS",      href: "/politics" },
    { label: "LIFESTYLE",     href: "/lifestyle" },
    { label: "OPINION",       href: "/opinion" },
    { label: "INVESTIGATION", href: "/investigation" },
  ];

  const socialLinks = [
    { icon: FaFacebook,  href: "https://facebook.com",  label: "Facebook" },
    { icon: FaTwitter,   href: "https://twitter.com",   label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaVimeo,     href: "https://vimeo.com",     label: "Vimeo" },
  ];

  return (
    <header className="w-full">
      {/* Top bar: date + social (desktop only) */}
      <div className="hidden md:block bg-[#162238] text-white">
        <div className="max-w-full mx-auto px-4 md:px-[5%] py-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              {new Date()
                .toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                .replace(/,/g, ", ")}
            </div>
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors text-lg"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main red header */}
      <div className="bg-[#d43939] text-white">
        <div className="max-w-full mx-auto px-4 md:px-[5%] py-4 md:py-5">

          {/* Mobile */}
          <div className="flex items-center justify-between md:hidden">
            <Link href="/" className="text-2xl font-bold">
              Shadow Ledger
            </Link>
            <button
              onClick={toggleMenu}
              className="text-white text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between">
            <Link href="/" className="text-3xl font-bold mr-8">
              Shadow Ledger
            </Link>
            <nav className="flex items-center gap-5 flex-1 flex-wrap">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-semibold hover:text-gray-200 transition-colors text-lg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile expandable menu */}
        {isMenuOpen && (
          <nav
            className="md:hidden bg-[#d43939] border-t border-red-600 px-4 py-4 animate-slideDown"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 text-white font-semibold text-base flex items-center justify-between hover:text-gray-200 transition-colors"
                onClick={closeMenu}
              >
                {item.label}
                <span className="text-sm">›</span>
              </Link>
            ))}

            <div className="flex gap-4 py-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors text-lg"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>

            <div className="py-4">
              <SearchInput onResultClick={closeMenu} />
            </div>
          </nav>
        )}

        {/* Desktop expandable search */}
        {searchOpen && (
          <div className="hidden md:block bg-[#d43939] border-t border-red-600 px-4 md:px-[10%] py-4 animate-slideDown">
            <div className="max-w-md ml-auto">
              <SearchInput onResultClick={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Breaking News Ticker – latest from API */}
      <BreakingNewsTicker articles={breakingArticles} />

      {/* Global styles */}
      <style jsx global>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform;
          animation: marquee 20s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; overflow: hidden; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .blink-dot { animation: blink 1.2s ease-in-out infinite; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </header>
  );
}