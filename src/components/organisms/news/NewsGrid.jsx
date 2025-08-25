import Image from "next/image";

export default function NewsGrid({ currentNews, formatDate, getCategoryColor, onSelect }) {
  if (!currentNews.length) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-slate-600 mb-2">Tidak ada berita ditemukan</h3>
        <p className="text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {currentNews.map((item) => (
        <article
          key={item.id}
          onClick={() => onSelect(item)}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-3 left-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}
              >
                {item.category}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{formatDate(item.created_at)}</span>
              <span>{item.readTime}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
