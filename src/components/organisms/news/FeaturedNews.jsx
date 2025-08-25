import Image from "next/image";

export default function FeaturedNews({ featuredNews, getCategoryColor, formatDate, onSelect }) {
  if (!featuredNews || !featuredNews.length) return null;

  return (
    <div className="mb-16">
      {/* Title */}
      <div className="flex items-center mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
        <h2 className="text-2xl font-bold text-slate-800">Berita Utama</h2>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {featuredNews.slice(0, 2).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect?.(item)} // panggil handler dari parent
            className="cursor-pointer group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
          >
            {/* Gambar */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor?.(
                    item.category || "Umum"
                  )}`}
                >
                  {item.category || "Umum"}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                FEATURED
              </div>
            </div>

            {/* Konten */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-slate-600 mb-4 line-clamp-3">{item.caption}</p>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{item.author || "PERKINDO"}</span>
                <span>{formatDate(item.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
