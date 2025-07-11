
 
import './zone-flags';

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/***************************************************************************************************
 * Polyfills para compatibilidad con node.js modules (usados por Jasmine/Webpack 5)
 */
(window as any).global = window;
(window as any).process = {
  env: {
    NODE_ENV: 'development'
  }
};

(window as any).global = window;



