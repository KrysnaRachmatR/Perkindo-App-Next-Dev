"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Custom Icons
const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.036.388a3.91 3.91 0 0 0-1.416.923A3.9 3.9 0 0 0 2.697 2.73c-.184.484-.306 1.058-.34 2.005C2.322 5.683 2.309 6.09 2.309 9.71v4.58c0 3.64.013 4.049.048 4.995.034.947.156 1.521.34 2.005a3.9 3.9 0 0 0 .923 1.417 3.91 3.91 0 0 0 1.416.922c.484.184 1.058.306 2.005.34.946.035 1.354.048 4.995.048s4.049-.013 4.995-.048c.947-.034 1.521-.156 2.005-.34a3.91 3.91 0 0 0 1.416-.922 3.9 3.9 0 0 0 .923-1.417c.184-.484.306-1.058.34-2.005.035-.946.048-1.354.048-4.995V9.71c0-3.64-.013-4.049-.048-4.995-.034-.947-.156-1.521-.34-2.005a3.9 3.9 0 0 0-.923-1.417A3.91 3.91 0 0 0 18.982 2.31c-.484-.184-1.058-.306-2.005-.34C16.031.013 15.624 0 12.017 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Footer = () => {
  const quickLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profile", label: "Profil" },
    { href: "/gallery", label: "Galeri" },
    { href: "/news", label: "Berita" },
    { href: "/agenda", label: "Agenda" },
    { href: "/layanan", label: "Layanan" },
    { href: "/members", label: "Anggota" },
    { href: "/contact", label: "Kontak" },
  ];

  const socialLinks = [
    {
      href: "https://facebook/perkindo_kalbar/.com",
      icon: <FacebookIcon />,
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      href: "https://www.instagram.com/perkindo_kalbar/",
      icon: <InstagramIcon />,
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      href: "https://linkedin/perkindo_kalbar/.com",
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center group">
                <div className="relative">
                  <Image
                    src="/images/logo.png"
                    alt="PERKINDO Logo"
                    width={80}
                    height={80}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
                    PERKINDO
                  </h1>
                  <p className="text-blue-200 text-sm font-medium">
                    Persatuan Konsultan Indonesia
                  </p>
                  <p className="text-blue-300 text-xs">
                    Provinsi Kalimantan Barat
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-sm">
                Organisasi profesional yang menghimpun para konsultan perencana dan pengawas konstruksi di Kalimantan Barat untuk memajukan industri konstruksi Indonesia.
              </p>

              <div className="pt-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Ikuti Kami
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white/10 backdrop-blur-lg hover:bg-white ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-white/20 text-white hover:text-white group`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                Tautan Cepat
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2"
                    >
                      <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="hover:text-blue-300 transition-colors duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                Informasi Kontak
              </h3>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <LocationIcon className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Alamat Kantor</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Jalan Alianyang Gg. Rahayu Ruko No. 21<br />
                        Sungai bangkong, Kalimantan Barat 78116
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Telepon</h4>
                      <p className="text-gray-300 text-sm">
                        BAPELDA - <a href="tel:082335424547" className="hover:text-blue-300 transition-colors duration-300">082335424547</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 PERKINDO Kalimantan Barat. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Persatuan Konsultan Indonesia Provinsi Kalimantan Barat
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-500/5 rounded-full blur-2xl"></div>
    </footer>
  );
};

export default Footer;