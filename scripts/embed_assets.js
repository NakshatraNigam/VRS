const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'styles.css');
const jsPath = path.join(root, 'js', 'app.js');

let html = fs.readFileSync(htmlPath, 'utf-8');
const css = fs.readFileSync(cssPath, 'utf-8');
const js = fs.readFileSync(jsPath, 'utf-8');

if (!html.includes('id="drivepulse-embedded-styles"')) {
  html = html.replace(
    '<link rel="stylesheet" href="styles.css">',
    '<link rel="stylesheet" href="styles.css">\n  <style id="drivepulse-embedded-styles">\n' + css + '\n  </style>'
  );
}

if (!html.includes('id="drivepulse-embedded-script"')) {
  html = html.replace(
    '<script src="js/app.js"></script>',
    '<script src="js/app.js"></script>\n  <script id="drivepulse-embedded-script">\n' + js + '\n  </script>'
  );
}

fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('Successfully injected! New index.html size:', fs.statSync(htmlPath).size);
