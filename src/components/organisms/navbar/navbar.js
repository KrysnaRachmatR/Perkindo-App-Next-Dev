"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavbarController } from "./handler";

// Custom Icons
const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const NewsIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LoginIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);

const NavbarView = () => {
  const {
    scroll,
    isMenuOpen,
    isDropdownOpen,
    fade,
    pathname,
    dropdownRef,
    isSpecialPage,
    toggleMenu,
    toggleDropdown,
    handleMouseEnter,
    handleMouseLeave,
    getLinkClassName,
  } = useNavbarController();

  return (
    <nav
      className={`${
        scroll 
          ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50" 
          : "bg-transparent"
      } fixed w-full z-30 top-0 left-0 transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="PERKINDO Logo"
                  className="h-12 w-12 md:h-16 md:w-16 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"></div>
              </div>
              <div className="flex flex-col ml-3 md:ml-4">
                <span className={`${
                  scroll ? "text-gray-800" : "text-white"
                } font-bold text-xl md:text-2xl tracking-wider transition-colors duration-300`}>
                  PERKINDO
                </span>
                <p className={`${
                  scroll ? "text-gray-600" : "text-white/90"
                } text-xs md:text-sm font-medium transition-colors duration-300`}>
                  Persatuan Konsultan Indonesia
                </p>
                <p className={`${
                  scroll ? "text-gray-500" : "text-white/80"
                } text-xs transition-colors duration-300`}>
                  Provinsi Kalimantan Barat
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink href="/" pathname={pathname} scroll={scroll}>
              Beranda
            </NavLink>
            <NavLink href="/profile" pathname={pathname} scroll={scroll}>
              Profil
            </NavLink>
            <NavLink href="/gallery" pathname={pathname} scroll={scroll}>
              Galeri
            </NavLink>

            {/* Enhanced Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`${
                scroll 
                  ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              } flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105`}>
                <span>Berita</span>
                <div className="ml-2 transition-transform duration-300">
                  {isDropdownOpen ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              {isDropdownOpen && (
                <div className={`absolute left-0 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 border border-gray-200/50 transition-all duration-300 transform ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
                style={{ top: "calc(100% + 12px)" }}>
                  {/* Arrow */}
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-white/95 backdrop-blur-xl rotate-45 border-l border-t border-gray-200/50 rounded-tl"></div>
                  
                  <div className="p-3">
                    <DropdownItem href="/news" icon={<NewsIcon />}>
                      <div>
                        <div className="font-medium text-gray-800">Berita</div>
                        <div className="text-xs text-gray-500">Berita terkini dan update</div>
                      </div>
                    </DropdownItem>
                    <DropdownItem href="/agenda" icon={<CalendarIcon />}>
                      <div>
                        <div className="font-medium text-gray-800">Agenda</div>
                        <div className="text-xs text-gray-500">Jadwal kegiatan dan acara</div>
                      </div>
                    </DropdownItem>
                  </div>
                </div>
              )}
            </div>

            <NavLink href="/layanan" pathname={pathname} scroll={scroll}>
              Layanan
            </NavLink>
            <NavLink href="/members" pathname={pathname} scroll={scroll}>
              Anggota
            </NavLink>
            <NavLink href="/contact" pathname={pathname} scroll={scroll}>
              Kontak
            </NavLink>
            
            {/* Enhanced Login Button */}
            <a
              href={pathname === "/login" ? "/logout" : "/login"}
              className="ml-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <LoginIcon className="w-4 h-4" />
              {pathname === "/login" ? "Logout" : "Login"}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className={`${
                scroll ? "text-gray-700" : "text-white"
              } p-2 rounded-xl hover:bg-black/10 transition-all duration-300 transform hover:scale-110 focus:outline-none`}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200/50 mx-4 my-2 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              <MobileNavLink href="/">
                Beranda
              </MobileNavLink>
              <MobileNavLink href="/profile">
                Profil
              </MobileNavLink>
              <MobileNavLink href="/gallery">
                Galeri
              </MobileNavLink>
              
              {/* Mobile Berita Section */}
              <div className="py-2">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                  Berita
                </div>
                <MobileNavLink href="/news" className="pl-6">
                  <NewsIcon className="w-4 h-4 mr-2" />
                  Berita
                </MobileNavLink>
                <MobileNavLink href="/agenda" className="pl-6">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Agenda
                </MobileNavLink>
              </div>
              
              <MobileNavLink href="/layanan">
                Layanan
              </MobileNavLink>
              <MobileNavLink href="/members">
                Anggota
              </MobileNavLink>
              <MobileNavLink href="/contact">
                Kontak
              </MobileNavLink>
              
              <div className="pt-3">
                <a
                  href={pathname === "/login" ? "/logout" : "/login"}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 block text-center px-4 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  <LoginIcon className="w-4 h-4" />
                  {pathname === "/login" ? "Logout" : "Login"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Components
const NavLink = ({ href, pathname, scroll, children }) => {
  const isActive = pathname === href;
  return (
    <a
      href={href}
      className={`${
        isActive
          ? scroll
            ? "text-blue-600 bg-blue-50"
            : "text-blue-200 bg-white/10"
          : scroll
            ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            : "text-white hover:text-blue-200 hover:bg-white/10"
      } px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105`}
    >
      {children}
    </a>
  );
};

const DropdownItem = ({ href, icon, children }) => (
  <a
    href={href}
    className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
  >
    <div className="text-blue-600 mr-3 group-hover:scale-110 transition-transform duration-200">
      {icon}
    </div>
    {children}
  </a>
);

const MobileNavLink = ({ href, children, className = "" }) => (
  <a
    href={href}
    className={`text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-xl font-medium transition-all duration-200 flex items-center ${className}`}
  >
    {children}
  </a>
);

export default NavbarView;