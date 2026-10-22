/**
 * Automated Screenshot Capturing Engine
 * Navigates through all UI tabs, triggers modals, runs queries,
 * and saves crisp high-resolution screenshots for the final submission PDF.
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log('Starting automated screenshot engine with Chrome...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const indexPath = path.resolve('index.html');
  const fileUrl = 'file:///' + indexPath.replace(/\\/g, '/');

  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Wait a moment for fonts and layouts to settle
  await new Promise(r => setTimeout(r, 1000));

  // 1. Screenshot 1: Customer Portal Hero & Fleet Catalog
  console.log('Capturing Screenshot 1: Hero & Fleet Catalog...');
  await page.screenshot({ path: 'screenshots/01_hero_and_search.png' });

  // Scroll down slightly to showcase the vehicle cards grid
  await page.evaluate(() => {
    window.scrollTo({ top: 580, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Screenshot 2: Fleet Catalog Grid...');
  await page.screenshot({ path: 'screenshots/02_fleet_catalog_grid.png' });

  // 2. Filter by Electric EV
  console.log('Filtering by Electric Category...');
  await page.evaluate(() => {
    const pill = document.querySelector('.category-pill[data-cat="Electric"]');
    if (pill) pill.click();
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Screenshot 3: Category Filter (EV)...');
  await page.screenshot({ path: 'screenshots/03_category_filter_ev.png' });

  // Reset filter and Open Booking Calculator Modal for Tesla Model 3
  console.log('Opening Booking Modal...');
  await page.evaluate(() => {
    window.resetFilters();
    window.openBookingModal(1);
  });
  await new Promise(r => setTimeout(r, 600));

  // Apply discount code COLLEGE20
  await page.evaluate(() => {
    const promoInput = document.getElementById('promo-code-input');
    if (promoInput) promoInput.value = 'COLLEGE20';
    const applyBtn = document.getElementById('btn-apply-promo');
    if (applyBtn) applyBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  console.log('Capturing Screenshot 4: Booking Calculator Modal with Discount...');
  await page.screenshot({ path: 'screenshots/04_booking_calculator_modal.png' });

  // Trigger Booking Confirmation & Voucher
  console.log('Confirming booking to generate voucher...');
  await page.evaluate(() => {
    const confirmBtn = document.getElementById('btn-confirm-booking');
    if (confirmBtn) confirmBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  console.log('Capturing Screenshot 5: Printable Rental Voucher...');
  await page.screenshot({ path: 'screenshots/05_rental_voucher.png' });

  // Close voucher modal
  await page.evaluate(() => {
    document.getElementById('voucher-modal-overlay').classList.remove('active');
  });
  await new Promise(r => setTimeout(r, 300));

  // 3. Tab 2: My Bookings
  console.log('Navigating to My Bookings Tab...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('nav-btn-bookings').click();
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Screenshot 6: Customer Bookings Table...');
  await page.screenshot({ path: 'screenshots/06_customer_bookings.png' });

  // 4. Tab 3: Admin Portal
  console.log('Navigating to Admin Portal Tab...');
  await page.evaluate(() => {
    document.getElementById('nav-btn-admin').click();
  });
  await new Promise(r => setTimeout(r, 700));

  console.log('Capturing Screenshot 7: Admin KPI & Analytics Charts...');
  await page.screenshot({ path: 'screenshots/07_admin_analytics_charts.png' });

  // Scroll down inside Admin Portal to capture Fleet Inventory Table
  await page.evaluate(() => {
    window.scrollTo({ top: 480, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Screenshot 8: Admin Fleet Inventory Controller...');
  await page.screenshot({ path: 'screenshots/08_admin_fleet_table.png' });

  // 5. Tab 4: Database Design & ERD
  console.log('Navigating to Database & ERD Tab...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('nav-btn-database').click();
  });
  await new Promise(r => setTimeout(r, 700));

  console.log('Capturing Screenshot 9: Database ERD Diagram & Architecture...');
  await page.screenshot({ path: 'screenshots/09_database_erd_view.png' });

  // Scroll to Live SQL Query Runner
  await page.evaluate(() => {
    window.scrollTo({ top: 580, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Screenshot 10: Interactive SQL Query Results...');
  await page.screenshot({ path: 'screenshots/10_database_sql_runner.png' });

  // 6. Tab 5: Submission Package
  console.log('Navigating to Submission Tab...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('nav-btn-report').click();
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Screenshot 11: Academic Homework Submission Overview...');
  await page.screenshot({ path: 'screenshots/11_submission_overview.png' });

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY IN screenshots/ DIRECTORY!');
})();
