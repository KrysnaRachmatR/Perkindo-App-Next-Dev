const GaleriText = () => (
  <div className="max-w-2xl mx-auto text-center space-y-6">
    {/* Animated Title */}
    <div className="relative">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse">
        Dokumentasi Kegiatan
      </h1>
      
      {/* Subtle underline decoration */}
      <div className="flex items-center justify-center mt-4">
        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-70"></div>
        <div className="mx-3 w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-70"></div>
      </div>
    </div>

    {/* Enhanced Description */}
    <div className="relative">
      <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light tracking-wide">
        Jelajahi dokumentasi visual dari berbagai kegiatan yang telah kami laksanakan
        <span className="inline-block ml-2 text-blue-300">✦</span>
      </p>
      
      {/* Floating accent elements */}
      <div className="absolute -left-4 top-0 w-1 h-1 bg-blue-300/60 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
      <div className="absolute -right-4 bottom-0 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
    </div>

    {/* Elegant bottom accent */}
    <div className="flex items-center justify-center space-x-2 pt-2">
      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
      <div className="w-2 h-2 bg-blue-300/60 rounded-full animate-pulse"></div>
      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
    </div>
  </div>
);

export default GaleriText;