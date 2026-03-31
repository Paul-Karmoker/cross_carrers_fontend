import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import path from "path";

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => {
  const plugins: any[] = [
    react(),

    // Bundle visualizer
    visualizer({
      open: false,
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),

    // Brotli/Gzip compression
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: false,
    }),
  ];

  // Prerender plugin only for production
  if (command === "build") {
    try {
      const prerenderPlugin = require("vite-plugin-prerender").default;
      plugins.push(
        prerenderPlugin({
          staticDir: path.join(process.cwd(), "dist"),
          routes: ["/", "/about-us", "/contact-us"], // Add more routes as needed
          rendererOptions: {
            maxConcurrentRoutes: 1,
            renderAfterTime: 1500,
            headless: true,
          },
        })
      );
    } catch (e) {
      console.error("Prerender plugin failed to load, skipping SEO snapshot.", e);
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: [
        "react-redux",
        "pdfjs-dist",
        "jspdf",
        "file-saver",
        "mammoth",
        "react-markdown",
        "rehype-highlight",
      ],
      exclude: ["pdfjs-dist/build/pdf.worker", "sharp"],
    },
    build: {
      target: "esnext",
      minify: "esbuild",
      cssCodeSplit: true, // Split CSS per JS chunk
      sourcemap: false,
      rollupOptions: {
        external: ["sharp"],
        output: {
          // Vendor splitting for smaller chunks
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "vendor-react";
              if (id.includes("react-dom")) return "vendor-react-dom";
              if (id.includes("pdfjs-dist")) return "vendor-pdfjs";
              if (id.includes("jspdf")) return "vendor-jspdf";
              if (id.includes("react-markdown") || id.includes("rehype")) return "vendor-md";
              return "vendor";
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (name?.endsWith(".css")) return "assets/css/[name]-[hash][extname]";
            if (/\.(png|jpg|jpeg|gif|svg)$/.test(name || "")) return "assets/img/[name]-[hash][extname]";
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      commonjsOptions: {
        exclude: ["sharp"],
      },
      brotliSize: true,
      chunkSizeWarningLimit: 600,
    },
  };
});