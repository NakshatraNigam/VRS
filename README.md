# 🚗 DrivePulse — Vehicle Rental Management System (VRMS)
### College Industry Practice Homework Project • Group B-19 Submission

A production-grade, full-stack **Vehicle Rental Management System** engineered to industry standards, featuring:
1. **Frontend / UI Development**: Customer rental portal, dynamic pricing engine, KYC driver verification, simulated checkout, instant printable legal agreement voucher, and real-time operational admin dashboard with live telematics.
2. **Database Design**: Complete 3NF normalized relational schema with 10 tables, high-definition visual Entity-Relationship Diagram (ERD), full SQL DDL scripts, integrity constraints, indexes, views, and operational analytical queries.
3. **Single Submission PDF (`B-19.pdf`)**: All output screenshots, database architecture, SQL queries, and academic documentation compiled into a consolidated, professional 12-page PDF document named according to group naming instructions.

---

## 📁 Project Directory Structure

```text
vehicle-rental-system/
├── index.html                   # Master Web Application (Customer Portal, Admin Telematics, Database Viewer)
├── styles.css                   # Master Vanilla CSS3 Design System (Dark slate palette, Outfit & Inter typography)
├── app.js                       # Core Business Logic, State Engine, LocalStorage, Canvas Charts & Live SQL Runner
│
├── database/                    # Database Architecture & Relational Design
│   ├── schema.sql               # 3NF Relational Schema (10 Tables, Foreign Keys, Indexes, Views)
│   ├── seed_data.sql            # Comprehensive Realistic Seed Data (Branches, Vehicles, Bookings, Agreements)
│   ├── queries.sql              # Analytical & Operational Business Intelligence Queries
│   ├── erd_diagram.svg          # Master Vector Entity-Relationship Diagram (ERD)
│   ├── erd_diagram.png          # High-Resolution 1600x1100 ERD Diagram Image
│   ├── generate_erd.py          # Python Script to regenerate the ERD Diagram
│   └── vrms.db                  # Verified SQLite Database instance containing seeded tables
│
├── screenshots/                 # High-Resolution Retina Output Screenshots
│   ├── 01_hero_and_search.png               # Customer Portal Hero & Search Engine
│   ├── 02_fleet_catalog_grid.png            # Vehicle Fleet Showcase & Specs Grid
│   ├── 03_category_filter_ev.png            # Electric EV Dynamic Category Filter
│   ├── 04_booking_calculator_modal.png      # Rental Cost Calculator Modal (Add-ons, Promo COLLEGE20)
│   ├── 05_rental_voucher.png                # Official Rental Voucher & Agreement Card
│   ├── 06_customer_bookings.png             # Customer Portal: My Bookings & History
│   ├── 07_admin_analytics_charts.png        # Admin KPI Telemetry & HTML5 Canvas Charts
│   ├── 08_admin_fleet_table.png             # Admin Fleet Inventory Controller & Maintenance Logs
│   ├── 09_database_erd_view.png             # Database Portal: Visual ERD Diagram
│   ├── 10_database_sql_runner.png           # Interactive SQL Engine with Live Tabular Results
│   └── 11_submission_overview.png           # Academic Submission Checklist & PDF Exporter
│
├── report_template.html         # Master Academic Report Template with Embedded Screenshots
├── capture_screenshots.js       # Automated Puppeteer script to capture all screens
├── generate_pdf.js              # PDF Compiler (generates B-19.pdf and accepts any custom group ID)
├── B-19.pdf                      # Official Academic Homework Submission PDF (Single File)
└── B-19_Vehicle_Rental_Management_System.pdf # Descriptive copy of submission PDF
```

---

## 🚀 How to Run the Web Application

### Option 1: Native Node Dev Server (Zero Dependencies)
```powershell
npm run dev
# or
node server.js
```
The server will boot instantly at **`http://localhost:3000`**.

### Option 2: Direct Browser Launch
Simply double-click `index.html` or run:
```powershell
Start-Process "index.html"
```

---

## ☁️ How to Deploy Live on Vercel

The repository is pre-configured with `vercel.json` and `package.json` for **1-click zero-config deployment**.

### Method A: Deploy via Vercel CLI
Run the following in the project root:
```powershell
npx vercel
```
- Set up and deploy: **`Y`**
- Which scope: *(Select your personal/team account)*
- Link to existing project: **`N`**
- What's your project's name: **`drivepulse-vehicle-rental`**
- In which directory is your code located: **`./`**
- Want to modify these settings: **`N`**

To deploy directly to production:
```powershell
npx vercel --prod
```

### Method B: Deploy via GitHub (Recommended for Continuous Deployment)
1. Push this repository to your GitHub account:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/drivepulse-vehicle-rental.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your `drivepulse-vehicle-rental` repository.
4. Click **Deploy**. Vercel will automatically build and publish your site with a live `https://*.vercel.app` URL!

---

## 🗄️ Database Design Overview (3NF Relational Model)

The database schema strictly adheres to the **Third Normal Form (3NF)**:
- **`branches`**: Physical rental pickup and drop-off stations with regional operating hours.
- **`roles` & `users`**: Role-based access control (Admin, Fleet Manager, Counter Agent, Customer).
- **`customer_profiles`**: Extended KYC information, driver's license validation, and loyalty tier rankings.
- **`vehicle_categories`**: Pricing tiers (Electric EV, Luxury, SUV, Sports, Sedan), base rates, and deposits.
- **`vehicles`**: Physical fleet hardware tracking VIN, registration plate, odometer, transmission, fuel, and status (`AVAILABLE`, `RENTED`, `MAINTENANCE`).
- **`vehicle_features`**: Normalized vehicle features (Autopilot, Harmon Kardon Audio, Sunroof) with `ON DELETE CASCADE`.
- **`bookings`**: Central fact transactional entity binding customer, vehicle, branches, schedule, rates, taxes, and deposit.
- **`rental_agreements`**: Statutory legal contract terms, cryptographic digital signature hashes, and deposit escrow.
- **`payments`**: Multi-mode payment transaction auditing (Credit Card, Debit Card, UPI / NetBanking, Cash).
- **`vehicle_inspections`**: Pre-rental and post-rental condition audits (odometer, fuel %, damage notes) for deposit settlement.
- **`maintenance_logs`**: Preventative maintenance records, service costs, mechanics, and overhaul logs.

### Live SQLite Database
The database has been seeded and tested in `database/vrms.db`. You can query it directly using Python or SQLite CLI:
```powershell
python -c "import sqlite3; conn = sqlite3.connect('database/vrms.db'); print(conn.execute('SELECT COUNT(*) FROM vehicles').fetchone())"
```

---

## 📄 Final Submission PDF (`B-19.pdf`)

The final submission file is compiled and located at:
`C:\Users\nigam\.gemini\antigravity-ide\scratch\vehicle-rental-system\B-19.pdf`

It contains 12 structured pages:
- **Page 1**: Formal Academic Cover Page (CS & Engineering Department, Industry Practice Laboratory Report, Group B-19).
- **Page 2**: Section 1: Executive Summary, System Architecture, & Technology Stack.
- **Page 3**: Section 2: Database Design, 3NF Normalization Justification, and high-definition Entity-Relationship Diagram (ERD).
- **Page 4**: Section 3: Relational Data Dictionary (10 tables) & Composite Performance Indexes.
- **Page 5**: Section 4: SQL DDL Table Implementation Statements & Analytics Views.
- **Page 6**: Section 5: Analytical SQL Queries & Tabular Execution Output (Active rentals, Category utilization, Branch revenue).
- **Page 7**: Section 6: Frontend Output: Customer Portal Hero & Fleet Showcase Cards (Figures 6.1 & 6.2).
- **Page 8**: Section 7: Frontend Output: Dynamic Category Filter (EV) & Rental Calculator Modal (Figures 7.1 & 7.2).
- **Page 9**: Section 8: Frontend Output: Official Printable Rental Voucher & Customer Bookings (Figures 8.1 & 8.2).
- **Page 10**: Section 9: Frontend Output: Admin Command Center KPIs & Fleet Inventory Controller (Figures 9.1 & 9.2).
- **Page 11**: Section 10: Frontend Output: Database Portal ERD & Live Query Runner (Figures 10.1 & 10.2).
- **Page 12**: Section 11: Submission Package Overview & Academic Conclusion (Figure 11.1).

### How to Regenerate PDF for a Different Group Name
If your group has a specific group name (e.g., `B08`, `C15`, `A14`), simply run:
```powershell
node generate_pdf.js YOUR_GROUP_NAME
```
Example:
```powershell
node generate_pdf.js B08
# Automatically creates B08.pdf and B08_Vehicle_Rental_Management_System.pdf with updated headers, cover page, and metadata!
```
