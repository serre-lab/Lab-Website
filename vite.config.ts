import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdPlugin from "vite-plugin-md";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        //  mdPlugin()
    ],
    assetsInclude: ["**/*.md"],
});
