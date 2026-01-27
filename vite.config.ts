import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: [
      "pdfjs-dist",
      "jspdf",
      "file-saver",
      "mammoth",
      "react-markdown",
      "rehype-highlight",
    ],
    exclude: ["pdfjs-dist/build/pdf.worker"],
  },
  worker: {
    format: "es",
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
