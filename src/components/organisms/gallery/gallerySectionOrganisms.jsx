import GaleriText from "@/components/organisms/gallery/galleryText";

const GaleriSectionOrganism = () => (
  <section className="relative w-full bg-gradient-to-br from-[#161D6F] via-[#1E2875] to-[#252F7D] overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0">
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
    </div>

    {/* Main Content */}
    <div className="relative z-10 flex items-center justify-center text-center text-white py-16 md:py-20 lg:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        {/* <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-blue-300 rounded-full mr-2 animate-pulse"></span>
          Gallery
        </div> */}

        {/* Enhanced Text Container */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 lg:p-12 shadow-2xl">
          <GaleriText />
          
          {/* Decorative Line */}
          <div className="mt-8 flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-24"></div>
            <div className="mx-4 w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-24"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-6 -left-6 w-3 h-3 bg-blue-300/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute -top-4 -right-8 w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute -bottom-6 -left-4 w-3 h-3 bg-blue-200/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-8 -right-6 w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>
    </div>

    {/* Bottom Wave Effect */}
    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/5 to-transparent"></div>
  </section>
);

export default GaleriSectionOrganism;