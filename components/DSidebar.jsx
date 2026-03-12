"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaVimeoV,
} from "react-icons/fa";

// API
const API_URL = "https://my-api-usa.com/p16/API/api/news";
const AUTHOR_API_BASE = "https://my-api-usa.com/p16/API/api/client/";

// Category → Author ID mapping
const categoryAuthorMap = {
  business: 1,
  world: 2,
  finance: 3,
  technology: 4,
  politics: 5,
  lifestyle: 6,
  opinion: 7,
  investigation: 8,
};

const ALLOWED_CATEGORIES = [
  "business",
  "world",
  "finance",
  "technology",
  "politics",
  "lifestyle",
  "opinion",
  "investigation",
];

// ─────────────────────────────────────────────
// Live Search Input (unchanged)
// ─────────────────────────────────────────────
function SearchInput({ className = "", onResultClick }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    async function fetchAllNews() {
      try {
        setLoading(true);
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Search API failed");
        const data = await res.json();

        const searchItems = data
          .filter((item) => {
            const cat = item.category?.category_name?.toLowerCase() || "";
            return ALLOWED_CATEGORIES.includes(cat);
          })
          .map((item) => ({
            heading: item.title || item.news_title || "Untitled",
            slug: item.encode_title || "#",
            category: item.category?.category_name
              ?.toLowerCase()
              .replace(/\s+/g, "-") || "news",
            date: item.news_date || "",
          }));

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
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    const filtered = (window.allSearchItems || [])
      .filter((item) =>
        item.heading?.toLowerCase().includes(value.toLowerCase())
      )
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
      <div className="flex items-center bg-white rounded-md px-3 py-2 border border-gray-300">
        <FaSearch className="text-gray-500 mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Type keyword to search"
          value={query}
          onChange={handleInput}
          className="flex-1 outline-none text-gray-800 text-sm bg-white"
          aria-label="Search"
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

      {!loading && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-center text-sm text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Section Header (unchanged)
// ─────────────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <div className="flex items-center bg-gray-300 gap-0 mb-4">
      <span className="w-1 h-13 bg-red-600 inline-block mr-3 flex-shrink-0" />
      <h2 className="text-xl my-3 font-extrabold text-gray-900 uppercase tracking-wide">
        {title}
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────
// Hero Card, SelectedArticles, SmallArticleList (unchanged)
// ─────────────────────────────────────────────
function HeroCard({ article }) {
  if (!article) return null;

  const image = article.image || article.heroImage || "/images/placeholder.webp";
  const title = article.heading || article.metaTitle || "Untitled";
  const href = `/${article.category || "news"}/${article.slug || "#"}`;
  const date = article.date || "—";

  const cat = article.category?.toLowerCase() || "";
  if (!ALLOWED_CATEGORIES.includes(cat)) return null;

  return (
    <Link href={href} title={title} className="block group mb-4">
      <article className="relative overflow-hidden">
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={image}
            alt={article.alt || title}
            fill
            sizes="320px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        <div className="bg-[#d43939] px-3 py-3 transition-colors duration-300 group-hover:bg-white">
          <div className="text-[#162238] text-sm font-bold mb-1 transition-colors duration-300 group-hover:text-[#d43939]">
            <time dateTime={new Date(date).toISOString()}>
              {date}
            </time>
          </div>
          <h2 className="text-white text-base font-extrabold leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#d43939]">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  );
}

function SelectedArticles({ articles }) {
  if (!articles?.length) return null;

  const filtered = articles.filter((a) => {
    const cat = a.category?.toLowerCase() || "";
    return ALLOWED_CATEGORIES.includes(cat);
  });

  if (filtered.length === 0) return null;

  return (
    <div className="mb-6">
      <SectionHeader title="Latest News" />
      <ul className="flex flex-col gap-5">
        {filtered.map((article) => {
          const image = article.image || article.heroImage || "/images/placeholder.webp";
          const title = article.heading || article.metaTitle || "Untitled";
          const href = `/${article.category || "news"}/${article.slug || "#"}`;
          const date = article.date || "—";

          return (
            <li key={article.slug || Math.random()}>
              <Link href={href} title={title} className="block group">
                <article>
                  <div className="relative w-full h-36 overflow-hidden mb-2">
                    <Image
                      src={image}
                      alt={article.alt || title}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    <time dateTime={new Date(date).toISOString()}>
                      {date}
                    </time>
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                    {title}
                  </h3>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SmallArticleList({ articles }) {
  if (!articles?.length) return null;

  const filtered = articles.filter((a) => {
    const cat = a.category?.toLowerCase() || "";
    return ALLOWED_CATEGORIES.includes(cat);
  });

  if (filtered.length === 0) return null;

  return (
    <div className="mb-6">
      <ul className="flex flex-col gap-3">
        {filtered.map((article) => {
          const image = article.image || article.heroImage || "/images/placeholder.webp";
          const title = article.heading || article.metaTitle || "Untitled";
          const href = `/${article.category || "news"}/${article.slug || "#"}`;

          return (
            <li key={article.slug || Math.random()}>
              <Link href={href} title={title} className="flex gap-3 group">
                <div className="relative flex-shrink-0 w-16 h-14 overflow-hidden">
                  <Image
                    src={image}
                    alt={article.alt || title}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors duration-200">
                  {title}
                </h3>
              </Link>
              <div className="mt-3 w-full h-px bg-gray-200" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// Recent Authors Section – ONLY AUTHORS (photo + name + bio)
// ─────────────────────────────────────────────
function RecentAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const fetched = [];
      for (const id of Object.values(categoryAuthorMap)) {
        try {
          const res = await fetch(`${AUTHOR_API_BASE}${id}`);
          const data = await res.json();
          if (data.status && data.data) {
            fetched.push(data.data);
          }
        } catch (err) {
          console.error(`Failed to fetch author ${id}:`, err);
        }
      }
      setAuthors(fetched.slice(0, 3)); // Only 3 authors
    };

    fetchAuthors();
  }, []);

  return (
    <div className="mb-6">
      <SectionHeader title="Recent Comments" />
      <ul className="flex flex-col gap-5">
        {authors.map((author) => (
          <li key={author.id}>
            <Link
              href={`/author/${author.url || "#"}`}
              title={author.name}
              className="flex gap-4 group items-start hover:opacity-90 transition-opacity"
            >
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
                <Image
                  src={author.photo_url}
                  alt={author.name || "Author"}
                  fill
                  sizes="64px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-extrabold uppercase text-gray-700 group-hover:text-[#d43939] transition-colors">
                  {author.name}
                </h4>
                {author.meta_description && (
                  <p className="text-xs text-gray-600 line-clamp-3 group-hover:text-[#d43939] transition-colors">
                    {author.meta_description}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
        {authors.length === 0 && (
          <p className="text-sm text-gray-500 text-center">Loading authors...</p>
        )}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// Social Network (unchanged)
// ─────────────────────────────────────────────
function SocialNetwork() {
  const socials = [
    { href: "https://facebook.com/courtnews", icon: <FaFacebookF size={16} />, label: "Facebook", bg: "bg-blue-600" },
    { href: "https://twitter.com/courtnews", icon: <FaTwitter size={16} />, label: "X (Twitter)", bg: "bg-black" },
    { href: "https://instagram.com/courtnews", icon: <FaInstagram size={16} />, label: "Instagram", bg: "bg-pink-500" },
    { href: "https://vimeo.com/courtnews", icon: <FaVimeoV size={16} />, label: "Vimeo", bg: "bg-sky-500" },
  ];

  return (
    <div className="mb-6">
      <SectionHeader title="Social Network" />
      <div className="flex gap-2">
        {socials.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`${s.bg} text-white w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity duration-200`}
          >
            {s.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Banner Ad (unchanged)
// ─────────────────────────────────────────────
function BannerAd({ image, text, href = "/" }) {
  if (!image) return null;

  return (
    <div className="mb-6">
      <Link href={href} title={text} className="block group relative overflow-hidden">
        <div className="relative w-full h-90">
          <Image
            src={image}
            alt={text || "Advertisement"}
            fill
            sizes="320px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────
// Categories (unchanged)
// ─────────────────────────────────────────────
function Categories({ categories }) {
  if (!categories?.length) return null;

  return (
    <div className="mb-6">
      <SectionHeader title="Categories" />
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/${cat}`}
            title={`View ${cat.replace(/-/g, " ")} articles`}
            className="text-sm font-semibold uppercase tracking-wide border-3 border-gray-300 text-gray-700 px-3 py-2 hover:bg-[#162238] hover:text-white hover:border-[#d43939] transition-colors duration-200"
          >
            {cat.replace(/-/g, " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN SIDEBAR EXPORT
// ─────────────────────────────────────────────
export default function Sidebar({
  heroArticle,
  selectedArticles,
  smallArticles,
  categories,
  bannerImage,
  bannerText,
  bannerHref,
}) {
  return (
    <aside className="w-full lg:max-w-xs mx-auto lg:mx-0 lg:sticky lg:top-4">
      <HeroCard article={heroArticle} />
      <SearchInput className="mb-6" />
      <SelectedArticles articles={selectedArticles} />
      <SmallArticleList articles={smallArticles} />

      {/* ←←← NEW AUTHOR SECTION ADDED HERE (only this part was added) */}
      <RecentAuthors />

      <SocialNetwork />
      <Categories categories={categories} />
      <BannerAd image={bannerImage} text={bannerText} href={bannerHref} />
    </aside>
  );
}