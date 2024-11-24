import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std/path/mod.ts";

const root = resolve(dirname(fromFileUrl(import.meta.url)), "./src");
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@assets": resolve(root, "frontend/src/assets"),
      "@components": resolve(root, "frontend/src/components"),
      "@types": resolve(root, "frontend/src/types"),
      "@types/*": resolve(root, "frontend/src/types"),
    },
  },
});
