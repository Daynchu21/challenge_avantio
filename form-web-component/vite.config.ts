/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    cssInjectedByJsPlugin({
      styleId: "formwc-styles",
      topExecutionPriority: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": {},
    global: "window",
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/custom-element.tsx"),
      name: "CustomReactForm",
      fileName: (format) => `custom-react-form.${format}.js`,
      formats: ["iife"], // ESM, ideal para <script type="module">
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
