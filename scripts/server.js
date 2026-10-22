/**
 * DrivePulse VRMS — Lightweight Zero-Dependency Local Dev Server
 * Located in scripts/ to ensure root directory remains purely static for Vercel CDN
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.sql': 'text/plain; charset=utf-8',
  '.db': 'application/octet-stream',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let safePath = decodeURIComponent(parsedUrl.pathname);

  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const normalizedPath = path.normalize(safePath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(ROOT, normalizedPath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 Not Found</title><style>body{background:#0a0e17;color:#f8fafc;font-family:sans-serif;padding:3rem;text-align:center;}a{color:#38bdf8;text-decoration:none;}</style></head>
        <body>
          <h1>404 — Resource Not Found</h1>
          <p>Requested file: <code>${safePath}</code></p>
          <p><a href="/">← Return to DrivePulse Homepage</a></p>
        </body>
        </html>
      `);
      return;
    }

    if (stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      if (fs.existsSync(indexFile)) {
        serveFile(indexFile, res);
      } else {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Directory listing forbidden.');
      }
      return;
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(filePath);
  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'X-Content-Type-Options': 'nosniff'
  });
  stream.pipe(res);

  stream.on('error', (err) => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${err.message}`);
    }
  });
}

if (require.main === module) {
  server.listen(PORT, () => {
    console.log('====================================================');
    console.log('🚗 DrivePulse — Vehicle Rental Management System');
    console.log(`🌐 Server running locally at: http://localhost:${PORT}`);
    console.log(`📂 Serving directory: ${ROOT}`);
    console.log('💡 Press Ctrl + C to stop the server');
    console.log('====================================================');
  });
}

module.exports = server;
