import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';


const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();




const serverConfig = provideServerRenderingConfig({
  routes: {
    'allorders/:id': {
      getPrerenderParams: async () => {
        return [
          { id: '123' }, // حط هنا القيم اللي عايز تجهزها وقت الـ prerender
          { id: '456' },
        ];
      }
    },
    'checkout/:id': {
      getPrerenderParams: async () => {
        return [
          { id: '789' },
          { id: '101' },
        ];
      }
    }
  }
});




/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
function provideServerRenderingConfig(arg0: { routes: { 'allorders/:id': { getPrerenderParams: () => Promise<{ id: string; }[]>; }; 'checkout/:id': { getPrerenderParams: () => Promise<{ id: string; }[]>; }; }; }) {
  throw new Error('Function not implemented.');
}

