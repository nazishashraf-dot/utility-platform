import path from "node:path";
import { defineConfig } from "vitest/config";

// Mirrors the "@/*" alias in jsconfig.json so tests can use the same
// imports as the app code (e.g. "@/components/Header").
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
