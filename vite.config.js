import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  assetsInclude: [
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.PNG",
    "**/*.JPG",
    "**/*.JPEG"
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Copy _redirects after build
    // Ensures SPA routing works on Render
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
  // Custom Vite plugin to copy _redirects
  plugins: [
    react(),
    {
      name: "copy-redirects",
      closeBundle() {
        const publicRedirects = path.resolve(__dirname, "public", "_redirects");
        const distRedirects = path.resolve(__dirname, "dist", "_redirects");
        if (fs.existsSync(publicRedirects)) {
          fs.copyFileSync(publicRedirects, distRedirects);
          console.log("_redirects file copied to dist");
        } else {
          console.warn("⚠️ _redirects file not found in public folder");
        }
      }
    }
  ]
});
