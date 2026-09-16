import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Preview deployments may be mounted below a path rather than at /. Relative URLs keep assets resolvable.
  base: "./",
  plugins: [
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      preset: "cloudflare-module",
      output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
      cloudflare: { nodeCompat: true, deployConfig: true },
    }),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },
  server: {
    host: "::",
    port: 8080,
    // Leading dots allow the preview/proxy host and all of its subdomains.
    allowedHosts: [".manus.computer", ".vercel.app", ".netlify.app"],
  },
});
