"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { TezzeractButton } from "./ui/TezzeractButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  return (
    <header className="fixed top-0  left-0 right-0 z-50 flex justify-center">
      <motion.nav
        animate={{
          width: scrolled ? "54%" : "100%",
          height: scrolled ? "50px" : "120px",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled
            ? "0 0 24px rgba(245, 245, 245, 0.06), 0 1px 1px rgba(238, 238, 238, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          y: scrolled ? 20 : 0,
          borderRadius: scrolled ? "15px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={`py-0 md:py-4 ${
          scrolled ? "px-4 sm:px-4 lg:px-3 border border-white/10" : "px-4 sm:px-6 lg:px-24"
        } ${
          scrolled ? "bg-white/10" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            animate={{
              scale: scrolled ? 0.6 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 50,
            }}
          >
            <Image
              src="/tezzeractLogo.png"
              alt="Tezzeract Logo"
              width={180}
              height={40}
              className="h-5 md:h-8 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation - Middle */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white hover:text-white/80 transition-colors font-light"
            >
              Home
            </a>
            <a
              href="#what-we-do"
              className="text-white hover:text-white/80 transition-colors font-light"
            >
              What we do
            </a>
            <a
              href="#teams"
              className="text-white hover:text-white/80 transition-colors font-light"
            >
              Teams
            </a>
            <a
              href="#projects"
              className="text-white hover:text-white/80 transition-colors font-light"
            >
              Projects
            </a>
          </div>

          {/* Desktop Book a Call Button - Right */}
          <div className="hidden md:block">
            <TezzeractButton className="w-[180px]">
              Book a call
            </TezzeractButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-600/95 backdrop-blur-sm rounded-lg mt-2 py-4 px-4 space-y-3">
            <a
              href="#home"
              className="block text-white hover:text-white/80 transition-colors py-2"
            >
              Home
            </a>
            <a
              href="#what-we-do"
              className="block text-white hover:text-white/80 transition-colors py-2"
            >
              What we do
            </a>
            <a
              href="#teams"
              className="block text-white hover:text-white/80 transition-colors py-2"
            >
              Teams
            </a>
            <a
              href="#projects"
              className="block text-white hover:text-white/80 transition-colors py-2"
            >
              Projects
            </a>
            <TezzeractButton fullWidth className="mt-2">
              Book a call
            </TezzeractButton>
          </div>
        )}
      </motion.nav>
    </header>
  );
}
