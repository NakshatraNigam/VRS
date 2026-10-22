/**
 * PDF Compilation Engine for Industry Practice Homework Submission
 * Converts report_template.html into pixel-perfect academic submission PDFs
 * Named according to group ID (e.g., A12.pdf and A12_Vehicle_Rental_Management_System.pdf).
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function generatePdf(groupName = 'B-19') {
  console.log(`Starting PDF compilation for Group Name: ${groupName}...`);

  // Read report template
  let templateContent = fs.readFileSync('report_template.html', 'utf-8');

  // Replace group name if different from B-19
  if (groupName !== 'B-19') {
    templateContent = templateContent.replace(/B-19/g, groupName);
    templateContent = templateContent.replace(/Group B-19/g, `Group ${groupName}`);
  }

  // Write temporary rendered HTML
  const tempHtmlPath = path.resolve(`temp_report_${groupName.replace(/[^a-zA-Z0-9_-]/g, '')}.html`);
  fs.writeFileSync(tempHtmlPath, templateContent, 'utf-8');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const fileUrl = 'file:///' + tempHtmlPath.replace(/\\/g, '/');

  console.log('Loading report template in headless Chrome...');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Wait for all images and web fonts to render cleanly
  await new Promise(r => setTimeout(r, 1500));

  const standardPdfName = `${groupName}.pdf`;
  const detailedPdfName = `${groupName}_Vehicle_Rental_Management_System.pdf`;

  console.log(`Generating PDF: ${standardPdfName}...`);
  await page.pdf({
    path: standardPdfName,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '12mm',
      right: '12mm'
    }
  });

  console.log(`Generating descriptive copy: ${detailedPdfName}...`);
  fs.copyFileSync(standardPdfName, detailedPdfName);

  // If group has a hyphen like B-19, also create B19.pdf for convenience
  const noHyphenName = groupName.replace(/-/g, '') + '.pdf';
  if (noHyphenName !== standardPdfName) {
    fs.copyFileSync(standardPdfName, noHyphenName);
    console.log(`Also created convenience alias: ${noHyphenName}`);
  }

  await browser.close();

  // Clean up temporary HTML
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  const stats = fs.statSync(standardPdfName);
  console.log(`SUCCESS! Generated:`);
  console.log(`- ${standardPdfName} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`- ${detailedPdfName}`);
}

const customGroup = process.argv[2] || 'B-19';
generatePdf(customGroup.toUpperCase());
