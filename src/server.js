import fs from 'fs';
import path from 'path';
import express from 'express';
import lru from 'lru-cache';
import { createBundleRenderer } from 'vue-server-renderer';
import setupDevServer from './dev-server';
import { codes, config, indexTemplate, env } from './config/server';

const app = express();
let appReady = null,
  renderer = null;

if (env.isDevelopment) {
  appReady = setupDevServer(app, indexTemplate, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
} else {
  const clientManifest = JSON.parse(
    // eslint-disable-next-line no-sync
    fs.readFileSync(
      path.join(__dirname, '..', 'dist', 'vue-ssr-client-manifest.json'),
      'utf-8'
    )
  );

  const serverBundle = JSON.parse(
    // eslint-disable-next-line no-sync
    fs.readFileSync(
      path.join(__dirname, '..', 'dist', 'vue-ssr-bundle.json'),
      'utf-8'
    )
  );

  renderer = createRenderer(serverBundle, {
    clientManifest
  });
}

function createRenderer(bundle, options = {}) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      cache: lru({
        max: 1000,
        // eslint-disable-next-line no-magic-numbers
        maxAge: 1000 * 60 * 15
      }),
      // eslint-disable-next-line no-sync
      template: fs.readFileSync(indexTemplate, 'utf-8'),
      runInNewContext: false
    })
  );
}

function render(req, res) {
  const context = {
    title: 'vue ssr project',
    url: req.url
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.error(err);
      if (err.code === codes.notFoundError) {
        res.status(codes.notFoundError).end('Page not found');
      } else {
        res.status(codes.internal).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  });
}

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.get(
  '*',
  env.isDevelopment
    ? (req, res) => appReady.then(() => render(req, res))
    : render
);

app.listen(config.port);
