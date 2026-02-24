"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "../context/CookieConsentContext";

export default function CookieConsent() {
  const { isBannerVisible, acceptCookies, rejectCookies } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isBannerVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    We use cookies
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking "Accept All", you consent to our use of cookies.{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-[#00A9EE] hover:text-[#00378A] underline transition-colors"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
                  {/* Decline Button */}
                  <button
                    onClick={rejectCookies}
                    className="px-6 py-2.5 md:py-3 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm md:text-base hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                  >
                    Decline
                  </button>

                  {/* Accept Button */}
                  <button
                    onClick={acceptCookies}
                    className="px-6 py-2.5 md:py-3 rounded-xl text-white font-medium text-sm md:text-base transition-all duration-300 ease-in-out whitespace-nowrap relative overflow-hidden"
                    style={{
                      background: "radial-gradient(64.46% 80% at 50.53% 0%, #009BE9 0%, #00378A 100%)",
                      boxShadow: "0 0 10px rgba(0, 169, 238, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 169, 238, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 169, 238, 0.3)";
                    }}
                  >
                    <span className="relative z-10">Accept All</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
