export default function HeroNews() {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m-2-4h4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita & Informasi</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Dapatkan informasi terkini seputar kegiatan dan perkembangan Perkindo Kalimantan Barat
          </p>
        </div>
      </div>
    </div>
  );
}
