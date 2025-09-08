"use client";

import Image from "next/image";
import NavbarView from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
const ErrorIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
// Using simple icons instead of react-icons to avoid import issues
const EyeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
import { useProfileHandler } from "./profileHandler";
import { BASE_URL } from "@/utils/constant";

export default function Profile() {
  const { profileData, loading, error } = useProfileHandler();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <NavbarView />
        <div className="flex flex-col justify-center items-center py-20 px-4">
          <div className="w-full max-w-6xl space-y-8">
            {/* Header skeleton */}
            <div className="relative h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse transform -skew-x-12"></div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
        <NavbarView />
        <div className="flex flex-col justify-center items-center py-20 px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl max-w-md w-full">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BiErrorCircle className="text-red-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Terjadi Kesalahan</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => window.location.reload()}
            >
              <BiRefresh className="text-lg" />
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
        <NavbarView />
        <div className="flex flex-col justify-center items-center py-20 px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl max-w-md w-full">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BiErrorCircle className="text-yellow-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Tidak Ditemukan</h3>
            <p className="text-gray-600">Data profil tidak tersedia saat ini.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <NavbarView />

      {/* Hero Header Section */}
      <section className="relative">
        <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
          <Image
            src={`${profileData.header_image}`}
            alt="Header Image"
            layout="fill"
            objectFit="cover"
            priority
            className="transform hover:scale-105 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-4xl">
              <h1 className="text-white font-bold text-2xl md:text-4xl lg:text-6xl mb-6 leading-tight">
                {profileData.title || "Konten tidak tersedia."}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Floating Card */}
        <div className="relative -mt-24 mx-4 md:mx-8 lg:mx-16 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-white/20">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                  {profileData.section1 || "Konten tidak tersedia."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Visi & Misi
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Landasan fundamental yang mengarahkan setiap langkah perjalanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      <EyeIcon />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">VISI</h3>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed pl-6">
                    {profileData.visi || "Konten tidak tersedia."}
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      <TargetIcon />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">MISI</h3>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                  <div className="pl-6">
                    {profileData.misi && Array.isArray(profileData.misi) && profileData.misi.length > 0 ? (
                      <ul className="space-y-4">
                        {profileData.misi.map((item, index) => {
                          const cleanItem = item.replace(/"/g, "");
                          return (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                              <span className="text-gray-700 text-base md:text-lg leading-relaxed">
                                {cleanItem}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">Konten misi tidak tersedia.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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