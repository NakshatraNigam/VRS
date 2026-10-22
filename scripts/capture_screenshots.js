/**
 * Automated Screenshot Capturing Engine
 * Navigates through all UI tabs, triggers modals, runs queries,
 * and saves crisp high-resolution screenshots for the final submission PDF.
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.resolve(__dirname, '..');

function getBrowserPath() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  if (fs.existsSync(chromePath)) return chromePath;
  if (fs.existsSync(edgePath)) return edgePath;
  return chromePath;
}

(async () => {
  console.log('Starting automated screenshot engine with Chrome...');

  const browser = await puppeteer.launch({
    executablePath: getBrowserPath(),
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const indexPath = path.join(PROJECT_ROOT, 'index.html');
  const fileUrl = 'file:///' + indexPath.replace(/\\/g, '/');

  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const shot = (name) => path.join(PROJECT_ROOT, 'screenshots', name);

  console.log('Capturing Screenshot 1: Hero & Fleet Catalog...');
  await page.screenshot({ path: shot('01_hero_and_search.png') });

  await page.evaluate(() => { window.scrollTo({ top: 580, behavior: 'instant' }); });
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Screenshot 2: Fleet Catalog Grid...');
  await page.screenshot({ path: shot('02_fleet_catalog_grid.png') });

  console.log('Filtering by Electric Category...');
  await page.evaluate(() => {
    const pill = document.querySelector('.category-pill[data-cat="Electric"]');
    if (pill) pill.click();
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Screenshot 3: Category Filter (EV)...');
  await page.screenshot({ path: shot('03_category_filter_ev.png') });

  console.log('Opening Booking Modal...');
  await page.evaluate(() => {
    if (typeof openBookingModal === 'function') openBookingModal(1);
  });
  await new Promise(r => setTimeout(r, 600));
  console.log('Capturing Screenshot 4: Booking Calculator Modal...');
  await page.screenshot({ path: shot('04_booking_calculator_modal.png') });

  console.log('Confirming booking to show Rental Voucher...');
  await page.evaluate(() => {
    const confirmBtn = document.getElementById('btn-confirm-booking');
    if (confirmBtn) confirmBtn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  console.log('Capturing Screenshot 5: Printable Rental Voucher...');
  await page.screenshot({ path: shot('05_rental_voucher.png') });

  await page.evaluate(() => {
    const closeBtn = document.getElementById('voucher-close-btn');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  console.log('Navigating to Customer Bookings tab...');
  await page.evaluate(() => {
    const tabBtn = document.getElementById('nav-btn-bookings');
    if (tabBtn) tabBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Screenshot 6: My Bookings & Agreements...');
  await page.screenshot({ path: shot('06_customer_bookings.png') });

  console.log('Navigating to Admin Portal tab...');
  await page.evaluate(() => {
    const tabBtn = document.getElementById('nav-btn-admin');
    if (tabBtn) tabBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  console.log('Capturing Screenshot 7: Admin Analytics & Charts...');
  await page.screenshot({ path: shot('07_admin_analytics_charts.png') });

  await page.evaluate(() => { window.scrollTo({ top: 480, behavior: 'instant' }); });
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Screenshot 8: Admin Fleet Inventory Table...');
  await page.screenshot({ path: shot('08_admin_fleet_table.png') });

  console.log('Navigating to Database Design tab...');
  await page.evaluate(() => {
    const tabBtn = document.getElementById('nav-btn-database');
    if (tabBtn) tabBtn.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  console.log('Capturing Screenshot 9: Visual ERD Diagram...');
  await page.screenshot({ path: shot('09_database_erd_view.png') });

  await page.evaluate(() => { window.scrollTo({ top: 560, behavior: 'instant' }); });
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Screenshot 10: Interactive SQL Runner...');
  await page.screenshot({ path: shot('10_database_sql_runner.png') });

  console.log('Navigating to Submission PDF tab...');
  await page.evaluate(() => {
    const tabBtn = document.getElementById('nav-btn-report');
    if (tabBtn) tabBtn.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  console.log('Capturing Screenshot 11: Submission Package Overview...');
  await page.screenshot({ path: shot('11_submission_overview.png') });

  await browser.close();
  console.log('All 11 screenshots successfully captured and saved in screenshots/');
})();
