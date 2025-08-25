"use client";

import { useState, useEffect } from "react";
import { fetchNews } from "./controller"; // ambil dari controller

export const useNewsPageHandler = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const newsPerPage = 6;

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const { data, error } = await fetchNews();
    if (!error) {
      setNews(data);
      setFilteredNews(data);
    }
  };

  useEffect(() => {
    let filtered = news;

    // 🔎 filter pencarian
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.caption.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [searchQuery, news]);

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const currentNews = filteredNews.slice(
    (currentPage - 1) * newsPerPage,
    currentPage * newsPerPage
  );

  // 📰 optional: ambil berita terbaru (misal dijadikan featured)
  const featuredNews = news.slice(0, 3);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // 🎨 fungsi untuk menentukan warna kategori
  const getCategoryColor = (category) => {
    switch (category) {
      case "Konstruksi":
        return "bg-blue-500 text-white";
      case "Non-Konstruksi":
        return "bg-green-500 text-white";
      case "Umum":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return {
    featuredNews,
    searchQuery,
    setSearchQuery,
    currentNews,
    formatDate,
    getCategoryColor, // 👈 jangan lupa direturn
    currentPage,
    setCurrentPage,
    totalPages,
  };
};
