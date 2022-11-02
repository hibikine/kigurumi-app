const express = require('express');
const next = require('next');
const https = require('https');
const fs = require('fs');

const port = parseInt(process.env.PORT || '3000');
const host = '0.0.0.0';

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const expressApp = express();

  expressApp.get('*', (req, res) => handle(req, res));
  expressApp.post('*', (req, res) => handle(req, res));

  // Use HTTPS if HTTPS option enabled
  const hasCertificates =
    fs.existsSync('./dev/certificates/localhost-key.pem') &&
    fs.existsSync('./dev/certificates/localhost.pem');
  const useHttps = process.env.HTTPS === 'true' && hasCertificates;

  if (useHttps) {
    const options = {
      key: fs.readFileSync('./dev/certificates/localhost-key.pem'),
      cert: fs.readFileSync('./dev/certificates/localhost.pem'),
    };
    const server = https.createServer(options, expressApp);
    server.listen(port, host);
    console.log(`> Ready on https://localhost:${port}`);
  } else {
    expressApp.listen(port, host);
    console.log(`> Ready on http://localhost:${port}`);
  }
})();
