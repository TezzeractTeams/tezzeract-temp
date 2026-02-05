"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { TezzeractButton } from "./ui/TezzeractButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint for desktop/webview
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []); // Removed dependency on scrolled to avoid unnecessary re-renders

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const isTablet = windowWidth >= 768 && windowWidth < 1200;

  // Navigation Links Data
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about-us", label: "About us" },
    { href: "#projects", label: "Projects" },
  ];

  const MobileMenu = () => (
    <div className="md:hidden bg-blue-600/95 backdrop-blur-sm rounded-lg mt-2 py-4 px-4 space-y-3">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="block text-white hover:text-white/80 transition-colors py-2"
        >
          {link.label}
        </a>
      ))}
      <TezzeractButton fullWidth className="mt-2">
        Book a call
      </TezzeractButton>
    </div>
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <AnimatePresence mode="sync">
        {!scrolled ? (
          <motion.nav
            key="fixed-header"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="pointer-events-auto w-full px-4 sm:px-6 lg:px-24 py-0 md:py-4 bg-transparent flex items-center justify-between h-[120px]"
          >
            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link href="/" className="block w-[12%] md:w-[200%]">
                <Image
                  src="/tezzeractLogo.png"
                  alt="Tezzeract Logo"
                  width={140}
                  height={40}
                  className="w-full h-auto"
                />
              </Link>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-8 flex-shrink min-w-0">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative inline-block px-3 py-1.5 font-light transition-colors text-white hover:text-white/80"
                >
                  <span className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="relative inline-block text-white">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* BUTTON */}
            <div className="hidden md:block flex-shrink-0">
              <TezzeractButton className="w-[180px] min-w-[140px]">
                Book a call
              </TezzeractButton>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>

            {/* Mobile Menu Dropdown inside the nav context */}
            {mobileMenuOpen && (
              <div className="absolute top-[100%] left-4 right-4 md:hidden">
                <MobileMenu />
              </div>
            )}
          </motion.nav>
        ) : (
          <motion.nav
            key="floating-header"
            initial={{
              y: -100,
              opacity: 0,
              width: isMobile ? "95%" : isTablet ? "85%" : "54%",
              height: isMobile ? "80px" : "50px",
            }}
            animate={{
              y: 20,
              opacity: 1,
              width: isMobile ? "95%" : isTablet ? "85%" : "54%",
              height: isMobile ? "80px" : "50px",
            }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
              backdropFilter: "blur(10px)",
              background: "radial-gradient(circle at 50% 900%, #CBF0FF 55%, rgba(255, 255, 255, 0.7) 70%)",
              boxShadow: "0 0 24px rgba(245, 245, 245, 0.06), 0 1px 1px rgba(238, 238, 238, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
              borderRadius: "15px",
              left: 0,
              right: 0,
              margin: "0 auto"
            }}
            className={`pointer-events-auto fixed flex justify-between items-center ${isMobile ? "px-4 border border-white/10" : "px-4 sm:px-6 lg:px-3 border-2 border-white/25"}`}
          >
            {/* LOGO (Smaller) */}
            <motion.div
              className="flex-shrink-0"
              initial={{ scale: 0.8 }}
              animate={{ scale: isMobile ? 0.8 : 0.6 }}
            >
              <Link href="/" className="block w-[12%] md:w-[200%]">
                <Image
                  src="/tezzeractLogo.png"
                  alt="Tezzeract Logo"
                  width={140}
                  height={40}
                  className="w-full h-auto"
                />
              </Link>
            </motion.div>

            {/* NAV LINKS (Gradient Text) */}
            <div className="hidden md:flex items-center space-x-8 flex-shrink min-w-0">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative inline-block px-3 py-1.5 font-light transition-colors"
                >
                  <span className="relative inline-block text-transparent group-hover:opacity-80"
                    style={{
                      backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* BUTTON (Smaller wrapper if needed, but keeping same for now or hiding if too small) */}
            <div className="hidden md:block flex-shrink-0">
              <TezzeractButton className="w-[180px] min-w-[140px]">
                Book a call
              </TezzeractButton>
            </div>

            {/* MOBILE TOGGLE (Floating) */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="black" viewBox="0 0 24 24">
                  {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>

            {/* Mobile Menu for Floating Header */}
            {mobileMenuOpen && (
              <div className="absolute top-[110%] left-0 right-0 md:hidden">
                <MobileMenu />
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
