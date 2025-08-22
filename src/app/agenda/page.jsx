"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarView from "@/components/organisms/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import { BASE_URL } from "@/utils/constant";

// Mock data - replace with your actual data fetching
const mockEvents = [
  {
    id: 1,
    title: "Seminar Nasional Konstruksi Berkelanjutan 2024",
    description: "Seminar nasional tentang inovasi dan teknologi terbaru dalam konstruksi berkelanjutan dengan pembicara ahli dari berbagai universitas dan industri terkemuka.",
    startDate: "2024-04-15",
    endDate: "2024-04-15",
    startTime: "08:00",
    endTime: "16:00",
    location: "Hotel Grand Mahkota Pontianak",
    address: "Jl. Sidas No.1, Pontianak, Kalimantan Barat",
    category: "Seminar",
    status: "upcoming",
    organizer: "Perkindo Kalbar",
    capacity: 200,
    registered: 145,
    price: "Gratis",
    image: "/images/event1.jpg",
    tags: ["Seminar", "Konstruksi", "Teknologi"],
    featured: true
  },
  {
    id: 2,
    title: "Workshop Manajemen Proyek Konstruksi",
    description: "Pelatihan intensif tentang manajemen proyek konstruksi modern dengan sertifikat profesional dari Perkindo Kalbar.",
    startDate: "2024-04-20",
    endDate: "2024-04-22",
    startTime: "09:00",
    endTime: "17:00",
    location: "Gedung Perkindo Kalbar",
    address: "Jl. Alianyang Gg. Rahayu Ruko No. 21, Sungai Bangkong",
    category: "Workshop",
    status: "upcoming",
    organizer: "Divisi Pelatihan Perkindo",
    capacity: 50,
    registered: 32,
    price: "Rp 500.000",
    image: "/images/event2.jpg",
    tags: ["Workshop", "Manajemen", "Sertifikasi"],
    featured: false
  },
  {
    id: 3,
    title: "Rapat Anggota Tahunan (RAT) 2024",
    description: "Rapat Anggota Tahunan Perkindo Kalimantan Barat untuk membahas laporan kegiatan dan program kerja tahun mendatang.",
    startDate: "2024-05-10",
    endDate: "2024-05-10",
    startTime: "10:00",
    endTime: "15:00",
    location: "Aston Pontianak Hotel",
    address: "Jl. Gajah Mada No.21, Pontianak",
    category: "Rapat",
    status: "upcoming",
    organizer: "Pengurus Pusat Perkindo Kalbar",
    capacity: 300,
    registered: 278,
    price: "Khusus Anggota",
    image: "/images/event3.jpg",
    tags: ["RAT", "Anggota", "Organisasi"],
    featured: true
  },
  {
    id: 4,
    title: "Expo Konstruksi Kalimantan Barat 2024",
    description: "Pameran konstruksi terbesar di Kalimantan Barat menampilkan produk, teknologi, dan layanan terdepan dalam industri konstruksi.",
    startDate: "2024-05-25",
    endDate: "2024-05-27",
    startTime: "10:00",
    endTime: "18:00",
    location: "Pontianak Convention Center",
    address: "Jl. Ahmad Yani II, Pontianak",
    category: "Expo",
    status: "upcoming",
    organizer: "Perkindo Kalbar & Partner",
    capacity: 1000,
    registered: 456,
    price: "Rp 25.000",
    image: "/images/event4.jpg",
    tags: ["Expo", "Pameran", "Teknologi"],
    featured: false
  },
  {
    id: 5,
    title: "Pelatihan K3 (Keselamatan dan Kesehatan Kerja)",
    description: "Program pelatihan K3 untuk tenaga kerja konstruksi dengan standar nasional dan internasional.",
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    startTime: "08:00",
    endTime: "16:00",
    location: "Training Center Perkindo",
    address: "Jl. Sultan Abdurrahman No.45, Pontianak",
    category: "Pelatihan",
    status: "completed",
    organizer: "Divisi K3 Perkindo",
    capacity: 75,
    registered: 75,
    price: "Rp 750.000",
    image: "/images/event5.jpg",
    tags: ["K3", "Pelatihan", "Keselamatan"],
    featured: false
  }
];

const categories = ["Semua", "Seminar", "Workshop", "Rapat", "Expo", "Pelatihan"];
const statusOptions = ["Semua", "upcoming", "ongoing", "completed"];

export default function Agenda() {
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  // Filter events
  useEffect(() => {
    let filtered = events;
    
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (selectedStatus !== "Semua") {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredEvents(filtered);
  }, [selectedCategory, selectedStatus, searchQuery, events]);

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // Format HH:MM
  };

  const getCategoryColor = (category) => {
    const colors = {
      Seminar: "bg-blue-100 text-blue-800 border-blue-200",
      Workshop: "bg-green-100 text-green-800 border-green-200",
      Rapat: "bg-purple-100 text-purple-800 border-purple-200",
      Expo: "bg-orange-100 text-orange-800 border-orange-200",
      Pelatihan: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-500 text-white",
      ongoing: "bg-green-500 text-white",
      completed: "bg-gray-500 text-white"
    };
    return colors[status] || "bg-gray-500 text-white";
  };

  const getStatusText = (status) => {
    const statusText = {
      upcoming: "Akan Datang",
      ongoing: "Berlangsung",
      completed: "Selesai"
    };
    return statusText[status] || status;
  };

  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming').slice(0, 3);
  const featuredEvents = filteredEvents.filter(event => event.featured);

  // Calendar functionality
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => 
        event.startDate <= dateString && event.endDate >= dateString
      );
      
      days.push({
        day,
        date: dateString,
        events: dayEvents,
        isToday: dateString === new Date().toISOString().split('T')[0]
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const getDayEvents = (dateString) => {
    return filteredEvents.filter(event => 
      event.startDate <= dateString && event.endDate >= dateString
    );
  };

  return (
    <>
      <NavbarView />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda & Event</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Ikuti berbagai kegiatan, seminar, dan event menarik dari Perkindo Kalimantan Barat
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">
              {events.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-blue-100">Event Mendatang</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">
              {events.filter(e => e.status === 'ongoing').length}
            </div>
            <div className="text-green-100">Sedang Berlangsung</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">
              {events.reduce((sum, e) => sum + e.registered, 0)}
            </div>
            <div className="text-purple-100">Total Peserta</div>
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-slate-800">Event Unggulan</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredEvents.slice(0, 2).map((event) => (
                <div key={event.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        FEATURED
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.startDate)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-slate-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {event.location}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        <span className="font-medium">{event.registered}</span>/{event.capacity} peserta
                      </div>
                      <Link 
                        href={`/agenda/${event.id}`}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Toggle and Filters */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            
            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 rounded-2xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-slate-800 shadow-md"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === "calendar"
                    ? "bg-white text-slate-800 shadow-md"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Kalender
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === "Semua" ? "Semua Status" : getStatusText(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Display */}
        {viewMode === "grid" ? (
          // Grid View
          <div>
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-slate-600">Memuat agenda...</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {getStatusText(event.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-slate-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(event.startDate)}
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatTime(event.startTime)} - {formatTime(event.endTime)} WIB
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {event.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-slate-500">Peserta: </span>
                          <span className="font-medium text-slate-700">{event.registered}/{event.capacity}</span>
                        </div>
                        <div className="text-sm font-medium text-purple-600">
                          {event.price}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <Link 
                          href={`/agenda/${event.id}`}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-center block"
                        >
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">Tidak ada agenda ditemukan</h3>
                <p className="text-slate-500">Coba ubah filter atau kata kunci pencarian.</p>
              </div>
            )}
          </div>
        ) : (
          // Calendar View
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <h2 className="text-2xl font-bold">
                  {selectedDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </h2>
                
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden">
                {/* Day Headers */}
                {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((day) => (
                  <div key={day} className="bg-slate-50 p-3 text-center text-sm font-medium text-slate-600">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {generateCalendar().map((day, index) => (
                  <div 
                    key={index} 
                    className={`bg-white p-2 min-h-[100px] ${
                      day ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''
                    } ${
                      day?.isToday ? 'bg-purple-50 border border-purple-200' : ''
                    }`}
                    onClick={() => day && setSelectedCalendarDate(day.date)}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${
                          day.isToday ? 'text-purple-600' : 'text-slate-700'
                        }`}>
                          {day.day}
                        </div>
                        <div className="space-y-1">
                          {day.events.slice(0, 2).map((event) => (
                            <div 
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded truncate ${getCategoryColor(event.category)}`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {day.events.length > 2 && (
                            <div className="text-xs text-slate-500 px-2">
                              +{day.events.length - 2} lainnya
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Selected Date Events */}
              {selectedCalendarDate && (
                <div className="mt-8 bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">
                      Event pada {formatDate(selectedCalendarDate)}
                    </h3>
                    <button
                      onClick={() => setSelectedCalendarDate(null)}
                      className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {getDayEvents(selectedCalendarDate).length > 0 ? (
                      getDayEvents(selectedCalendarDate).map((event) => (
                        <div key={event.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-800 flex-1">{event.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                              {getStatusText(event.status)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                            {event.description}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-500 mb-3">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatTime(event.startTime)} - {formatTime(event.endTime)} WIB
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {event.location}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                                {event.category}
                              </span>
                              <span className="text-sm text-slate-500">
                                {event.registered}/{event.capacity} peserta
                              </span>
                            </div>
                            <Link 
                              href={`/agenda/${event.id}`}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Detail
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>Tidak ada event pada tanggal ini</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upcoming Events Sidebar - Only show in grid view */}
        {viewMode === "grid" && upcomingEvents.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-slate-800">Event Mendatang</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {event.price}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.startDate)}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        <span className="font-medium">{event.registered}</span>/{event.capacity}
                      </div>
                      <Link 
                        href={`/agenda/${event.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Daftar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white rounded-3xl p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Jangan Lewatkan Event Menarik Kami
            </h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan profesional konstruksi lainnya dalam berbagai kegiatan edukatif dan networking yang bermanfaat untuk pengembangan karir Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/kontak"
                className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
              >
                Hubungi Kami
              </Link>
              <Link 
                href="/membership"
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 py-4 rounded-2xl font-bold transition-all duration-300 border border-white/20"
              >
                Jadi Anggota
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}