import React from "react";
import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TezzeractH1 } from "../components/ui/TezzeractH1";
import { TezzeractButton } from "../components/ui/TezzeractButton";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "No-Index Page",
  description: "This page is explicitly excluded from search engine indexing.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function NoIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />
      <main className="flex-grow relative flex items-center justify-center px-4 py-24 overflow-hidden">
        {/* Background Decorative Element - matching pricing page style */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-150 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/aboutbg.png')",
          }}
          aria-hidden
        />
        
        <div className="relative z-10 max-w-3xl w-full text-center">
          <div className="mb-12 inline-flex items-center justify-center relative w-64 h-64 mx-auto">
            {/* Soft Glow behind the illustration */}
            <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full scale-75" />
            
            <Image
              src="/assets/no-index-illustration.png"
              alt="No-Index Illustration"
              width={256}
              height={256}
              className="relative z-10 object-contain drop-shadow-xl animate-pulse-slow"
              priority
            />
          </div>
          
          <TezzeractH1 variant="dark" className="mb-8 md:text-center pb-2">
            This Page Is <span className="bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent">Hidden</span>
          </TezzeractH1>
          
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            This page is configured with <span className="font-medium text-[#00378A]">noindex, nofollow</span> metadata. 
            It is invisible to search engines and crawlers will not track any links from here.
          </p>
          
          <div className="flex justify-center">
            <Link href="/" passHref>
              <TezzeractButton className="px-10 h-12 text-base">
                Return Home
              </TezzeractButton>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
