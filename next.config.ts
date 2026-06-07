import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  devIndicators: {
    buildActivity: false, // Отключает значок анимации сборки в углу
  },
};

export default nextConfig;