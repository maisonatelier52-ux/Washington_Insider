// components/PoliticalFeatured.jsx
import Image from "next/image";
import Link from "next/link";

export default function PoliticalFeatured({ politicsArticles = [] }) {
  if (politicsArticles.length === 0) {
    return null; // or show a fallback message if preferred
  }

  return (
    <section className="w-full py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {politicsArticles.map((article) => {
          const title = article.heading || article.metaTitle || "Untitled";
          const imageSrc =
            article.image || article.heroImage || "/images/placeholder.webp";
          const href = `/politics/${article.slug}`;

          return (
            <div key={article.slug} className="flex flex-col">
              <div className="flex gap-4">
                {/* Image */}
                <Link href={href} className="flex-shrink-0" title={title}>
                  <div className="relative w-[125px] h-[100px] overflow-hidden group">
                    <Image
                      src={imageSrc}
                      alt={article.alt || title}
                      fill
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy" // good for performance
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col min-w-0">
                  <Link href={href} className="block group" title={title}>
                    <h3 className="text-lg font-bold text-black leading-snug break-words group-hover:text-[#d43939] transition-colors duration-300">
                      {title.length > 70 ? `${title.slice(0, 70)}...` : title}
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
  );
}
