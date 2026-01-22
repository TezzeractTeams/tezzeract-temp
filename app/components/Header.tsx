"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TezzeractButton } from "./ui/TezzeractButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="max-full py-4  mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/tezzeractLogo.png"
              alt="Tezzeract Logo"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation - Middle */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#what-we-do"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              What we do
            </a>
            <a
              href="#teams"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Teams
            </a>
            <a
              href="#projects"
              className="text-white hover:text-white/80 transition-colors font-medium"
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
      </nav>
    </header>
  );
}
