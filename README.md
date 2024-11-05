# laravel-vite-quick-start-template
A quick start Laravel Vite config for project asset compiling.

## Laravel Project structure
- Site images you want to be compiled to the public folder can be stored in 
  - ./storage/images/
  - Make sure you run the storage link command for Laravel.<br>
    ``` php artisan storage:link ```
 
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
