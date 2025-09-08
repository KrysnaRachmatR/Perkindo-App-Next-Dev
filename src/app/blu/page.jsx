'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MapPin, User, ChevronDown, ChevronUp, Star, Award, Target, Eye, Zap, Shield, Sparkles } from 'lucide-react';
import NavbarView from '@/components/organisms/Navbar/Navbar';
import Footer from '@/components/organisms/Footer/Footer';

// Komponen Umum dengan animasi modern
const SectionTitle = ({ children, className = "", subtitle = "" }) => (
  <div className="text-center mb-20">
    <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-cyan-100/80 via-teal-50/80 to-emerald-100/80 backdrop-blur-sm border border-teal-200/50 text-teal-700 text-sm font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
      <Sparkles className="w-4 h-4 inline mr-2" />
      Profil Organisasi
    </div>
    <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent leading-tight mb-6 animate-gradient-x ${className}`}>
      {children}
    </h2>
    {subtitle && (
      <p className="text-slate-600 text-xl mt-6 max-w-3xl mx-auto leading-relaxed opacity-90">{subtitle}</p>
    )}
    <div className="flex items-center justify-center mt-8 space-x-4">
      <div className="h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent w-20 animate-pulse"></div>
      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
      <div className="h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent w-20 animate-pulse"></div>
    </div>
  </div>
);

// Komponen Header dengan desain futuristik
const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background dengan parallax effect */}
      <div className="absolute inset-0">
        <img
          src="/images/konstruksi.jpg" 
          alt="Background"
          className="object-cover w-full h-full scale-110 transition-transform duration-1000"
          style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/85 via-cyan-800/80 to-blue-900/85 backdrop-blur-sm" />
        
        {/* Animated geometric elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-xl animate-pulse-slow"></div>
        
        {/* Futuristic grid pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo dengan efek hologram */}
        <div className="mb-12 transform transition-all duration-1000 hover:scale-110">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 via-teal-400/30 to-blue-400/30 rounded-full animate-spin-slow opacity-50"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/40 via-teal-400/40 to-blue-400/40 rounded-full animate-spin-reverse opacity-70"></div>
            <img 
              src="/images/BADAN LAYANAN USAHA (2).png" 
              alt="Logo BLU" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 shadow-2xl backdrop-blur-sm relative z-10 transition-all duration-500 hover:border-cyan-400/50"
            />
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 animate-ping-slow"></div>
          </div>
        </div>

        {/* Main content dengan animasi teks modern */}
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-100 via-teal-100 to-white bg-clip-text text-transparent animate-gradient-x">
                Badan Layanan Usaha
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-6 my-12">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent w-24 animate-pulse"></div>
              <div className="relative">
                <Star className="w-8 h-8 text-yellow-300 animate-spin-slow" />
                <div className="absolute -inset-2 bg-yellow-400/20 rounded-full animate-ping"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent w-24 animate-pulse"></div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
            <p className="text-xl sm:text-2xl md:text-3xl max-w-5xl mx-auto leading-relaxed text-white/95 font-light">
              Badan Layanan Usaha (BLU) Mitra Usaha hadir menjadi solusi terdepan untuk membantu 
              kebutuhan legalitas konstruksi maupun non-konstruksi perusahaan dengan pelayanan profesional 
              dan terpercaya di era digital.
            </p>
          </div>
          
          {/* CTA Buttons dengan desain futuristik */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mt-16">
            <a 
              href="mailto:perkindokalbar@gmail.com" 
              className="group relative bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:from-cyan-400 hover:via-teal-400 hover:to-blue-400 text-white rounded-full py-5 px-10 text-lg font-semibold transition-all duration-500 flex items-center shadow-2xl transform hover:scale-110 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Mail className="mr-3 group-hover:animate-bounce relative z-10" /> 
              <span className="relative z-10">Hubungi Kami</span>
            </a>
            <a 
              href="#services" 
              className="group relative text-white border-2 border-cyan-400/50 hover:border-cyan-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-full py-5 px-10 text-lg font-semibold transition-all duration-500 flex items-center shadow-2xl transform hover:scale-110 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Layanan Kami</span>
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
            </a>
          </div>
        </div>

        {/* Scroll indicator dengan animasi smooth */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce-slow">
            <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-3 animate-scroll-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Komponen Sejarah dengan desain modern
const History = () => (
  <section className="py-24 bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/30 relative overflow-hidden">
    {/* Background elements */}
    <div className="absolute inset-0">
      <img
        src="/images/konstruksi4.jpg" 
        alt="Sejarah BLU"
        className="object-cover w-full h-full opacity-3"
      />
      <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
    </div>
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionTitle 
        subtitle="Perjalanan dan dedikasi kami dalam melayani industri konstruksi dengan inovasi berkelanjutan"
      >
        Sejarah Badan Layanan Usaha
      </SectionTitle>
      
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl shadow-2xl p-10 sm:p-12 md:p-16 transform transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl">
          <div className="space-y-10">
            {[
              {
                text: "Badan Layanan Usaha (BLU) merupakan Badan Usaha yang dibentuk oleh DPD Perkindo Kalimantan Barat sebagai penunjang pendapatan organisasi. BLU difokuskan pada kegiatan layanan bagi para badan usaha (BU) dalam mengurus Sertifikasi, Perizinan, Legalitas, Pelatihan maupun lainnya.",
                color: "from-teal-500 to-cyan-500"
              },
              {
                text: "Berdirinya Badan Layanan Usaha (BLU) didasarkan atas perubahan sistem permohonan sertifikasi badan usaha yang semula ke LPJK dialihkan ke Lembaga Sertifikasi sehingga Asosiasi kehilangan pendapatan dan anggota merasa kesulitan untuk memproses SBU.",
                color: "from-cyan-500 to-blue-500"
              },
              {
                text: "Maka dari perubahan tersebut, Perkindo memiliki keinginan untuk terus menunjukkan dedikasi yang tinggi dalam membantu Anggota DPD Perkindo Kalimantan Barat khususnya dan umumnya perusahaan Jasa Konstruksi maupun Non Konstruksi dalam memenuhi kebutuhan perusahaannya.",
                color: "from-blue-500 to-indigo-500"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className={`w-4 h-4 bg-gradient-to-r ${item.color} rounded-full mt-4 shadow-lg group-hover:scale-125 transition-transform duration-300`} 
                     style={{animationDelay: `${index * 0.5}s`}}>
                  <div className="w-full h-full rounded-full animate-ping opacity-30"></div>
                </div>
                <p className={`text-lg leading-relaxed text-slate-700 group-hover:text-slate-900 transition-colors duration-300 ${index === 0 ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-teal-600 first-letter:float-left first-letter:mr-4 first-letter:mt-2' : ''}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          
          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gradient-to-r from-teal-200/30 via-cyan-200/30 to-blue-200/30">
            {[
              { number: "10+", label: "Tahun Pengalaman", color: "from-teal-500 to-cyan-500", icon: Shield },
              { number: "500+", label: "Klien Dilayani", color: "from-cyan-500 to-blue-500", icon: Award },
              { number: "12", label: "Jenis Layanan", color: "from-blue-500 to-indigo-500", icon: Zap }
            ].map((stat, index) => (
              <div key={index} className="text-center group transform hover:scale-110 transition-all duration-500">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-lg group-hover:shadow-xl group-hover:rotate-12 transition-all duration-500`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Komponen Visi dan Misi dengan animasi modern
const VisionMission = () => (
  <section className="py-24 bg-gradient-to-br from-white via-slate-50/50 to-teal-50/30 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-teal-100/30 to-cyan-100/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-100/30 to-blue-100/30 rounded-full blur-3xl animate-float-delayed"></div>
    </div>
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionTitle 
        subtitle="Komitmen kami untuk memberikan layanan terbaik dan profesional dengan pendekatan inovatif"
      >
        Visi dan Misi
      </SectionTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Visi */}
        <div className="group transform hover:scale-[1.03] transition-all duration-500">
          <div className="bg-gradient-to-br from-teal-50/80 to-cyan-50/80 backdrop-blur-sm rounded-3xl p-10 sm:p-12 md:p-14 border border-teal-200/50 transition-all duration-700 hover:shadow-2xl hover:border-teal-300/70 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
            
            <div className="flex items-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Visi</h3>
            </div>
            
            <ul className="space-y-8">
              {[
                "Menjadi lembaga layanan yang kredibel, independen, dan obyektif serta diterima pasar nasional.",
                "Mewujudkan eksistensi dan konsistensi perusahaan secara berkelanjutan di dalam sertifikasi pengelolaan dan legalitas badan usaha.",
                "Menjadi badan layanan yang bergerak di bidang jasa usaha yang handal, profesional, bertanggung jawab dan memberikan hasil yang berdaya guna."
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-4 group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: `${index * 100}ms`}}>
                  <div className={`w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mt-3 shadow-sm`} 
                       style={{animationDelay: `${index * 0.5}s`}}>
                    <div className="w-full h-full rounded-full animate-ping opacity-40"></div>
                  </div>
                  <span className="text-slate-700 leading-relaxed text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Misi */}
        <div className="group transform hover:scale-[1.03] transition-all duration-500">
          <div className="bg-gradient-to-br from-cyan-50/80 to-blue-50/80 backdrop-blur-sm rounded-3xl p-10 sm:p-12 md:p-14 border border-cyan-200/50 transition-all duration-700 hover:shadow-2xl hover:border-cyan-300/70 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
            
            <div className="flex items-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Misi</h3>
            </div>
            
            <ul className="space-y-8">
              {[
                "Memberikan jasa layanan terbaik, efektif, dan optimal.",
                "Memberikan jasa verifikasi legalitas badan usaha di bidang jasa konsultan yang mengutamakan kecepatan dan ketepatan dengan mengedepankan profesionalisme.",
                "Menjadi penyedia jasa layanan yang diakui karena kualitas layanan yang konsisten dan kepuasan pelanggan yang tinggi."
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-4 group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: `${index * 100}ms`}}>
                  <div className={`w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-3 shadow-sm`} 
                       style={{animationDelay: `${index * 0.5}s`}}>
                    <div className="w-full h-full rounded-full animate-ping opacity-40"></div>
                  </div>
                  <span className="text-slate-700 leading-relaxed text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Komponen Layanan dengan desain futuristik
const ServiceCard = ({ icon, title, index }) => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-lg border border-white/60 transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 transform hover:border-teal-300/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-cyan-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="text-center space-y-6 relative z-10">
      <div className="relative inline-block">
        <div className="absolute -inset-4 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
        <div className="relative bg-gradient-to-r from-teal-100/50 to-cyan-100/50 rounded-2xl p-6 group-hover:scale-110 transition-transform duration-500">
          <img 
            src={icon} 
            alt={title} 
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto transition-all duration-500 group-hover:scale-110 filter group-hover:brightness-110" 
          />
        </div>
      </div>
      
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
        {title}
      </h3>
      
      <div className="w-0 group-hover:w-16 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full transition-all duration-700 shadow-sm"></div>
    </div>
  </div>
);

const Services = () => {
  const services = [
    { icon: '/images/certificate (1).png', title: 'Sertifikat Badan Usaha (SBU)' },
    { icon: '/images/certificate.png', title: 'Sertifikat Keahlian Kerja (SKK)' },
    { icon: '/images/medal.png', title: 'Legalitas dan Izin Usaha' },
    { icon: '/images/training-course.png', title: 'Pelatihan' },
    { icon: '/images/protecting.png', title: 'Pembetulan Data OSS' },
    { icon: '/images/medical-certificate.png', title: 'Sertifikat Kompetensi Bidang K3 - BNSP' },
    { icon: '/images/training-course.png', title: 'Sertifikasi Kelistrikan - DJK BNSP' },
    { icon: '/images/certificate (1).png', title: 'Sertifikasi Ketenagakerjaan' },
    { icon: '/images/online-learning.png', title: 'Sertifikasi Alat Disnaker' },
    { icon: '/images/diploma.png', title: 'Sertifikasi ISO-KAN dan BSN' },
    { icon: '/images/folder (1).png', title: 'Penyusuan Dokumen SMAP' },
    { icon: '/images/box.png', title: 'Merchandise' }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-slate-900 via-teal-900/90 to-cyan-900/90 relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse-slow"></div>
        
        {/* Advanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 30px 30px, rgba(20, 184, 166, 0.1) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 120px 120px',
            animation: 'grid-move 30s linear infinite'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-blue-400/20 backdrop-blur-sm border border-teal-300/30 rounded-full text-sm font-medium text-teal-200 shadow-lg">
            <Zap className="w-4 h-4 inline mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent leading-tight mb-6 animate-gradient-x">
            Layanan Profesional Kami
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            Solusi lengkap untuk semua kebutuhan sertifikasi dan legalitas perusahaan Anda dengan teknologi terdepan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }} 
              className="animate-fade-in-up"
            >
              <ServiceCard icon={service.icon} title={service.title} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Komponen Struktur Organisasi dengan desain modern
const ProfileCard = ({ name, position, email, phone }) => (
  <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 border border-white/50 hover:border-teal-200/60 relative">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-cyan-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="p-8 sm:p-10 relative z-10">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
          <div className="w-24 h-24 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg relative">
            <User className="w-12 h-12 text-white" />
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-3xl animate-ping opacity-0 group-hover:opacity-100"></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
            {name}
          </h3>
          <p className="text-lg sm:text-xl font-semibold text-teal-600 group-hover:text-cyan-600 transition-colors duration-300">
            {position}
          </p>
        </div>
        
        <div className="space-y-4 text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
          <div className="flex items-center justify-center space-x-3 p-3 bg-slate-50/80 rounded-2xl group-hover:bg-teal-50/80 transition-colors duration-300">
            <Mail className="w-5 h-5 text-teal-500" />
            <span className="break-all text-sm">{email}</span>
          </div>
          <div className="flex items-center justify-center space-x-3 p-3 bg-slate-50/80 rounded-2xl group-hover:bg-cyan-50/80 transition-colors duration-300">
            <Phone className="w-5 h-5 text-cyan-500" />
            <span className="text-sm">{phone}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DivisionSection = ({ title, members }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-10">
      <button
        className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-500 hover:via-cyan-500 hover:to-blue-500 text-white py-6 sm:py-8 px-8 sm:px-12 rounded-3xl shadow-xl text-left flex justify-between items-center transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="text-xl sm:text-2xl font-bold relative z-10">{title}</span>
        <div className="transition-transform duration-500 relative z-10" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
          <ChevronDown className="w-8 h-8" />
        </div>
      </button>
      
      <div className={`mt-8 transition-all duration-700 ${isOpen ? 'opacity-100 max-h-none transform translate-y-0' : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-4'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {members.map((member, index) => (
            <div 
              key={index} 
              style={{
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.1}s`
              }} 
              className={`transform transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <ProfileCard {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrganizationStructure = () => {
  const structure = {
    direkturUtama: {
      name: "Muhammad Fauzi, S.T.",
      position: "Direktur Utama",
      email: "example@example.com",
      phone: "+62 812-3456-7890"
    },
    generalManager: {
      name: "Ir. Ikdam Nurul Khalik, S.T, M. Ling.",
      position: "General Manager",
      email: "example@example.com",
      phone: "+62 812-3456-7891"
    },
    divisions: [
      {
        name: "Divisi Teknis",
        members: [
          { name: "Ferry Pratama, S.T.", position: "Kepala Divisi Konstruksi", email: "andi@example.com", phone: "+62 812-3456-7892" },
          { name: "Berma Septiyanda, S.T.", position: "Staff Konstruksi", email: "budi@example.com", phone: "+62 812-3456-7893" },
          { name: "Dedi Himawan, S.T.", position: "Staff Konstruksi", email: "budi@example.com", phone: "+62 812-3456-7893" }
        ]
      },
      {
        name: "Divisi Keuangan",
        members: [
          { name: "Dini Awaliah, S.T.", position: "Kepala Divisi Non-Konstruksi", email: "citra@example.com", phone: "+62 812-3456-7894" },
        ]
      },
      {
        name: "Divisi Pemasaran",
        members: [
          { name: "Ir. Novan Anugrah, S.T.", position: "Kepala Divisi Pemasaran", email: "novan@example.com", phone: "+62 812-3456-7896" },
          { name: "Ir. Sri Widyawati, S.T.", position: "Staff Pemasaran", email: "rini@example.com", phone: "+62 812-3456-7897" }
        ]
      },
      {
        name: "Divisi Operasional Umum",
        members: [
          { name: "Juliani Okta Farida, S.Kom.", position: "Kepala Divisi Operasional Umum", email: "yuda@example.com", phone: "+62 812-3456-7898" },
          { name: "Leissa Effendy, S.P.", position: "Staff Operasional", email: "wina@example.com", phone: "+62 812-3456-7899" }
        ]
      }
    ]
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/40 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-teal-100/30 to-cyan-100/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-cyan-100/30 to-blue-100/30 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle 
          subtitle="Tim profesional yang berpengalaman dan berdedikasi tinggi untuk memberikan pelayanan terbaik"
        >
          Struktur Organisasi
        </SectionTitle>

        {/* Leadership Section */}
        <div className="mb-20">
          <h3 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-16">
            Pimpinan
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="transform transition-all duration-700 hover:scale-105">
              <ProfileCard {...structure.direkturUtama} />
            </div>
            <div className="transform transition-all duration-700 hover:scale-105" style={{animationDelay: '0.2s'}}>
              <ProfileCard {...structure.generalManager} />
            </div>
          </div>
        </div>

        {/* Divisions Section */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-16">
            Divisi
          </h3>
          
          {structure.divisions.map((division, index) => (
            <div key={index} style={{animationDelay: `${index * 0.2}s`}} className="animate-fade-in-up">
              <DivisionSection title={division.name} members={division.members} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom CSS untuk animasi
const customStyles = `
  @keyframes gradient-x {
    0%, 100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(-5deg); }
  }

  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes grid-move {
    0% { background-position: 0 0, 0 0, 0 0; }
    100% { background-position: 60px 60px, 60px 60px, 120px 120px; }
  }

  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  @keyframes scroll-dot {
    0% { opacity: 1; transform: translateY(0); }
    50% { opacity: 0.3; }
    100% { opacity: 1; transform: translateY(10px); }
  }

  .animate-gradient-x { animation: gradient-x 8s ease infinite; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
  .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
  .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
  .animate-spin-slow { animation: spin-slow 8s linear infinite; }
  .animate-spin-reverse { animation: spin-reverse 10s linear infinite; }
  .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
  .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
  .animate-scroll-dot { animation: scroll-dot 2s ease-in-out infinite; }

  .shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
`;

// Komponen Utama dengan style injection
const OrganizationPage = () => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30">
      <NavbarView/>
      <Header />
      <History />
      <VisionMission />
      <Services />
      <OrganizationStructure />
      <Footer />
    </div>
  );
};

export default OrganizationPage;