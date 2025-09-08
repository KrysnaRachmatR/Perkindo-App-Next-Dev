"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/templates/DefaultUserTemplate";
// import UndanganMasukView from "@/views/undangan/UndanganMasukView";
import UndanganMasukView from "@/components/organisms/User/Rapat/Rapat";
// import { fetchUndanganController } from "@/controllers/undangan/undanganController";
import { fetchUndanganController } from "@/components/organisms/User/Rapat/RapatController";

export default function Page() {
  const [rapats, setRapats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUndanganController();
        setRapats(data);
      } catch (error) {
        console.error("Gagal memuat undangan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Memuat undangan...</p>;

  return (
    <DefaultLayout>
      <UndanganMasukView rapats={rapats} />
    </DefaultLayout>
  );
}
