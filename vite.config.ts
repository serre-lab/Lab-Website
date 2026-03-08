import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    assetsInclude: ["**/*.md"],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "react-router-dom"],
                    mantine: ["@mantine/core"],
                    motion: ["motion", "motion/react"],
                },
            },
        },
    },
});
