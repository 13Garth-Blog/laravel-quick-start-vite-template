# Laravel Vite Quick Start Template
A quick start Laravel Vite config for project asset compiling.

## Laravel Project structure
- Make sure you run ```npm install```
  - Then I like to build the assets as I work on them with.<br>
    ```npm run build```

- Site images you want to be compiled to the public folder can be stored in 
  - ./storage/images/
  - Make sure you run the storage link command for Laravel.<br>
    ``` php artisan storage:link ```
  - Then, when outputting these images to blade files. Just add "storage/."<br>
    ```asset('storage/' . $image_path);```
 
- JS Scripts and CSS are compiled together using javascript.
  - ./resources/
    - /css
      - style1.css
      - style2.css
      - style3.min.css
      - custom.css
    - js
      - app.js
      - script1.js
      - script2.min.js
      - script3.js
      - custom.js

## app.js example
```
// CSS
import "../css/style1.css";
import "../css/style2.css";
import "../css/style3.min.css";
import "../css/custom.css";

// JS
import "./script1.js";
import "./script2.min.js";
import "./script3.js";
import "./custom.js";
```
## vite.config.js 
```
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
```

