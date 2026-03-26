import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { visualizer } from "rollup-plugin-visualizer"; // added for bundle analysis

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,                 // automatically open the report after build
      filename: "stats.html",     // output file name
      gzipSize: true,             // show gzipped sizes (helpful for comparison)
      brotliSize: true,           // show brotli sizes if you use it
    }),
  ],

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
    target: "esnext",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500, // warn if chunks > 500KB
    sourcemap: false, // disable source maps in production
    rollupOptions: {
      output: {
        // Manual chunks to reduce first-load JS
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) return "react-vendor";
            if (id.includes("pdfjs-dist") || id.includes("jspdf")) return "pdf";
            if (id.includes("mammoth") || id.includes("file-saver")) return "docs";
            if (id.includes("react-markdown") || id.includes("rehype-highlight")) return "markdown";
            return "vendor"; // everything else from node_modules
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? "")) return "assets/css/[name]-[hash][extname]";
          if (/\.(png|jpe?g|svg|gif|webp)$/.test(name ?? "")) return "assets/images/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },

    commonjsOptions: {
      include: [/node_modules/],
    },

    // Minify and optimize for production
    minify: "esbuild",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});