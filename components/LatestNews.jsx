"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import authorsData from "../public/data/authors.json";

// API
const API_URL = "https://my-api-usa.com/p16/API/api/news";
const IMAGE_URL = "https://my-api-usa.com/p16/API/api/news-images";

// ─────────────────────────────────────────────
// Get author by category
// ─────────────────────────────────────────────
function getAuthorByCategory(category) {
  const categoryAuthor = authorsData.categories.find(
    (item) => item.category === category
  );

  return (
    categoryAuthor?.author || {
      name: "Staff Reporter",
      profileImage: "/images/default-author.webp",
      country: "USA",
      slug: "staff-reporter",
    }
  );
}

export default function HeroSlider() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ─────────────────────────────────────────────
  // Fetch latest 4 news from API
  // ─────────────────────────────────────────────
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // Sort latest
        const latest = data
          .sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
          .slice(0, 4);

        // Map to slider format
        const items = latest.map((item, index) => {
          const category = item.category?.category_name
            ?.toLowerCase()
            .replace(/\s+/g, "-");

          return {
            id: item.news_id || index,
            image: item.photo_url,
            alt: item.img_alt || item.title,
            heading: item.title || item.news_title,
            slug: item.encode_title,
            category,
            date: item.news_date,
            author: getAuthorByCategory(category),
          };
        });

        setCarouselItems(items);
      } catch (error) {
        console.error("API error:", error);
      }
    }

    fetchNews();
  }, []);

  const currentItem = carouselItems[currentIndex];

  // Auto slide
  useEffect(() => {
    if (isPaused || carouselItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, carouselItems]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  if (!currentItem) return null;

  // SEO Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: carouselItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "NewsArticle",
        headline: item.heading,
        datePublished: item.date,
        image: item.image,
        author: {
          "@type": "Person",
          name: item.author.name,
        },
        url: `/${item.category}/${item.slug}`,
      },
    })),
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <div className="relative w-full h-[380px] md:h-[520px]">
        <Image
          src={currentItem.image}
          alt={currentItem.alt || currentItem.heading}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="max-w-3xl bg-[#162238]/70 px-8 py-8 shadow-2xl">

          <div className="flex items-center justify-center gap-4 mb-4 text-white text-sm flex-wrap">
            <time>
              {new Date(currentItem.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>

            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 overflow-hidden">
                <Image
                  src={currentItem.author.profileImage}
                  alt={currentItem.author.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span>{currentItem.author.name}</span>
            </div>
          </div>

          <Link href={`/${currentItem.category}/${currentItem.slug}`}>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              {currentItem.heading}
            </h2>
          </Link>

          <p className="mt-3 text-sm uppercase text-[#d43939]">
            {currentItem.category}
          </p>
        </div>
      </div>

      {/* Navigation */}
      {carouselItems.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white flex items-center justify-center hover:bg-[#d43939]"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white flex items-center justify-center hover:bg-[#d43939]"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {/* SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}