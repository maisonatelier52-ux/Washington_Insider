// components/PrevNextArticles.jsx
import Image from 'next/image';
import Link from 'next/link';

export default function PrevNextArticles({ prevPost, nextPost }) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="mt-5 pt-5 border-t border-dashed border-gray-300 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Previous Post */}
      <div>
        <span className="block text-sm uppercase font-semibold tracking-wide text-gray-500 mb-4">
          Previous Post
        </span>

        {prevPost ? (
          <Link
            href={`/${prevPost.category}/${prevPost.slug}`}
            className="group flex items-start gap-5 hover:text-[#d43939] transition-colors"
          >
            <div className="relative w-30 h-20 sm:w-40 sm:h-25 flex-shrink-0 overflow-hidden shadow-sm">
              <Image
                src={prevPost.heroImage || prevPost.image || '/images/fallback.webp'}
                alt={prevPost.heading || 'Previous article'}
                fill
                sizes="(max-width: 640px) 100px, 128px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg text-black sm:text-lg font-bold leading-tight group-hover:text-[#d43939] transition-colors line-clamp-3">
              {prevPost.heading || prevPost.metaTitle}
            </h3>
          </Link>
        ) : (
          <p className="text-gray-500 italic">No previous article available</p>
        )}
      </div>

      {/* Next Post */}
      <div className="lg:text-right">
        <span className="block text-sm uppercase font-semibold tracking-wide text-gray-500 mb-4 lg:text-right">
          Next Post
        </span>

        {nextPost ? (
          <Link
            href={`/${nextPost.category}/${nextPost.slug}`}
            className="group flex items-start gap-5 lg:flex-row-reverse hover:text-[#d43939] transition-colors"
          >
            <div className="relative w-30 h-20 sm:w-40 sm:h-25 flex-shrink-0 overflow-hidden shadow-sm">
              <Image
                src={nextPost.heroImage || nextPost.image || '/images/fallback.webp'}
                alt={nextPost.heading || 'Next article'}
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg text-black sm:text-xl font-bold leading-tight group-hover:text-[#d43939] transition-colors line-clamp-3 line-clamp-3 lg:text-right">
              {nextPost.heading || nextPost.metaTitle}
            </h3>
          </Link>
        ) : (
          <p className="text-gray-500 italic">No next article available</p>
        )}
      </div>
    </div>
  );
}