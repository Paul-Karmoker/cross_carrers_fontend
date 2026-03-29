import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(async ({ command }) => {
  const plugins = [
    react(),
    visualizer({
      open: false, 
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ];

  // Logic: Only load the prerenderer when building for production
  // This bypasses the 'require is not defined' error in dev mode
  if (command === 'build') {
    try {
      const prerender = (await import('vite-plugin-prerender')).default;
      plugins.push(
        prerender({
          staticDir: path.join(process.cwd(), 'dist'),
          // Update these routes as CrossCareers grows (e.g., /jobs, /resume-builder)
          routes: ['/', '/about', '/contact'], 
          rendererOptions: {
            maxConcurrentRoutes: 1,
            renderAfterTime: 1500, // Increased slightly to ensure React 19 finishes rendering
            headless: true,
          }
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
      // PDF.worker and Sharp must be excluded to prevent dev server crashes
      exclude: ["pdfjs-dist/build/pdf.worker", "sharp"],
    },
    build: {
      target: "esnext",
      rollupOptions: {
        external: ['sharp'],
      },
      commonjsOptions: {
        exclude: ['sharp']
      },
      minify: "esbuild",
    },
  };
});