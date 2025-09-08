"use client";
import { useState, useEffect } from "react";
// import Button from "../atoms/Button";
import Button from "../atoms/Buttons";
import { ArrowRightIcon } from "../atoms/Icons/ArrowRightIcon";

const backgroundImages = ["/images/konstruksi.jpg", "/images/konstruksi2.jpg", "/images/konstruksi3.jpg"];

export default function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-screen w-full">
        {backgroundImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              idx === imageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30"></div>

        <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl space-y-6 animate-fade-in">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Persatuan Konsultan Indonesia <br />
              <span className="text-blue-300">Kalimantan Barat</span>
            </h1>
            <div className="bg-white/10 backdrop-blur-lg border-l-4 border-blue-400 rounded-2xl p-6 shadow-2xl">
              <p className="text-white text-lg md:text-xl font-light leading-relaxed">
                Asosiasi Perusahaan Konsultan Perencana dan Pengawas
              </p>
            </div>
            <Button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-medium text-lg hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3">
              Selengkapnya <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
