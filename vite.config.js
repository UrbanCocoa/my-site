// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false, // disables hot module replacement to avoid eval
  },
  esbuild: {
    legalComments: 'none', // ensures no eval for dev sourcemaps
  },
});
