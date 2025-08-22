"use client";

import { useState, useEffect } from "react";
import NavbarView from "@/components/organisms/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import ContentSectionController from "@/components/molecules/contentSection/contentController";
import CardController from "@/components/molecules/card/cardController";

// Custom Icons
const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ServiceIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const backgroundImages = [
  "/images/konstruksi.jpg",
  "/images/konstruksi2.jpg",
  "/images/konstruksi3.jpg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(backgroundImages[0]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % backgroundImages.length;
        setCurrentImage(backgroundImages[nextIndex]);
        return nextIndex;
      });
    }, 4000); // Slower transition for more elegance

    return () => clearInterval(interval);
  }, []);

  const dataGaleri = [
    {
      imageSrc: "/images/konstruksi3.jpg",
      title: "Judul Kartu 1",
      caption: "Keterangan Kartu 1",
    },
    {
      imageSrc: "/images/konstruksi3.jpg",
      title: "Judul Kartu 2",
      caption: "Keterangan Kartu 2",
    },
    {
      imageSrc: "/images/konstruksi3.jpg",
      title: "Judul Kartu 3",
      caption: "Keterangan Kartu 3",
    },
    {
      imageSrc: "/images/konstruksi3.jpg",
      title: "Judul Kartu 4",
      caption: "Keterangan Kartu 4",
    },
    {
      imageSrc: "/images/konstruksi3.jpg",
      title: "Judul Kartu 5",
      caption: "Keterangan Kartu 5",
    },
  ];

  const services = [
    "Melayani penerimaan anggota baru dan peningkatan klasifikasi anggota yang sudah terdaftar.",
    "Melayani dan melakukan pelatihan serta pembinaan para anggota untuk meningkatkan profesionalisme dan kemampuan dalam melaksanakan tugas-tugas sesuai keilmuan dibidangnya masing masing.",
    "Melayani Pembuatan Pembuatan Berbagai Macam Sertifikat untuk: Sertifikat Badan Usaha, Pembuatan Sertifikat Kompetensi (SKK)",
    "Melayani pembentukan tempat tempat Pelayanan anggota yang membutuhkan peningkatan Kompetensi yaitu Tempat Uji Kompetensi (TUK)."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <NavbarView />
      
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-screen w-full">
          {/* Background Images with Smooth Transition */}
          {backgroundImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === imageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            />
          ))}
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30"></div>
          
          {/* Animated Content */}
          <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Persatuan Konsultan Indonesia
                  <br />
                  <span className="text-blue-300">Kalimantan Barat</span>
                </h1>
                
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-lg border-l-4 border-blue-400 rounded-2xl p-6 shadow-2xl">
                    <p className="text-white text-lg md:text-xl font-light leading-relaxed">
                      Asosiasi Perusahaan Konsultan Perencana dan Pengawas
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3">
                    Selengkapnya
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setImageIndex(index);
                  setCurrentImage(backgroundImages[index]);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === imageIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
              <ServiceIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Pelayanan
              <br />
              <span className="text-blue-600">Persatuan Konsultan Indonesia</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Introduction */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tentang Organisasi</h3>
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Organisasi PERKINDO sebagai organisasi Nirlaba tentu mempunyai keterbatasan ruang gerak dalam melayani kebutuhan anggotanya, baik dari segi kapasitas sumber daya tenaga dan pendanaan untuk dapat secara cepat memenuhi kebutuhan anggota yang tersebar di seluruh Indonesia.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Sadar akan hal tersebut dan untuk mendapatkan solusi penyelesaian yang saling menguntungkan, maka DPP PERKINDO Bersama DPD di seluruh Indonesia berembug untuk memutuskan membentuk Jejaring anak organisasi yang ditugaskan untuk menjalanlan roda organisasi dalam lingkup tugas yang khusus guna melayani kebutuhan anggota secara cepat, terukur dan murah.
                  </p>
                </div>
              </div>

              {/* Organizations */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-10 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Organisasi Terkait</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>LSBU PT. SERBUJAKONS</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>PERTAHKINDO (Persatuan Tenaga Ahli Konsultan Indonesia)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>PT. LSP PERTAHKINDO KONSTRUKSI NASIONAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Services */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Layanan Utama</h3>
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckIcon className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-blue-600 mb-2">
                        Layanan {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {service}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Galeri Proyek
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Showcase dari berbagai proyek dan kegiatan yang telah kami laksanakan
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <CardController cards={dataGaleri} />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <ContentSectionController />
      </section>

      {/* Decorative Wave */}
      <div className="relative">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-16 md:h-20 lg:h-24 fill-slate-100"
        >
          <path d="M0,50 C300,10 900,90 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <Footer />
    </div>
  );
}