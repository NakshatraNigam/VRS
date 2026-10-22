/**
 * DrivePulse VRMS — Production Serverless & Local HTTP Server
 * Compatible with Linux (Vercel Serverless) & Windows (Local Dev)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);

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

const handler = (req, res) => {
  try {
    const rawUrl = req.url || '/';
    // Strip leading slashes to prevent POSIX path.resolve treating it as root filesystem
    let cleanPath = decodeURIComponent(rawUrl.split('?')[0].replace(/^\/+/, ''));

    if (!cleanPath || cleanPath === '') {
      cleanPath = 'index.html';
    }

    // Prevent directory traversal
    const normalizedPath = path.normalize(cleanPath).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(ROOT, normalizedPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      if (res.setHeader) {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
      res.statusCode = 200;
      return res.end(fs.readFileSync(filePath));
    }

    // Only fallback to index.html for non-asset SPA routes
    const hasExtension = path.extname(cleanPath) !== '';
    if (!hasExtension) {
      const indexPath = path.join(ROOT, 'index.html');
      if (fs.existsSync(indexPath)) {
        if (res.setHeader) res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.statusCode = 200;
        return res.end(fs.readFileSync(indexPath));
      }
    }

    res.statusCode = 404;
    if (res.setHeader) res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found');
  } catch (err) {
    res.statusCode = 500;
    if (res.setHeader) res.setHeader('Content-Type', 'text/plain');
    res.end(`Internal Server Error: ${err.message}`);
  }
};

// Vercel Serverless Export
module.exports = handler;

// Local Standalone Execution
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const server = http.createServer(handler);
  server.listen(PORT, () => {
    console.log('====================================================');
    console.log('🚗 DrivePulse — Vehicle Rental Management System');
    console.log(`🌐 Server running locally at: http://localhost:${PORT}`);
    console.log('💡 Press Ctrl + C to stop the server');
    console.log('====================================================');
  });
}
