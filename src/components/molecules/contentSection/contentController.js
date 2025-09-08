// components/content/ContentSectionController.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchBerita } from "./ContentService";
import { sortBeritaByDate } from "./ContentHandler";
import ContentSectionView from "./ContentSection";

const ContentSectionController = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchBerita();
        const sorted = sortBeritaByDate(data);
        setBerita(sorted);
      } catch (err) {
        console.error("Error fetching berita:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <ContentSectionView berita={berita} loading={loading} router={router} />
  );
};

export default ContentSectionController;
