import Image from "next/image";

// Custom Icons
const NewsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ContentSectionView = ({ berita, loading, router }) => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
            <NewsIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Informasi PERKINDO
          </h2>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto">
            Dapatkan update terkini dan informasi penting dari PERKINDO
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="animate-pulse space-y-6">
                  <div className="w-full h-[300px] md:h-[400px] bg-white/20 rounded-2xl"></div>
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 bg-white/20 rounded-full"></div>
                    <div className="h-4 w-1/2 bg-white/15 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-white/15 rounded-full"></div>
                      <div className="h-4 w-5/6 bg-white/15 rounded-full"></div>
                      <div className="h-4 w-4/5 bg-white/15 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : berita.length > 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                {/* Featured Image */}
                <div className="relative w-full h-[300px] md:h-[400px] mb-6 rounded-2xl overflow-hidden group">
                  <Image
                    src={`http://localhost:8000/storage/${berita[0].image}`}
                    alt={berita[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600/90 backdrop-blur-lg text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                      Berita Utama
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight hover:text-blue-200 transition-colors duration-300">
                    {berita[0].title}
                  </h2>
                  
                  <div className="flex items-center text-blue-200 text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {berita[0].time}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    {berita[0].caption}
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => router.push('/news')}
                      className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      Baca Selengkapnya
                      <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <NewsIcon className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-gray-300 text-lg">Tidak ada berita tersedia saat ini.</p>
              </div>
            )}
          </div>

          {/* Sidebar - Other News */}
          {berita.length > 1 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Sidebar Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <NewsIcon className="w-6 h-6" />
                    Berita Lainnya
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Update terbaru lainnya
                  </p>
                </div>

                {/* News List */}
                <div className={`p-6 ${berita.length > 6 ? "max-h-[500px] overflow-y-auto" : ""}`}>
                  <div className="space-y-4">
                    {berita.slice(1).map((item, index) => (
                      <div
                        key={item.id}
                        className="group cursor-pointer p-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-blue-200 hover:shadow-lg"
                        onClick={() => router.push(`/news/`)}
                      >
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight mb-2">
                          {item.title}
                        </h4>
                        
                        <div className="flex items-center text-gray-500 text-xs mb-2">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {item.time}
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                          {item.caption}
                        </p>
                        
                        {/* Read More Indicator */}
                        <div className="flex items-center text-blue-600 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="font-medium">Baca selengkapnya</span>
                          <ArrowRightIcon className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        
                        {/* Divider */}
                        {index < berita.slice(1).length - 1 && (
                          <div className="mt-4 pt-4 border-b border-gray-200"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* View All Button */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => router.push('/news')}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Lihat Semua Berita
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
    </section>
  );
};

export default ContentSectionView;