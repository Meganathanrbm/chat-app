import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
      },
    },
  },
});
