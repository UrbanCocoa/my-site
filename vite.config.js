import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 🧩 React support
  plugins: [react()],

  // ✅ Keeps your paths correct for Render and custom domains
  base: "/",

  // 📁 Ensures static assets like images and _redirects are copied over
  publicDir: "public",

  // 🖼️ Include common image types (case-insensitive)
  assetsInclude: [
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.webp",
    "**/*.avif"
  ],

  // ⚙️ Build configuration
  build: {
    outDir: "dist",        // where Render looks for final site
    emptyOutDir: true,     // cleans dist before each build
    rollupOptions: {
      output: {
        manualChunks: undefined, // avoids chunk-splitting issues
      },
    },
  },

  // 🧪 Local development server
  server: {
    port: 5173,
    open: true,
  },
});
