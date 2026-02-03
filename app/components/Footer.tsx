import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      {/* Top Section - Blue Gradient */}
      <div className="bg-gradient-to-r from-[#00A9EE] to-[#00378A] pt-20 md:pt-30">
        <div className="w-full px-6 md:w-[90%] lg:w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Column 1 - Logo + Copyright */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
            <Image
              src="/assets/TezzeractSquare.svg"
              alt="Tezzeract Logo"
              width={60}
              height={60}
              className="w-auto h-10 md:h-12"
            />
            <a className="text-white/80 text-md md:text-md text-left">
              © Copyright 2026. Tezzeract Pvt Ltd. Studio.
              <br />
              All rights reserved.
            </a>
          </div>

          {/* Column 2 - Legal */}
          <div className="flex flex-col gap-2 md:gap-3 items-end text-right">
            <h4 className="text-white/60 text-sm font-medium mb-2">Legal</h4>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors"
            >
              Terms & Conditions
            </a>
          </div>

          {/* Column 3 - Social Media */}
          <div className="flex flex-col gap-2 md:gap-3 items-start text-left lg:items-end lg:text-right">
            <h4 className="text-white/60 text-sm font-medium mb-2">
              Social Media
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                X
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Column 4 - Pages */}
          <div className="flex flex-col gap-2 md:gap-3 items-end text-right">
            <h4 className="text-white/60 text-sm font-medium mb-2">Pages</h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/about-us"
                className="text-white hover:text-white/80 transition-colors"
              >
                About us
              </a>
              <a
                href="#home"
                className="text-white hover:text-white/80 transition-colors"
              >
                Home
              </a>
              <a
                href="#projects"
                className="text-white hover:text-white/80 transition-colors"
              >
                Projects
              </a>
              <a
                href="#what-we-do"
                className="text-white hover:text-white/80 transition-colors"
              >
                What we do
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Watermark */}
        <div className="flex pt-12 md:pt-35  items-center justify-center opacity-10 overflow-hidden">
          <Image
            src="/assets/TezzeractLarge.svg"
            alt="Tezzeract"
            width={645}
            height={89}
            className="w-full"
          />
        </div>
      </div>
    </footer>
  );
}
