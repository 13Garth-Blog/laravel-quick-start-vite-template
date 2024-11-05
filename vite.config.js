// Importing necessary modules from Vite and plugins
import { defineConfig } from "vite";             // Vite configuration function
import laravel from "laravel-vite-plugin";       // Laravel plugin for Vite, integrating Laravel's asset management
import { resolve } from "path";                  // Node.js module to handle file paths
import { viteStaticCopy } from "vite-plugin-static-copy";  // Vite plugin to copy static assets to the build folder

// Exporting Vite configuration
export default defineConfig({
    build: {
        outDir: "public",                       // Specifies the output directory for build files (Laravel's "public" folder)
        emptyOutDir: false,                     // Prevents clearing the outDir before building, preserving other files
        rollupOptions: {                        // Configuration for Rollup, Vite's underlying bundler
            input: "resources/js/app.js",       // Entry point for the build process (main JavaScript file)
            output: {
                format: "cjs",                  // Output format set to CommonJS
                entryFileNames: "build/app.js", // Name for the main output JavaScript file in the "build" folder
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith(".css")) {
                        return "build/app.css"; // Custom file name for CSS assets
                    }
                    return "assets/[name][extname]"; // Default pattern for other assets
                },
                globals: {
                    jquery: "$",                // Defines a global variable for jQuery to be accessed as `$`
                },
            },
        },
        cssMinify: true,                        // Enables minification for CSS files
        minify: true,                           // Enables overall minification for the final build
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"], // Defines main CSS and JS files to include in build
            refresh: true,                  // Enables automatic page refresh during development when files change
        }),
        viteStaticCopy({
            targets: [
                {
                    src: "storage/images/*",  // Source folder for static assets to be copied
                    dest: "images",           // Destination folder within "public" for copied images
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "resources/js"), // Sets `@` to reference the "resources/js" directory for simpler imports
            xlsx: "xlsx",                             // Creates an alias for `xlsx` module if used
        },
    },
    server: {
        host: "localhost",                  // Defines the host for the development server
        port: 3000,                         // Sets the port for the development server
        strictPort: true,                   // Ensures Vite fails to start if port 3000 is unavailable
        hmr: {
            overlay: false,                 // Disables error overlay for Hot Module Replacement (HMR) in development
        },
        watch: {
            usePolling: true,               // Enables polling for file changes, useful in some environments (e.g., Docker)
        },
    },
});
