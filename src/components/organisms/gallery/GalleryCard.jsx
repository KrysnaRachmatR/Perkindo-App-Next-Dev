import { BASE_URL } from "@/utils/constant";

export default function GalleryCard({ item, onClick, index }) {
  return (
    <div
      key={item.id}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 break-inside-avoid mb-6 ${
        index % 3 === 0
          ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
          : index % 3 === 1
          ? "bg-gradient-to-br from-pink-500/10 to-orange-500/10"
          : "bg-gradient-to-br from-green-500/10 to-teal-500/10"
      }`}
      onClick={() => onClick(item)}
    >
      {/* Image with Overlay Effects */}
      <div className="relative overflow-hidden">
        <img
          className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={`${BASE_URL}/storage/${item.gambar}`}
          alt={item.judul || "Galeri"}
          style={{ aspectRatio: "auto" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium leading-relaxed line-clamp-3">
            {item.caption || "Tidak ada caption"}
          </p>
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span className="text-white/80 text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              Klik untuk detail
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
