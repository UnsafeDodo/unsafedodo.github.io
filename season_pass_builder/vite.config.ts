import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "/seasonpassbuilder/", // Change to your desired subdirectory path
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
})