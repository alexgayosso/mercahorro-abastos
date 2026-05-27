// ============================================================
// next.config.ts — Actualizado para permitir imágenes de Sanity
// Reemplaza tu next.config.ts actual
// ============================================================
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
