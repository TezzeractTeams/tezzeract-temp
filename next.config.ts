import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Directory that contains this config file (always the real app root).
// Do not use `__dirname` here — Next may evaluate the config in a context where it resolves
// incorrectly, which sends Turbopack looking for `tailwindcss` in the parent folder and
// causes repeated resolution failures.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin Turbopack root when multiple lockfiles exist (e.g. parent yarn.lock + this repo's pnpm-lock).
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tezzeract-strapi-backend.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    qualities: [100, 75, 90],
  },
  experimental: {
    optimizePackageImports: ['gsap', 'three', '@react-three/fiber', 'framer-motion', 'motion'],
  },
  compress: true,
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
