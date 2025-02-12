import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import svgrPlugin from "vite-plugin-svgr";
import copy from "rollup-plugin-copy";
import fs from "fs";
import path from "path";
// If you need to replicate the cross-origin isolation:
const crossOriginHeaders = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
};
// Equivalent to Webpack's paths
const paths = {
  src: path.resolve(__dirname, "src"),
  build: path.resolve(__dirname, "dist"),
  node_modules: path.resolve(__dirname, "node_modules"),
};

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        svgo: false,
        ref: true,
      },
    }),

    // If you want to copy the Binah SDK to dist the same way Webpack did:
    copy({
      targets: [
        {
          // Adjust the source path to match your actual needs:
          src: "node_modules/@binah/web-sdk/dist/*",
          dest: "public",
        },
      ],
      hook: "buildStart",
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 8000, // or whichever port you prefer
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    },
    open: true, // automatically open browser (optional)
    headers: crossOriginHeaders, // replicate those cross-origin policies
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Ensures these are pre-bundled
  },
  resolve: {
    alias: {
      "@": paths.src, // Optional: Shortcut for imports like '@/components/...'
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Matches Webpack's resolve.extensions
  },
  build: {
    outDir: "dist", // Build output directory, same as your Webpack dist
  },

  assetsInclude: ["**/*.wasm"], // Ensures WebAssembly is correctly handled

  esbuild: {
    target: "esnext", // Equivalent to Webpack's "target: web"
  },
});
