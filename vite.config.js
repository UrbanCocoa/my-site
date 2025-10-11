import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // This ensures your app loads correctly on subpages like /customize-artwork
  base: "/",

  // Allow uppercase image extensions (prevents “Failed to parse source” build errors)
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg", "**/*.PNG", "**/*.JPG", "**/*.JPEG"],

  // Recommended for Render or GitHub Pages static deployments
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Helps with SPA routing issues
      },
    },
  },

  // Prevent CORS errors in dev environment
  server: {
    port: 5173,
    open: true,
  },
});
