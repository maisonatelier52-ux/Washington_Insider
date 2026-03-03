// components/RelatedNews.jsx
import Image from 'next/image';
import Link from 'next/link';

export default function RelatedNews({ currentCategory, relatedPosts }) {
  if (!relatedPosts?.length) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="mt-5 pt-5 border-t-2 border-dashed border-gray-300">
      <h2 className="text-2xl text-black md:text-3xl font-bold mb-8 text-center md:text-left">
        More in {currentCategory.replace(/-/g, ' ').toUpperCase()}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.category}/${post.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden  mb-4 shadow-sm">
              <Image
                src={post.heroImage || post.image || '/images/fallback-related.jpg'}
                alt={post.heading}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-lg text-black font-semibold leading-tight group-hover:text-[#d43939] transition-colors line-clamp-3">
              {post.heading}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {formatDate(post.date)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}