"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const useNavbarController = () => {
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const isSpecialPage = ["/contact", "/layanan", "/agenda", "/news"].includes(pathname);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleDropdown = () => {
    setFade(!isDropdownOpen);
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setFade(true);
    setIsDropdownOpen(true);
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    setFade(false);
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
    setHideTimeout(timeout);
  };

  const getLinkClassName = (path) =>
    `text-white hover:bg-white hover:text-black rounded-lg px-3 py-2 ${
      pathname === path ? "border-b-2 border-yellow-500" : ""
    }`;

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFade(false);
        setTimeout(() => setIsDropdownOpen(false), 100);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [hideTimeout]);

  return {
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
  };
};
