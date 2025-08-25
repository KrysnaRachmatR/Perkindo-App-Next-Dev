"use client";

import { useState } from "react";
import NavbarView from "@/components/organisms/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import HeroNews from "@/components/organisms/news/HeroNews";
import FeaturedNews from "@/components/organisms/news/FeaturedNews";
import NewsFilter from "@/components/organisms/news/NewsFilter";
import NewsGrid from "@/components/organisms/news/NewsGrid";
import Pagination from "@/components/organisms/news/Pagination";
// import NewsletterBox from "@/components/organisms/news/NewsletterBox";
import NewsModal from "@/components/organisms/news/NewsModal";

import { useNewsPageHandler } from "./handler";

export default function News() {
  const {
    featuredNews,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    currentNews,
    formatDate,
    getCategoryColor,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useNewsPageHandler();

  // state untuk modal
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <>
      <NavbarView />
      <HeroNews />
      <div className="container mx-auto px-4 py-16">
        <FeaturedNews
          featuredNews={featuredNews}
          getCategoryColor={getCategoryColor}
          formatDate={formatDate}
          onSelect={setSelectedNews} // kasih handler ke FeaturedNews
        />
        <NewsFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <NewsGrid
          currentNews={currentNews}
          formatDate={formatDate}
          getCategoryColor={getCategoryColor}
          onSelect={setSelectedNews} // kasih handler ke NewsGrid
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        {/* <NewsletterBox /> */}
      </div>
      <Footer />

      {/* Modal detail berita */}
      <NewsModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
        formatDate={formatDate}
        getCategoryColor={getCategoryColor}
      />
    </>
  );
}
