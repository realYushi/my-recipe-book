import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"), 
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./app/test/setupTests.ts",
  },
});
