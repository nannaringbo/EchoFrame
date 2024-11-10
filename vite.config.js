import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  base: "/proto-final/",
  build: { chunkSizeWarningLimit: 3000, outDir: "dist" },
  assetsInclude: "**/*.task",
});
