"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
// import ClickOutside from "./ClickOutside"; // Uncomment kalau file tersedia

import {
  LayoutDashboard,
  CheckCircle,
  FileCheck,
  Hammer,
  Layers,
  User,
  Banknote,
  Home,
  CalendarDays,
  ImageIcon,
  IdCard,
  Newspaper,
  Headset,
  LogOutIcon,
  X,
} from "lucide-react";

const menuGroups = [
  {
    name: "DATA",
    menuItems: [
      {
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: "Dashboard",
        route: "/admin",
      },
      {
        icon: <CheckCircle className="w-5 h-5" />,
        label: "Validasi KTA",
        route: "/admin/validasi-reg-kta",
      },
      {
        icon: <FileCheck className="w-5 h-5" />,
        label: "Validasi SBU",
        children: [
          {
            label: "Konstruksi",
            route: "/admin/validasi-reg-konstruksi",
          },
          {
            label: "Non Konstruksi",
            route: "/admin/anggota/validasi-reg/reg-sbu-non-konstruksi",
          },
        ],
      },
      {
        icon: <Layers className="w-5 h-5" />,
        label: "Klasifikasi",
        children: [
          {
            label: "Konstruksi",
            route: "/admin/anggota/klasifikasiKonstruksi",
          },
          {
            label: "Non Konstruksi",
            route: "/admin/anggota/klasifikasiNonKonstruksi",
          },
        ],
      },
      {
        icon: <User className="w-5 h-5" />,
        label: "Detail User",
        route: "/admin/anggota/detailUser",
      },
      {
        icon: <Banknote className="w-5 h-5" />,
        label: "Rekening",
        route: "/admin/content/rekening",
      },
    ],
  },
  {
    name: "KONTEN",
    menuItems: [
      {
        icon: <CalendarDays className="w-5 h-5" />,
        label: "Agenda",
        route: "/admin/agenda",
      },
      {
        icon: <ImageIcon className="w-5 h-5" />,
        label: "Galeri",
        route: "/admin/galeri",
      },
      {
        icon: <IdCard className="w-5 h-5" />,
        label: "Profil",
        route: "/admin/profil",
      },
      {
        icon: <Newspaper className="w-5 h-5" />,
        label: "Berita",
        route: "/admin/berita",
      },
      {
        icon: <Hammer className="w-5 h-5" />,
        label: "Rapat",
        route: "/admin/rapat",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [pageName, setPageName] = useState("dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const storedPage = localStorage.getItem("selectedMenu");
    if (storedPage) setPageName(storedPage);
  }, []);

  useEffect(() => {
    if (pageName) localStorage.setItem("selectedMenu", pageName);
  }, [pageName]);

  // Auto-expand dropdown if current page is inside it
  useEffect(() => {
    // Find which menu item contains the current pathname
    menuGroups.forEach(group => {
      group.menuItems.forEach(item => {
        if (item.children) {
          const hasActiveChild = item.children.some(child => child.route === pathname);
          if (hasActiveChild) {
            setPageName(item.label.toLowerCase());
          }
        } else if (item.route === pathname) {
          setPageName(item.label.toLowerCase());
        }
      });
    });
  }, [pathname]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.pathname = "/";
  };

  const AsideWrapper = ({ children }) => {
    // Ganti ClickOutside dengan wrapper div kalau tidak tersedia
    return <div onClick={() => setSidebarOpen(false)}>{children}</div>;
  };

  return (
    <AsideWrapper>
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-80 flex flex-col bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200/60 dark:border-slate-700/60 backdrop-blur-xl transition-all duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header dengan gradient accent */}
        <div className="relative">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
          
          {/* Header Content */}
          <div className="relative flex items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                  <Image
                    width={32}
                    height={32}
                    src="/images/logo.png"
                    alt="Logo"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform">
                  SIMPERKINDO
                </span>
                <span className="text-xs text-blue-100/80 font-medium">
                  Admin Dashboard
                </span>
              </div>
            </Link>
            
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Items dengan improved styling */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <nav className="space-y-8">
            {menuGroups.map((group, index) => (
              <div key={index} className="space-y-3">
                {/* Group Header dengan improved styling */}
                <div className="flex items-center gap-3 px-3">
                  <div className="h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600 flex-1"></div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                    {group.name}
                  </h4>
                  <div className="h-px bg-gradient-to-l from-slate-300 to-transparent dark:from-slate-600 flex-1"></div>
                </div>
                
                {/* Menu Items */}
                <ul className="space-y-1">
                  {group.menuItems.map((item, idx) => (
                    <SidebarItem
                      key={idx}
                      item={item}
                      pageName={pageName}
                      setPageName={setPageName}
                      currentPath={pathname}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Enhanced Logout Section */}
        <div className="p-4 border-t border-slate-200/60 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-800/50">
          <button
            onClick={onLogout}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-rose-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <LogOutIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            <span>Logout</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/5 to-cyan-400/5 rounded-full blur-xl"></div>
      </aside>
    </AsideWrapper>
  );
};

export default Sidebar;