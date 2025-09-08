import NavbarView from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import HeroSection from "@/components/organisms/HeroSection";
// import ServicesSection from "@/components/organisms/ServicesSection";
import ServicesSection from "@/components/organisms/ServiceSection";
import GallerySection from "@/components/organisms/GallerySection";
import ContentSectionController from "@/components/molecules/ContentSection/ContentController";

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
