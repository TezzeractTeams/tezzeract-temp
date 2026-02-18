"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, LayoutGroup } from "motion/react";
import { TezzeractButton } from "./ui/TezzeractButton";

// Navigation Links Data
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about-us", label: "About us" },

  { href: "/portfolio", label: "Portfolio" },
];

// MobileMenu component - moved outside to avoid creating during render
const MobileMenu = () => (
  <motion.div
    className="lg:hidden bg-white/80 backdrop-blur-xl rounded-2xl mt-2 py-4 px-6 shadow-md w-full" initial="hidden"
    animate="visible"
  >
    {navLinks.map((link, index) => (
      <motion.a
        key={link.href}
        href={link.href}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.05,
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="block text-[#0068B5] hover:text-[#00A9EE] transition-colors py-2"
      >
        {link.label}
      </motion.a>
    ))}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: navLinks.length * 0.05 + 0.2,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Link href="/get-started" className="block">
        <TezzeractButton className="mt-2 w-[150px]">
          Book a call
        </TezzeractButton>
      </Link>
    </motion.div>
  </motion.div>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
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

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1200);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  return (
    <>
      {/* Backdrop Overlay - Outside header to prevent affecting it */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-white/1 backdrop-blur-[30px] z-40 lg:hidden" />
        )}
      </AnimatePresence>

      <header className="absolute top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <AnimatePresence mode="sync">
          {!scrolled ? (
            <motion.nav
              key="fixed-header"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="pointer-events-auto w-full px-4 sm:px-6 lg:px-24 py-0 md:py-4 bg-transparent flex items-center justify-between h-[70px] md:h-[100px] lg:h-[120px] relative isolate"
            >
              {/* LOGO */}
              <div className="shrink-0">
                <Link href="/" className="block pl-3 sm:pl-0 w-[150px] md:w-[120%] lg:w-[180px]">
                  <Image
                    src="/tezzeractLogo.svg"
                    alt="Tezzeract Logo"
                    width={140}
                    height={40}
                    className="w-full h-auto"
                  />
                </Link>
              </div>

              {/* DESKTOP NAV */}
              <LayoutGroup id="fixed-nav-pill">
              <div
                className="hidden lg:flex items-center space-x-8 shrink min-w-0"
                onMouseLeave={() => setHoveredNav(null)}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredNav(link.href)}
                    className={`relative inline-block px-3 py-1.5 font-light transition-colors ${(mounted && isHome) || !mounted ? "text-white hover:text-white/80" : ""}`}
                  >
                    {hoveredNav === link.href && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10"
                        style={{
                          borderRadius: "9999px",
                          backgroundColor: (mounted && isHome) || !mounted ? "rgba(255,255,255,0.3)" : "rgba(0, 104, 181, 0.1)",
                        }}
                        transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                      />
                    )}
                    <span className={`relative inline-block ${(mounted && isHome) || !mounted ? "text-white" : "text-transparent"}`}
                      style={mounted && !isHome ? {
                        backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      } : {}}
                    >
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
              </LayoutGroup>

              {/* BUTTON */}
              <div className="hidden lg:block flex-shrink-0">
                <Link href="/get-started">
                  <TezzeractButton className="w-[180px] min-w-[140px]">
                    Get started
                  </TezzeractButton>
                </Link>
              </div>

              {/* MOBILE TOGGLE */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <motion.svg
                    className="h-6 w-6"
                    fill="none"
                    stroke={(mounted && isHome) || !mounted ? "currentColor" : "#0068B5"}
                    viewBox="0 0 24 24"
                    animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </motion.svg>
                </button>
              </div>

              {/* Mobile Menu Dropdown inside the nav context */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[95vw] lg:hidden z-[110]"
                  >
                    <MobileMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          ) : (
            <motion.nav
              key="floating-header"
              layoutRoot
              initial={{
                y: -100,
                opacity: 0,
                width: isMobile ? "98%" : isTablet ? "94%" : "56%",
                height: isMobile ? "80px" : "50px",
              }}
              animate={{
                y: 20,
                opacity: 1,
                width: isMobile ? "98%" : isTablet ? "94%" : "56%",
                height: isMobile ? "50px" : "50px",
              }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{
                backdropFilter: "blur(10px)",
                background: "radial-gradient(circle at 50% 900%, #FFFFFF 55%, rgba(255, 255, 255, 0.7) 80%)",
                boxShadow: "0 0 24px rgba(245, 245, 245, 0.06), 0 1px 1px rgba(238, 238, 238, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                borderRadius: "15px",
                left: 0,
                right: 0,
                margin: "0 auto",
                maxWidth: isMobile ? "none" : isTablet ? "none" : "57vw"
              }}
              className={`pointer-events-auto fixed flex justify-between items-center isolate ${isMobile ? "px-4 border border-white/10" : "px-4 sm:px-6 lg:px-[4px] border-2 border-white/25"}`}
            >
              {/* LOGO (Smaller) */}
              <motion.div
                className="flex-shrink-0 bg-red"
                initial={{ scale: 0.8 }}
                animate={{ scale: isMobile ? 0.7 : 0.6 }}
              >
                <Link href="/" className="block -ml-4 md:-ml-0 lg:-ml-0 w-full md:w-[120%] lg:w-[220px]">
                  <Image
                    src="/tezzeractLogo.svg"
                    alt="Tezzeract Logo"
                    width={140}
                    height={40}
                    className="w-full h-auto"
                  />
                </Link>
              </motion.div>

              {/* NAV LINKS (Gradient Text) */}
              <LayoutGroup id="floating-nav-pill">
              <div
                className="hidden lg:flex items-center space-x-4 xl:space-x-8 flex-shrink min-w-0"
                onMouseLeave={() => setHoveredNav(null)}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredNav(link.href)}
                    className="group font-normal relative inline-block px-3 py-1.5 transition-colors"
                  >
                    {hoveredNav === link.href && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10"
                        style={{
                          borderRadius: "9999px",
                          backgroundColor: "rgba(0, 104, 181, 0.1)",
                        }}
                        transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                      />
                    )}
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
              </LayoutGroup>

              {/* BUTTON (Smaller wrapper if needed, but keeping same for now or hiding if too small) */}
              <div className="hidden lg:block flex-shrink-0">
                <Link href="/get-started">
                  <TezzeractButton className="w-[110px] min-w-[110px]">
                    Get started
                  </TezzeractButton>
                </Link>
              </div>

              {/* MOBILE TOGGLE (Floating) */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <motion.svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="#0068B5"
                    viewBox="0 0 24 24"
                    animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </motion.svg>
                </button>
              </div>

              {/* Mobile Menu for Floating Header */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[95vw] md:w-[85vw] lg:hidden z-[110]"
                  >
                    <MobileMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
