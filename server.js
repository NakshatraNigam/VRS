/**
 * DrivePulse VRMS — Production Serverless & Local HTTP Server
 * Compatible with Vercel Node.js Runtime & Local Development
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
    let safePath = decodeURIComponent(rawUrl.split('?')[0]);

    if (safePath === '/' || safePath === '') {
      safePath = '/index.html';
    }

    const normalizedPath = path.normalize(safePath).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(ROOT, normalizedPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      if (res.setHeader) res.setHeader('Content-Type', contentType);
      res.statusCode = 200;
      return res.end(fs.readFileSync(filePath));
    }

    // Default fallback to index.html for SPA routes
    const indexPath = path.join(ROOT, 'index.html');
    if (fs.existsSync(indexPath)) {
      if (res.setHeader) res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.statusCode = 200;
      return res.end(fs.readFileSync(indexPath));
    }

    res.statusCode = 404;
    res.end('404 Not Found');
  } catch (err) {
    res.statusCode = 500;
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
