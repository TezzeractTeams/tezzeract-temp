import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      {/* Top Section - Blue Gradient */}
      <div className="bg-gradient-to-r from-[#00A9EE] to-[#00378A] pt-20 ">
        <div className=" w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Logo + Copyright */}
          <div className="flex flex-row items-center gap-8 pr-10">
            <Image
              src="/assets/TezzeractSquare.svg"
              alt="Tezzeract Logo"
              width={60}
              height={60}
              className="w-auto h-12"
            />
            <p className="text-white/80 text-sm">
              © Copyright 2024. Tezzeract Pvt Ltd. Studio.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Column 2 - Legal */}
          <div className="flex flex-col gap-3 items-end text-right">
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
          <div className="flex flex-col gap-3 items-end text-right">
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
          <div className="flex flex-col gap-3 items-end text-right">
            <h4 className="text-white/60 text-sm font-medium mb-2">Pages</h4>
            <div className="grid grid-cols-2 gap-3 items-end ">
              <a
                href="#teams"
                className="text-white hover:text-white/80 transition-colors"
              >
                Teams
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
      <div className=" flex pt-20 h-fullitems-center justify-center overflow-hidden">
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
