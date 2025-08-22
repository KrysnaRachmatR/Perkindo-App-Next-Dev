"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarView from "@/components/organisms/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";

// Services data
const services = [
  {
    id: 1,
    title: "Sertifikasi dan Pelatihan",
    shortDescription: "Program pelatihan dan sertifikasi profesional untuk tenaga kerja konstruksi",
    fullDescription: "Kami menyediakan program pelatihan komprehensif dan sertifikasi profesional untuk meningkatkan kompetensi tenaga kerja di bidang konstruksi. Program ini mencakup berbagai aspek mulai dari teknik konstruksi dasar hingga manajemen proyek tingkat lanjut.",
    features: [
      "Pelatihan K3 (Keselamatan dan Kesehatan Kerja)",
      "Sertifikasi Kompetensi Tenaga Kerja",
      "Workshop Manajemen Proyek",
      "Training Teknologi Konstruksi Modern",
      "Program Magang dan Praktik Lapangan"
    ],
    icon: "🎓",
    image: "/images/service-training.jpg",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    title: "Konsultasi Teknis",
    shortDescription: "Layanan konsultasi dan pendampingan teknis untuk proyek konstruksi",
    fullDescription: "Tim ahli kami siap memberikan konsultasi teknis professional untuk berbagai aspek proyek konstruksi. Dari perencanaan hingga pelaksanaan, kami membantu memastikan proyek Anda berjalan sesuai standar dan regulasi yang berlaku.",
    features: [
      "Konsultasi Perencanaan Proyek",
      "Review dan Analisis Teknis",
      "Pendampingan Pelaksanaan Konstruksi",
      "Audit dan Quality Control",
      "Konsultasi Regulasi dan Perizinan"
    ],
    icon: "🏗️",
    image: "/images/service-consulting.jpg",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: 3,
    title: "Kemitraan Bisnis",
    shortDescription: "Fasilitasi kerjasama dan networking antar pelaku industri konstruksi",
    fullDescription: "Kami memfasilitasi kemitraan strategis antara perusahaan konstruksi, kontraktor, supplier, dan stakeholder lainnya. Program ini bertujuan untuk memperkuat ekosistem industri konstruksi di Kalimantan Barat melalui kolaborasi yang saling menguntungkan.",
    features: [
      "Business Matching & Networking",
      "Program Kemitraan UMKM",
      "Fasilitasi Joint Venture",
      "Market Intelligence & Research",
      "Trade Show dan Expo Konstruksi"
    ],
    icon: "🤝",
    image: "/images/service-partnership.jpg",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: 4,
    title: "Advokasi & Regulasi",
    shortDescription: "Pendampingan dalam aspek legal dan regulasi industri konstruksi",
    fullDescription: "Kami memberikan dukungan advokasi dan pendampingan terkait regulasi industri konstruksi. Tim legal kami membantu anggota dalam memahami dan mematuhi berbagai ketentuan hukum yang berlaku di sektor konstruksi.",
    features: [
      "Pendampingan Legal & Hukum",
      "Konsultasi Perizinan Usaha",
      "Advokasi Kebijakan Industri",
      "Mediasi Sengketa Konstruksi",
      "Update Regulasi Terbaru"
    ],
    icon: "⚖️",
    image: "/images/service-legal.jpg",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  }
];

// Process steps
const processSteps = [
  {
    step: "01",
    title: "Konsultasi Awal",
    description: "Diskusi kebutuhan dan tujuan layanan yang diinginkan",
    icon: "💬"
  },
  {
    step: "02", 
    title: "Analisis & Proposal",
    description: "Evaluasi mendalam dan penyusunan proposal solusi",
    icon: "📋"
  },
  {
    step: "03",
    title: "Pelaksanaan",
    description: "Implementasi layanan sesuai kesepakatan dan timeline",
    icon: "🚀"
  },
  {
    step: "04",
    title: "Monitoring & Evaluasi",
    description: "Pengawasan dan evaluasi hasil untuk memastikan kualitas",
    icon: "📊"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const openModal = (service) => {
    setSelectedService(service);
    setActiveTab("overview");
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      <NavbarView />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Layanan Kami</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Solusi lengkap untuk pengembangan industri konstruksi di Kalimantan Barat
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`group ${service.bgColor} rounded-3xl p-8 border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer`}
              onClick={() => openModal(service)}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* Preview Features */}
              <div className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-slate-700">
                    <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className="text-sm text-slate-500 pl-7">
                    +{service.features.length - 3} layanan lainnya
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button className={`bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-xl font-medium group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                  Pelajari Lebih Lanjut
                </button>
                <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Alur Pelayanan</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Proses yang terstruktur untuk memberikan layanan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-blue-500">
                    {step.step}
                  </div>
                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Berkonsultasi dengan Tim Ahli Kami?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk mendiskusikan kebutuhan proyek konstruksi Anda dan dapatkan solusi terbaik dari tim profesional Perkindo Kalbar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              Hubungi Kami
            </Link>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300">
              Unduh Brosur Layanan
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto relative transform animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-red-500/20 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className={`bg-gradient-to-r ${selectedService.color} text-white p-8`}>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                  {selectedService.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedService.title}</h2>
                  <p className="text-white/90">{selectedService.shortDescription}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "overview"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "features"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Detail Layanan
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === "overview" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Deskripsi Layanan</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {selectedService.fullDescription}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-4">Mengapa Memilih Layanan Ini?</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600">Tim profesional berpengalaman</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600">Standar nasional dan internasional</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600">Harga kompetitif dan transparan</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600">Support berkelanjutan</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-4">Target Pengguna</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-slate-600">Perusahaan Konstruksi</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-slate-600">Kontraktor & Subkontraktor</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-slate-600">Developer & Investor</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-slate-600">Instansi Pemerintah</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Detail Layanan yang Tersedia</h3>
                  <div className="grid gap-4">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-start p-4 bg-slate-50 rounded-xl">
                        <div className={`w-8 h-8 bg-gradient-to-r ${selectedService.color} rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">{feature}</h4>
                          <p className="text-sm text-slate-600">Layanan profesional dengan standar kualitas tinggi dan pendampingan penuh dari tim ahli.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-6 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-colors"
              >
                Tutup
              </button>
              <Link
                href="/contact"
                className={`px-6 py-3 bg-gradient-to-r ${selectedService.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center`}
              >
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
}