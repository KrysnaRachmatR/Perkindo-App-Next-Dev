"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarView from "@/components/organisms/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import { BASE_URL } from "@/utils/constant";

// Mock data - replace with your actual data fetching
const mockNews = [
  {
    id: 1,
    title: "Perkindo Kalbar Luncurkan Program Pemberdayaan UMKM Konstruksi",
    excerpt: "Program baru ini bertujuan untuk meningkatkan kapasitas dan daya saing usaha mikro, kecil, dan menengah di sektor konstruksi Kalimantan Barat...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    image: "/images/news1.jpg",
    category: "Program",
    author: "Admin Perkindo",
    date: "2024-03-15",
    readTime: "5 menit",
    tags: ["UMKM", "Konstruksi", "Pemberdayaan"],
    featured: true
  },
  {
    id: 2,
    title: "Seminar Nasional Teknologi Konstruksi Modern di Era Digital",
    excerpt: "Perkindo Kalbar menggelar seminar nasional tentang implementasi teknologi modern dalam industri konstruksi...",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    image: "/images/news2.jpg",
    category: "Acara",
    author: "Tim Editorial",
    date: "2024-03-12",
    readTime: "3 menit",
    tags: ["Seminar", "Teknologi", "Digital"],
    featured: false
  },
  {
    id: 3,
    title: "Kerjasama Strategis dengan Pemerintah Daerah untuk Infrastruktur",
    excerpt: "Penandatanganan MoU antara Perkindo Kalbar dengan Pemerintah Provinsi untuk pengembangan infrastruktur berkelanjutan...",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
    image: "/images/news3.jpg",
    category: "Kerjasama",
    author: "Redaksi",
    date: "2024-03-10",
    readTime: "4 menit",
    tags: ["Kerjasama", "Infrastruktur", "Pemerintah"],
    featured: false
  },
  {
    id: 4,
    title: "Workshop Sertifikasi Kompetensi Tenaga Kerja Konstruksi",
    excerpt: "Pelatihan intensif untuk meningkatkan kompetensi dan sertifikasi tenaga kerja di bidang konstruksi...",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui...",
    image: "/images/news4.jpg",
    category: "Pelatihan",
    author: "Tim Pelatihan",
    date: "2024-03-08",
    readTime: "6 menit",
    tags: ["Workshop", "Sertifikasi", "Tenaga Kerja"],
    featured: false
  },
  {
    id: 5,
    title: "Inovasi Green Building dalam Proyek Konstruksi Berkelanjutan",
    excerpt: "Tren konstruksi ramah lingkungan semakin berkembang dengan penerapan konsep green building di berbagai proyek...",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem...",
    image: "/images/news5.jpg",
    category: "Inovasi",
    author: "Tim Riset",
    date: "2024-03-05",
    readTime: "7 menit",
    tags: ["Green Building", "Berkelanjutan", "Inovasi"],
    featured: true
  }
];

const categories = ["Semua", "Program", "Acara", "Kerjasama", "Pelatihan", "Inovasi"];

export default function News() {
  const [news, setNews] = useState(mockNews);
  const [filteredNews, setFilteredNews] = useState(mockNews);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const newsPerPage = 6;

  // Filter news based on category and search
  useEffect(() => {
    let filtered = news;
    
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, news]);

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const currentNews = filteredNews.slice(
    (currentPage - 1) * newsPerPage,
    currentPage * newsPerPage
  );

  const featuredNews = news.filter(item => item.featured);
  const regularNews = currentNews.filter(item => !item.featured);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Program: "bg-blue-100 text-blue-800",
      Acara: "bg-green-100 text-green-800",
      Kerjasama: "bg-purple-100 text-purple-800",
      Pelatihan: "bg-orange-100 text-orange-800",
      Inovasi: "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <NavbarView />
      
      {/* Hero Section */}
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

      <div className="container mx-auto px-4 py-16">
        
        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-slate-800">Berita Utama</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredNews.slice(0, 2).map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        FEATURED
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {item.author}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.readTime}
                          </span>
                        </div>
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white shadow-lg transform scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-slate-600">Memuat berita...</p>
          </div>
        ) : currentNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentNews.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{formatDate(item.date)}</span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.readTime}
                      </span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v8m-2-4h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  currentPage === page
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white shadow-md hover:shadow-lg"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Berlangganan Newsletter</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Dapatkan berita terbaru dan informasi penting langsung di email Anda
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200">
              Berlangganan
            </button>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}