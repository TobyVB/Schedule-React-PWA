import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: "/icons/he-logo250.png",
            sizes: "250x250",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/he-logo640x554.png",
            sizes: "640x554",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    host: "192.168.86.191",
  },
});
