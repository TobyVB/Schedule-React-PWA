import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: "/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        src: [
          "/index.html",
          "/App.jsx",
          "/App.css",
          "/components/*.jsx",
          "/pages/*.jsx",
          "/layouts/*.jsx",
          "/main.jsx",
        ],
        // "/images/**/*.jpg",
      },
    }),
  ],
  server: {
    host: "192.168.86.191",
  },
});
