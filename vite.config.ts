import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [vue(), vueJsx()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url))
        }
      },
      server: {
        port: 3000,
        proxy: {
          "/api": {
            target: "http://localhost:5173",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, "/api")
          }
        }
      }
    };
  } else {
    return {
      plugins: [
        pages(),
        devServer({
          entry: "app/server.ts",
          adapter
        })
      ],
      build: {
        rollupOptions: {
          input: "app/server.ts",
          output: {
            format: "es",
            dir: "dist",
            entryFileNames: "_worker.js"
          }
        }
      }
    };
  }
});
