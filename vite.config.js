import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,      // Don't generate source maps
    minify: "esbuild",     // Minify JavaScript
    cssMinify: true,       // Minify CSS
  },
});
