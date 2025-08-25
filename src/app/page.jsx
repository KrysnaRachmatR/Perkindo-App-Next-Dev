import NavbarView from "@/components/organisms/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import HeroSection from "@/components/organisms/HeroSection";
// import ServicesSection from "@/components/organisms/ServicesSection";
import ServicesSection from "@/components/organisms/ServiceSection";
import GallerySection from "@/components/organisms/GallerySection";
import ContentSectionController from "@/components/molecules/contentSection/contentController";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <NavbarView />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <ContentSectionController />
      <Footer />
    </div>
  );
}
