import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => {
  const plugins: any[] = [
    react(),
    visualizer({
      open: false,
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ];

  // Prerender plugin only for production build
  if (command === "build") {
    try {
      const prerenderPlugin = require("vite-plugin-prerender").default;
      plugins.push(
        prerenderPlugin({
          staticDir: path.join(process.cwd(), "dist"),
          routes: ["/", "/about", "/contact"], // add more routes as needed
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
      cssCodeSplit: true,
      rollupOptions: {
        external: ["sharp"],
        output: {
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
        },
      },
      commonjsOptions: {
        exclude: ["sharp"],
      },
    },
  };
});