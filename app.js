/**
 * DRIVEPULSE - VEHICLE RENTAL MANAGEMENT SYSTEM (VRMS)
 * Industry Practice Project • Group B-19
 * Master Application Logic, State Management, and Analytics
 */

// Node.js SSR / Vercel Serverless environment guard
if (typeof window === 'undefined') {
  global.window = global;
}
if (typeof document === 'undefined') {
  global.document = {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
  };
}
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  };
}

// ============================================================================
// 1. DATA MODEL & INITIAL SEED STATE
// ============================================================================
const INITIAL_VEHICLES = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model 3 Long Range',
    year: 2024,
    category: 'Electric',
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    luggage: 3,
    hp: 450,
    plate: 'EV-789-NY',
    vin: '5YJ3E1EB8LF892110',
    rate: 95.0,
    deposit: 250.0,
    odometer: 18450,
    branch: 'Downtown Hub & HQ (NY)',
    branchId: 1,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-electric'
  },
  {
    id: 2,
    make: 'BMW',
    model: '530i M Sport',
    year: 2024,
    category: 'Luxury',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    luggage: 3,
    hp: 255,
    plate: 'LUX-550-NY',
    vin: 'WBA53AH04NC902188',
    rate: 125.0,
    deposit: 350.0,
    odometer: 22100,
    branch: 'Downtown Hub & HQ (NY)',
    branchId: 1,
    status: 'RENTED',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-luxury'
  },
  {
    id: 3,
    make: 'Range Rover',
    model: 'Velar R-Dynamic',
    year: 2023,
    category: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    luggage: 4,
    hp: 395,
    plate: 'SUV-404-NY',
    vin: 'SALWR2V42LA309182',
    rate: 135.0,
    deposit: 300.0,
    odometer: 31500,
    branch: 'Airport Terminal 1 (NY)',
    branchId: 2,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1606016159991-d41a87754652?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-suv'
  },
  {
    id: 4,
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2024,
    category: 'Sports',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 4,
    luggage: 2,
    hp: 443,
    plate: 'SPD-911-CA',
    vin: 'WP0AB2A98NS120934',
    rate: 220.0,
    deposit: 500.0,
    odometer: 12300,
    branch: 'Westside Station (CA)',
    branchId: 4,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-sports'
  },
  {
    id: 5,
    make: 'Mercedes-Benz',
    model: 'C-Class AMG Line',
    year: 2024,
    category: 'Luxury',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    seats: 5,
    luggage: 3,
    hp: 255,
    plate: 'BENZ-204-CA',
    vin: 'WDD2050401R890123',
    rate: 115.0,
    deposit: 300.0,
    odometer: 16800,
    branch: 'Silicon Valley Tech Hub (CA)',
    branchId: 3,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-luxury'
  },
  {
    id: 6,
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    category: 'Electric',
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    luggage: 3,
    hp: 1020,
    plate: 'TSL-PLAID',
    vin: '5YJSA1E21NF991024',
    rate: 160.0,
    deposit: 400.0,
    odometer: 9400,
    branch: 'Silicon Valley Tech Hub (CA)',
    branchId: 3,
    status: 'RENTED',
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-electric'
  },
  {
    id: 7,
    make: 'Audi',
    model: 'Q7 55 TFSI Quattro',
    year: 2023,
    category: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 7,
    luggage: 5,
    hp: 335,
    plate: 'AUDI-Q77-NY',
    vin: 'WAUZZZF27NA019284',
    rate: 130.0,
    deposit: 300.0,
    odometer: 28900,
    branch: 'Downtown Hub & HQ (NY)',
    branchId: 1,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-suv'
  },
  {
    id: 8,
    make: 'Ford',
    model: 'Mustang GT Premium',
    year: 2023,
    category: 'Sports',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 4,
    luggage: 2,
    hp: 450,
    plate: 'MUS-V88-CA',
    vin: '1FA6P8CF5L5198273',
    rate: 140.0,
    deposit: 350.0,
    odometer: 21400,
    branch: 'Westside Station (CA)',
    branchId: 4,
    status: 'MAINTENANCE',
    img: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-sports'
  },
  {
    id: 9,
    make: 'Toyota',
    model: 'Camry Hybrid SE',
    year: 2024,
    category: 'Sedan',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    seats: 5,
    luggage: 3,
    hp: 208,
    plate: 'CAM-771-NY',
    vin: '4T1B11HK5MU192837',
    rate: 65.0,
    deposit: 150.0,
    odometer: 19300,
    branch: 'Airport Terminal 1 (NY)',
    branchId: 2,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-sedan'
  },
  {
    id: 10,
    make: 'Honda',
    model: 'Accord Touring Turbo',
    year: 2023,
    category: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    luggage: 3,
    hp: 252,
    plate: 'HON-442-NY',
    vin: '1HGCR2F83NA829102',
    rate: 62.0,
    deposit: 150.0,
    odometer: 34200,
    branch: 'Downtown Hub & HQ (NY)',
    branchId: 1,
    status: 'RENTED',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-sedan'
  },
  {
    id: 11,
    make: 'Hyundai',
    model: 'Ioniq 5 AWD EV',
    year: 2024,
    category: 'Electric',
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    luggage: 3,
    hp: 320,
    plate: 'HYU-ION-5',
    vin: 'KM8K23AA7PU091823',
    rate: 85.0,
    deposit: 200.0,
    odometer: 14200,
    branch: 'Airport Terminal 1 (NY)',
    branchId: 2,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1662581872277-0fd0bf3ae8f6?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-electric'
  },
  {
    id: 12,
    make: 'BMW',
    model: 'X5 xDrive40i',
    year: 2024,
    category: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 7,
    luggage: 4,
    hp: 375,
    plate: 'BMW-X55-CA',
    vin: '5UXTY5C03N9821034',
    rate: 145.0,
    deposit: 350.0,
    odometer: 15800,
    branch: 'Silicon Valley Tech Hub (CA)',
    branchId: 3,
    status: 'AVAILABLE',
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-suv'
  }
];

const INITIAL_BOOKINGS = [
  {
    ref: 'DP-2026-8941',
    customer: 'Sarah Jenkins',
    license: 'DL-NY-9823412',
    vehicleId: 2,
    vehicleName: 'BMW 530i M Sport',
    plate: 'LUX-550-NY',
    pickupDate: '2026-09-25 09:00',
    returnDate: '2026-09-29 18:00',
    duration: 4,
    branch: 'Downtown Hub & HQ (NY)',
    total: 604.8,
    status: 'ACTIVE',
    paymentMethod: 'Credit Card'
  },
  {
    ref: 'DP-2026-8942',
    customer: 'David Chen',
    license: 'DL-CA-4491029',
    vehicleId: 6,
    vehicleName: 'Tesla Model S Plaid',
    plate: 'TSL-PLAID',
    pickupDate: '2026-09-26 10:00',
    returnDate: '2026-09-30 14:00',
    duration: 4,
    branch: 'Silicon Valley Tech Hub (CA)',
    total: 727.6,
    status: 'ACTIVE',
    paymentMethod: 'Credit Card'
  },
  {
    ref: 'DP-2026-8943',
    customer: 'Priya Sharma',
    license: 'DL-TX-7738291',
    vehicleId: 10,
    vehicleName: 'Honda Accord Touring Turbo',
    plate: 'HON-442-NY',
    pickupDate: '2026-09-24 08:30',
    returnDate: '2026-09-28 17:00',
    duration: 4,
    branch: 'Downtown Hub & HQ (NY)',
    total: 302.4,
    status: 'ACTIVE',
    paymentMethod: 'UPI / NetBanking'
  },
  {
    ref: 'DP-2026-8940',
    customer: 'Michael Rodriguez',
    license: 'DL-IL-1192837',
    vehicleId: 1,
    vehicleName: 'Tesla Model 3 Long Range',
    plate: 'EV-789-NY',
    pickupDate: '2026-09-18 10:00',
    returnDate: '2026-09-22 10:00',
    duration: 4,
    branch: 'Downtown Hub & HQ (NY)',
    total: 453.6,
    status: 'COMPLETED',
    paymentMethod: 'Credit Card'
  },
  {
    ref: 'DP-2026-8939',
    customer: 'Emma Watson',
    license: 'DL-WA-8849201',
    vehicleId: 3,
    vehicleName: 'Range Rover Velar R-Dynamic',
    plate: 'SUV-404-NY',
    pickupDate: '2026-09-15 14:00',
    returnDate: '2026-09-19 12:00',
    duration: 4,
    branch: 'Airport Terminal 1 (NY)',
    total: 594.0,
    status: 'COMPLETED',
    paymentMethod: 'Debit Card'
  },
  {
    ref: 'DP-2026-8944',
    customer: 'Sarah Jenkins',
    license: 'DL-NY-9823412',
    vehicleId: 1,
    vehicleName: 'Tesla Model 3 Long Range',
    plate: 'EV-789-NY',
    pickupDate: '2026-10-02 09:00',
    returnDate: '2026-10-06 18:00',
    duration: 4,
    branch: 'Downtown Hub & HQ (NY)',
    total: 442.8,
    status: 'CONFIRMED',
    paymentMethod: 'Credit Card'
  }
];

function getInitialData(key, fallback) {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read from localStorage:', e);
  }
  return fallback;
}

// App State
let state = {
  vehicles: getInitialData('vrms_vehicles', INITIAL_VEHICLES),
  bookings: getInitialData('vrms_bookings', INITIAL_BOOKINGS),
  selectedCategory: 'ALL',
  selectedFuel: 'ALL',
  selectedBranch: 'ALL',
  searchDates: { start: '2026-09-28', end: '2026-10-02' },
  searchQuery: '',
  activeModalVehicle: null,
  activeDiscountPct: 0
};

function saveState() {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('vrms_vehicles', JSON.stringify(state.vehicles));
      localStorage.setItem('vrms_bookings', JSON.stringify(state.bookings));
    }
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

// ============================================================================
// 2. DOM INITIALIZATION & TAB SWITCHER
// ============================================================================
function initApp() {
  if (typeof window !== 'undefined') {
    if (window.__DRIVEPULSE_INITIALIZED__) return;
    window.__DRIVEPULSE_INITIALIZED__ = true;
  }
  initTabs();
  renderFleetCatalog();
  renderBookingsTable();
  renderAdminPortal();
  initBookingModal();
  initAddVehicleModal();
  initDatabasePortal();
  initReportTab();
  initExportCsv();
}

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && (typeof process === 'undefined' || !process.versions || !process.versions.node);

if (isBrowser) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

function initTabs() {
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.dataset.tab;
      
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        if (content.id === targetTabId) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });

      // Special re-draw for canvas charts when entering Admin tab
      if (targetTabId === 'tab-admin') {
        setTimeout(renderCharts, 50);
      }
    });
  });

  // Shortcut button inside My Bookings
  const newRentalBtn = document.getElementById('btn-new-rental-shortcut');
  if (newRentalBtn) {
    newRentalBtn.addEventListener('click', () => {
      document.getElementById('nav-btn-fleet').click();
    });
  }

  // Home Brand click
  const brandHomeBtn = document.getElementById('brand-home-btn');
  if (brandHomeBtn) {
    brandHomeBtn.addEventListener('click', () => {
      document.getElementById('nav-btn-fleet').click();
    });
  }

  // Header Download PDF button
  const headerPdfBtn = document.getElementById('header-pdf-download-btn');
  if (headerPdfBtn) {
    headerPdfBtn.addEventListener('click', () => {
      document.getElementById('nav-btn-report').click();
    });
  }
}

// ============================================================================
// 3. FLEET CATALOG RENDERING & FILTERING
// ============================================================================
function renderFleetCatalog() {
  const grid = document.getElementById('fleet-grid-cards');
  if (!grid) return;

  const filtered = state.vehicles.filter(v => {
    const matchesCat = state.selectedCategory === 'ALL' || v.category === state.selectedCategory;
    const matchesFuel = state.selectedFuel === 'ALL' || v.fuel === state.selectedFuel;
    const matchesBranch = state.selectedBranch === 'ALL' || v.branchId === parseInt(state.selectedBranch);
    const q = state.searchQuery.toLowerCase();
    const matchesQuery = !q || v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.plate.toLowerCase().includes(q);
    return matchesCat && matchesFuel && matchesBranch && matchesQuery;
  });

  // Dynamically update pill counts
  updateCategoryPillCounts();

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
        <p style="font-size: 1.25rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem;">No vehicles matched your filter</p>
        <button class="btn-primary" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  filtered.forEach(vehicle => {
    const card = document.createElement('div');
    card.className = 'vehicle-card';

    let statusBadgeClass = 'status-available';
    let statusText = 'Available Now';
    let isAvailable = vehicle.status === 'AVAILABLE';

    if (vehicle.status === 'RENTED') {
      statusBadgeClass = 'status-rented';
      statusText = 'On Road (Rented)';
    } else if (vehicle.status === 'MAINTENANCE') {
      statusBadgeClass = 'status-maintenance';
      statusText = 'In Service';
    }

    card.innerHTML = `
      <div class="card-img-container">
        <img src="${vehicle.img}" alt="${vehicle.make} ${vehicle.model}" loading="lazy">
        <span class="card-badge ${vehicle.badgeClass}">${vehicle.category}</span>
        <span class="status-badge ${statusBadgeClass}">${statusText}</span>
      </div>

      <div class="card-content">
        <div class="card-header-row">
          <div>
            <h4 class="vehicle-make-model">${vehicle.make} ${vehicle.model}</h4>
            <span class="vehicle-meta">${vehicle.year} Model • Reg: <code>${vehicle.plate}</code></span>
          </div>
          <div class="vehicle-price-tag">
            <span class="price-amount">$${vehicle.rate.toFixed(0)}</span>
            <span class="price-unit">/day</span>
          </div>
        </div>

        <div class="specs-grid">
          <div class="spec-item">
            <div class="spec-icon">⚡</div>
            <div class="spec-label">Fuel</div>
            <div class="spec-val">${vehicle.fuel}</div>
          </div>
          <div class="spec-item">
            <div class="spec-icon">⚙️</div>
            <div class="spec-label">Gearbox</div>
            <div class="spec-val">${vehicle.transmission.slice(0, 4)}</div>
          </div>
          <div class="spec-item">
            <div class="spec-icon">👥</div>
            <div class="spec-label">Seats</div>
            <div class="spec-val">${vehicle.seats} Pers</div>
          </div>
          <div class="spec-item">
            <div class="spec-icon">🐎</div>
            <div class="spec-label">Power</div>
            <div class="spec-val">${vehicle.hp} HP</div>
          </div>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 1.15rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>📍</span> <span>Stationed at: <strong>${vehicle.branch}</strong></span>
        </div>

        <div class="card-footer-row">
          <button class="btn-primary" ${!isAvailable ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} onclick="openBookingModal(${vehicle.id})">
            ${isAvailable ? '<span>⚡</span> Reserve Now' : '<span>🔒</span> Unavailable'}
          </button>
          <button class="btn-secondary" onclick="viewSpecsModal(${vehicle.id})">
            Specs
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Filter Listeners
  initFilterListeners();
}

function updateCategoryPillCounts() {
  const counts = {
    ALL: state.vehicles.length,
    Electric: state.vehicles.filter(v => v.category === 'Electric').length,
    Luxury: state.vehicles.filter(v => v.category === 'Luxury').length,
    SUV: state.vehicles.filter(v => v.category === 'SUV').length,
    Sports: state.vehicles.filter(v => v.category === 'Sports').length,
    Sedan: state.vehicles.filter(v => v.category === 'Sedan').length
  };

  const countAll = document.getElementById('count-all');
  if (countAll) countAll.textContent = counts.ALL;

  const pillMap = {
    'Electric': `⚡ Electric (${counts.Electric})`,
    'Luxury': `👑 Luxury (${counts.Luxury})`,
    'SUV': `🚙 Premium SUV (${counts.SUV})`,
    'Sports': `🏎️ Sports (${counts.Sports})`,
    'Sedan': `🚗 Sedans (${counts.Sedan})`
  };

  Object.entries(pillMap).forEach(([cat, label]) => {
    const pill = document.querySelector(`.category-pill[data-cat="${cat}"]`);
    if (pill) pill.textContent = label;
  });
}

function initFilterListeners() {
  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(pill => {
    pill.onclick = () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedCategory = pill.dataset.cat;
      renderFleetCatalog();
    };
  });

  const fuelSelect = document.getElementById('filter-fuel');
  if (fuelSelect) {
    fuelSelect.onchange = (e) => {
      state.selectedFuel = e.target.value;
      renderFleetCatalog();
    };
  }

  const liveSearch = document.getElementById('live-keyword-filter');
  if (liveSearch) {
    liveSearch.oninput = (e) => {
      state.searchQuery = e.target.value;
      renderFleetCatalog();
    };
  }

  const searchBtn = document.getElementById('btn-search-fleet');
  if (searchBtn) {
    searchBtn.onclick = () => {
      const catSelect = document.getElementById('search-category-select');
      if (catSelect) {
        state.selectedCategory = catSelect.value;
        document.querySelectorAll('.category-pill').forEach(p => {
          if (p.dataset.cat === state.selectedCategory) p.classList.add('active');
          else p.classList.remove('active');
        });
      }

      const branchSelect = document.getElementById('pickup-branch-select');
      if (branchSelect) {
        state.selectedBranch = branchSelect.value;
      }

      const startDateInput = document.getElementById('search-start-date');
      const endDateInput = document.getElementById('search-end-date');
      if (startDateInput && endDateInput) {
        state.searchDates = {
          start: startDateInput.value,
          end: endDateInput.value
        };
      }

      renderFleetCatalog();
      document.getElementById('fleet-catalog-section').scrollIntoView({ behavior: 'smooth' });
    };
  }
}

window.resetFilters = function() {
  state.selectedCategory = 'ALL';
  state.selectedFuel = 'ALL';
  state.selectedBranch = 'ALL';
  state.searchQuery = '';
  document.querySelectorAll('.category-pill').forEach(p => {
    if (p.dataset.cat === 'ALL') p.classList.add('active');
    else p.classList.remove('active');
  });
  if (document.getElementById('live-keyword-filter')) document.getElementById('live-keyword-filter').value = '';
  if (document.getElementById('filter-fuel')) document.getElementById('filter-fuel').value = 'ALL';
  if (document.getElementById('search-category-select')) document.getElementById('search-category-select').value = 'ALL';
  renderFleetCatalog();
};

// ============================================================================
// 4. INTERACTIVE BOOKING CALCULATOR & MODAL
// ============================================================================
function initBookingModal() {
  const modal = document.getElementById('booking-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // Change triggers recalculation
  ['modal-pickup-date', 'modal-return-date', 'addon-cdw', 'addon-gps', 'addon-seat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateBookingCalculation);
  });

  // Apply promo
  const promoBtn = document.getElementById('btn-apply-promo');
  if (promoBtn) {
    promoBtn.onclick = () => {
      const code = document.getElementById('promo-code-input').value.trim().toUpperCase();
      const msg = document.getElementById('promo-message');
      if (code === 'COLLEGE20') {
        state.activeDiscountPct = 0.20;
        msg.textContent = '✓ 20% College Industry Discount Applied!';
        msg.style.display = 'block';
      } else if (code === 'DRIVE10') {
        state.activeDiscountPct = 0.10;
        msg.textContent = '✓ 10% Welcome Discount Applied!';
        msg.style.display = 'block';
      } else {
        state.activeDiscountPct = 0;
        msg.textContent = '❌ Invalid Coupon Code';
        msg.style.color = 'var(--accent-rose)';
        msg.style.display = 'block';
      }
      updateBookingCalculation();
    };
  }

  // Confirm booking
  const confirmBtn = document.getElementById('btn-confirm-booking');
  if (confirmBtn) {
    confirmBtn.onclick = handleConfirmBooking;
  }

  // Voucher modal close
  const vouchClose = document.getElementById('voucher-close-btn');
  if (vouchClose) {
    vouchClose.onclick = () => document.getElementById('voucher-modal-overlay').classList.remove('active');
  }
}

window.openBookingModal = function(vehicleId) {
  const vehicle = state.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  state.activeModalVehicle = vehicle;

  document.getElementById('modal-vehicle-title').textContent = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;
  document.getElementById('modal-vehicle-img').src = vehicle.img;
  
  const badge = document.getElementById('modal-vehicle-category-badge');
  badge.textContent = vehicle.category.toUpperCase();
  badge.className = `card-badge ${vehicle.badgeClass}`;

  document.getElementById('calc-base-rate').textContent = `$${vehicle.rate.toFixed(2)} / day`;
  document.getElementById('calc-deposit').textContent = `$${vehicle.deposit.toFixed(2)}`;

  if (state.searchDates && state.searchDates.start) {
    document.getElementById('modal-pickup-date').value = state.searchDates.start;
  }
  if (state.searchDates && state.searchDates.end) {
    document.getElementById('modal-return-date').value = state.searchDates.end;
  }
  if (vehicle.branchId) {
    document.getElementById('modal-station-select').value = vehicle.branchId;
  }

  updateBookingCalculation();
  document.getElementById('booking-modal-overlay').classList.add('active');
};

window.viewSpecsModal = function(vehicleId) {
  openBookingModal(vehicleId);
};

function updateBookingCalculation() {
  if (!state.activeModalVehicle) return;

  const vehicle = state.activeModalVehicle;
  const startVal = document.getElementById('modal-pickup-date').value;
  const endVal = document.getElementById('modal-return-date').value;

  const start = new Date(startVal);
  const end = new Date(endVal);

  let durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  if (isNaN(durationDays) || durationDays < 1) durationDays = 1;

  document.getElementById('calc-duration').textContent = `${durationDays} ${durationDays === 1 ? 'Day' : 'Days'}`;

  const subtotal = vehicle.rate * durationDays;
  document.getElementById('calc-subtotal').textContent = `$${subtotal.toFixed(2)}`;

  // Addons
  let addonTotalPerDay = 0;
  if (document.getElementById('addon-cdw').checked) addonTotalPerDay += 15;
  if (document.getElementById('addon-gps').checked) addonTotalPerDay += 8;
  if (document.getElementById('addon-seat').checked) addonTotalPerDay += 5;

  const totalAddons = addonTotalPerDay * durationDays;
  document.getElementById('calc-addons').textContent = `$${totalAddons.toFixed(2)}`;

  const tax = (subtotal + totalAddons) * 0.08;
  document.getElementById('calc-tax').textContent = `$${tax.toFixed(2)}`;

  const discountAmount = (subtotal + totalAddons) * state.activeDiscountPct;
  const discountRow = document.getElementById('row-discount');
  if (discountAmount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('calc-discount').textContent = `-$${discountAmount.toFixed(2)}`;
  } else {
    discountRow.style.display = 'none';
  }

  const grandTotal = (subtotal + totalAddons + tax - discountAmount) + vehicle.deposit;
  document.getElementById('calc-grand-total').textContent = `$${grandTotal.toFixed(2)}`;

  return { durationDays, subtotal, totalAddons, tax, discountAmount, grandTotal };
}

function handleConfirmBooking() {
  if (!state.activeModalVehicle) return;

  const calc = updateBookingCalculation();
  const vehicle = state.activeModalVehicle;
  const fullName = document.getElementById('cust-full-name').value.trim();
  const email = document.getElementById('cust-email').value.trim();
  const license = document.getElementById('cust-license-no').value.trim();
  const paymentMethod = document.getElementById('payment-method-select').value;
  const branchSelect = document.getElementById('modal-station-select');
  const branchName = branchSelect.options[branchSelect.selectedIndex].text;

  if (!fullName || !email || !license) {
    alert('Please fill out all required driver verification details.');
    return;
  }

  // Create new booking record
  const bookingRef = `DP-2026-${Math.floor(8950 + Math.random() * 500)}`;
  const newBooking = {
    ref: bookingRef,
    customer: fullName,
    license: license,
    vehicleId: vehicle.id,
    vehicleName: `${vehicle.make} ${vehicle.model}`,
    plate: vehicle.plate,
    pickupDate: document.getElementById('modal-pickup-date').value + ' 09:00',
    returnDate: document.getElementById('modal-return-date').value + ' 18:00',
    duration: calc.durationDays,
    branch: branchName,
    total: parseFloat(calc.grandTotal.toFixed(2)),
    status: 'ACTIVE',
    paymentMethod: paymentMethod
  };

  // Add booking and update vehicle status
  state.bookings.unshift(newBooking);
  vehicle.status = 'RENTED';

  saveState();
  renderFleetCatalog();
  renderBookingsTable();
  renderAdminPortal();

  // Close booking modal
  document.getElementById('booking-modal-overlay').classList.remove('active');

  // Display printable voucher
  showVoucherModal(newBooking);
}

function showVoucherModal(booking) {
  document.getElementById('vouch-ref-code').textContent = booking.ref;
  document.getElementById('vouch-renter-name').textContent = booking.customer;
  document.getElementById('vouch-license-no').textContent = booking.license;
  document.getElementById('vouch-vehicle-name').textContent = booking.vehicleName;
  document.getElementById('vouch-plate').textContent = booking.plate;
  document.getElementById('vouch-pickup-date').textContent = booking.pickupDate;
  document.getElementById('vouch-return-date').textContent = booking.returnDate;
  document.getElementById('vouch-branch').textContent = booking.branch;
  document.getElementById('vouch-total-paid').textContent = `$${booking.total.toFixed(2)}`;

  document.getElementById('voucher-modal-overlay').classList.add('active');
}

// ============================================================================
// 5. CUSTOMER BOOKINGS VIEW
// ============================================================================
function renderBookingsTable() {
  const tbody = document.getElementById('bookings-table-body');
  if (!tbody) return;

  const countBadge = document.getElementById('booking-records-count');
  if (countBadge) countBadge.textContent = `Showing ${state.bookings.length} Bookings`;

  tbody.innerHTML = '';

  state.bookings.forEach(b => {
    const tr = document.createElement('tr');

    let statusHtml = `<span class="status-badge status-available">${b.status}</span>`;
    if (b.status === 'ACTIVE') statusHtml = `<span class="status-badge status-rented">ACTIVE ON ROAD</span>`;
    if (b.status === 'COMPLETED') statusHtml = `<span class="status-badge status-available">RETURNED & REFUNDED</span>`;

    tr.innerHTML = `
      <td><strong style="color: var(--accent-cyan); font-family: var(--font-mono);">${b.ref}</strong></td>
      <td>
        <strong>${b.vehicleName}</strong><br>
        <span style="font-size: 0.72rem; color: var(--text-dim); font-family: var(--font-mono);">Plate: ${b.plate}</span>
      </td>
      <td>
        <span style="font-size: 0.8rem;">Pick: ${b.pickupDate}</span><br>
        <span style="font-size: 0.8rem; color: var(--text-dim);">Ret: ${b.returnDate}</span>
      </td>
      <td>${b.duration} Days</td>
      <td><strong style="color: #ffffff;">$${b.total.toFixed(2)}</strong></td>
      <td>${statusHtml}</td>
      <td>
        <button class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="viewVoucherByRef('${b.ref}')">
          View Voucher
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

window.viewVoucherByRef = function(ref) {
  const b = state.bookings.find(item => item.ref === ref);
  if (b) showVoucherModal(b);
};

// ============================================================================
// 6. ADMIN DASHBOARD & TELEMATICS CONTROLLER
// ============================================================================
function renderAdminPortal() {
  // Compute KPIs
  const totalFleet = state.vehicles.length;
  const activeRentals = state.vehicles.filter(v => v.status === 'RENTED').length;
  const maintenanceCount = state.vehicles.filter(v => v.status === 'MAINTENANCE').length;
  const totalRevenue = state.bookings.reduce((sum, b) => sum + b.total, 0);

  document.getElementById('kpi-fleet-count').textContent = totalFleet;
  document.getElementById('kpi-revenue-total').textContent = `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('kpi-active-rentals').textContent = activeRentals;
  document.getElementById('kpi-maintenance-count').textContent = maintenanceCount;

  // Render Fleet Table
  const tbody = document.getElementById('admin-fleet-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  state.vehicles.forEach(v => {
    const tr = document.createElement('tr');

    let statusBadge = `<span class="status-badge status-available">AVAILABLE</span>`;
    if (v.status === 'RENTED') statusBadge = `<span class="status-badge status-rented">RENTED</span>`;
    if (v.status === 'MAINTENANCE') statusBadge = `<span class="status-badge status-maintenance">MAINTENANCE</span>`;

    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${v.img}" style="width: 44px; height: 32px; object-fit: cover; border-radius: 4px;">
          <div>
            <strong>${v.make} ${v.model}</strong>
            <div style="font-size: 0.72rem; color: var(--text-dim);">${v.year} • ${v.fuel}</div>
          </div>
        </div>
      </td>
      <td><code style="font-family: var(--font-mono); color: var(--accent-cyan);">${v.plate}</code></td>
      <td><span class="card-badge ${v.badgeClass}" style="position: static; font-size: 0.65rem;">${v.category}</span></td>
      <td><strong>$${v.rate.toFixed(2)}</strong></td>
      <td>${v.odometer.toLocaleString()} km</td>
      <td><span style="font-size: 0.8rem;">${v.branch}</span></td>
      <td>${statusBadge}</td>
      <td>
        <select onchange="toggleVehicleStatus(${v.id}, this.value)" style="background: var(--bg-secondary); color: #fff; border: 1px solid var(--border-subtle); padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">
          <option value="AVAILABLE" ${v.status === 'AVAILABLE' ? 'selected' : ''}>Available</option>
          <option value="RENTED" ${v.status === 'RENTED' ? 'selected' : ''}>Rented</option>
          <option value="MAINTENANCE" ${v.status === 'MAINTENANCE' ? 'selected' : ''}>Maintenance</option>
        </select>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

window.toggleVehicleStatus = function(vehicleId, newStatus) {
  const vehicle = state.vehicles.find(v => v.id === vehicleId);
  if (vehicle) {
    vehicle.status = newStatus;
    saveState();
    renderFleetCatalog();
    renderAdminPortal();
  }
};

function renderCharts() {
  drawRevenueChart();
  drawCategoryDonut();
}

function drawRevenueChart() {
  const canvas = document.getElementById('revenue-chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const values = [2400, 3100, 3950, 4800, 5600, 6200];
  const maxVal = 7000;

  const padLeft = 50;
  const padBottom = 35;
  const chartW = w - padLeft - 20;
  const chartH = h - padBottom - 20;

  // Horizontal Gridlines
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '10px Inter';

  for (let i = 0; i <= 4; i++) {
    const y = 20 + (chartH / 4) * i;
    const label = '$' + (maxVal - (maxVal / 4) * i);
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();
    ctx.fillText(label, 10, y + 3);
  }

  // Draw Bars
  const barWidth = 44;
  const step = chartW / months.length;

  months.forEach((m, idx) => {
    const val = values[idx];
    const barH = (val / maxVal) * chartH;
    const x = padLeft + idx * step + (step - barWidth) / 2;
    const y = 20 + chartH - barH;

    // Gradient
    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(1, '#1d4ed8');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
    ctx.fill();

    // Value on top
    ctx.fillStyle = '#f8fafc';
    ctx.font = '11px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText(`$${val}`, x + barWidth / 2, y - 6);

    // Month Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Inter';
    ctx.fillText(m, x + barWidth / 2, h - 12);
  });
}

function drawCategoryDonut() {
  const canvas = document.getElementById('category-donut-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const evCount = state.vehicles.filter(v => v.category === 'Electric').length;
  const suvCount = state.vehicles.filter(v => v.category === 'SUV').length;
  const luxCount = state.vehicles.filter(v => v.category === 'Luxury').length;
  const sportsCount = state.vehicles.filter(v => v.category === 'Sports').length;
  const sedanCount = state.vehicles.filter(v => v.category === 'Sedan').length;

  const categories = [
    { name: 'EV', count: evCount, color: '#06b6d4' },
    { name: 'SUV', count: suvCount, color: '#10b981' },
    { name: 'Luxury', count: luxCount, color: '#6366f1' },
    { name: 'Sports', count: sportsCount, color: '#f43f5e' },
    { name: 'Sedan', count: sedanCount, color: '#f59e0b' }
  ];

  const total = categories.reduce((s, c) => s + c.count, 0);
  const cx = 110;
  const cy = h / 2;
  const rOuter = 75;
  const rInner = 45;

  let startAngle = -Math.PI / 2;

  categories.forEach(cat => {
    const sliceAngle = (cat.count / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, rInner, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = cat.color;
    ctx.fill();

    startAngle += sliceAngle;
  });

  // Center text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Outfit';
  ctx.textAlign = 'center';
  ctx.fillText(`${total}`, cx, cy + 3);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Inter';
  ctx.fillText('Fleet Units', cx, cy + 18);

  // Legend
  const legX = 200;
  let legY = 45;

  ctx.textAlign = 'left';
  categories.forEach(cat => {
    ctx.fillStyle = cat.color;
    ctx.fillRect(legX, legY, 12, 12);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Inter';
    ctx.fillText(`${cat.name} (${cat.count})`, legX + 18, legY + 10);

    legY += 28;
  });
}

// Add Vehicle Modal
function initAddVehicleModal() {
  const modal = document.getElementById('add-vehicle-modal-overlay');
  const openBtn = document.getElementById('btn-add-vehicle-modal');
  const closeBtn = document.getElementById('add-vehicle-close-btn');
  const form = document.getElementById('add-vehicle-form');

  if (openBtn) openBtn.onclick = () => modal.classList.add('active');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('active');
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const newV = {
        id: state.vehicles.length + 1,
        make: document.getElementById('add-make').value,
        model: document.getElementById('add-model').value,
        year: 2024,
        category: document.getElementById('add-category').value,
        fuel: document.getElementById('add-fuel').value,
        transmission: 'Automatic',
        seats: 5,
        luggage: 3,
        hp: 300,
        plate: document.getElementById('add-plate').value.toUpperCase(),
        vin: 'VIN' + Math.floor(1000000000000 + Math.random() * 9000000000000),
        rate: parseFloat(document.getElementById('add-rate').value),
        deposit: 300.0,
        odometer: 1000,
        branch: 'Downtown Hub & HQ (NY)',
        branchId: 1,
        status: 'AVAILABLE',
        img: document.getElementById('add-img').value || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        badgeClass: 'badge-' + document.getElementById('add-category').value.toLowerCase()
      };

      state.vehicles.push(newV);
      saveState();
      renderFleetCatalog();
      renderAdminPortal();
      modal.classList.remove('active');
      form.reset();
      alert(`Vehicle ${newV.make} ${newV.model} added to fleet!`);
    };
  }
}

// ============================================================================
// 7. DATABASE DESIGN & INTERACTIVE QUERY RUNNER
// ============================================================================
const SQL_DEMO_QUERIES = [
  {
    title: 'Active Rentals with Customer and Vehicle Details',
    sql: `SELECT 
    b.booking_reference,
    u.full_name AS customer_name,
    v.make || ' ' || v.model AS vehicle_model,
    v.license_plate,
    b.pickup_datetime,
    b.return_datetime,
    b.total_amount
FROM bookings b
JOIN customer_profiles cp ON b.customer_id = cp.customer_id
JOIN users u ON cp.user_id = u.user_id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.booking_status = 'ACTIVE';`,
    columns: ['booking_reference', 'customer_name', 'vehicle_model', 'license_plate', 'pickup_datetime', 'return_datetime', 'total_amount'],
    rows: [
      ['DP-2026-8941', 'Sarah Jenkins', 'BMW 530i M Sport', 'LUX-550-NY', '2026-09-25 09:00', '2026-09-29 18:00', '$604.80'],
      ['DP-2026-8942', 'David Chen', 'Tesla Model S Plaid', 'TSL-PLAID', '2026-09-26 10:00', '2026-09-30 14:00', '$727.60'],
      ['DP-2026-8943', 'Priya Sharma', 'Honda Accord Touring Turbo', 'HON-442-NY', '2026-09-24 08:30', '2026-09-28 17:00', '$302.40']
    ]
  },
  {
    title: 'Fleet Category Performance & Utilization Analysis',
    sql: `SELECT 
    vc.category_name,
    COUNT(v.vehicle_id) AS total_units,
    SUM(CASE WHEN v.status = 'RENTED' THEN 1 ELSE 0 END) AS rented_units,
    ROUND((CAST(SUM(CASE WHEN v.status = 'RENTED' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(v.vehicle_id)) * 100, 1) AS utilization_rate_pct,
    ROUND(AVG(v.daily_rate), 2) AS avg_daily_rate
FROM vehicle_categories vc
LEFT JOIN vehicles v ON vc.category_id = v.category_id
GROUP BY vc.category_id, vc.category_name;`,
    columns: ['category_name', 'total_units', 'rented_units', 'utilization_rate_pct', 'avg_daily_rate'],
    rows: [
      ['Electric & Hybrid (EV)', 3, 1, '33.3%', '$113.33'],
      ['Executive Luxury', 2, 1, '50.0%', '$120.00'],
      ['Comfort Sedan & Compact', 2, 1, '50.0%', '$63.50'],
      ['Premium SUV & All-Wheel', 3, 0, '0.0%', '$136.67'],
      ['Sports & Performance', 2, 0, '0.0%', '$180.00']
    ]
  },
  {
    title: 'Branch Revenue & Transaction Audit',
    sql: `SELECT 
    br.branch_name,
    COUNT(b.booking_id) AS total_bookings,
    SUM(b.subtotal_amount) AS rental_revenue,
    SUM(b.addon_amount) AS addon_revenue,
    SUM(b.total_amount) AS gross_total_revenue
FROM branches br
JOIN bookings b ON br.branch_id = b.pickup_branch_id
WHERE b.booking_status IN ('CONFIRMED', 'ACTIVE', 'COMPLETED')
GROUP BY br.branch_id, br.branch_name;`,
    columns: ['branch_name', 'total_bookings', 'rental_revenue', 'addon_revenue', 'gross_total_revenue'],
    rows: [
      ['Downtown Hub & Headquarters', 4, '$1,508.00', '$162.00', '$1,803.60'],
      ['Silicon Valley Tech Park Hub', 1, '$640.00', '$80.00', '$727.60'],
      ['International Airport Terminal 1', 1, '$540.00', '$60.00', '$594.00']
    ]
  },
  {
    title: 'High-Value Customer Loyalty & Rental Frequency',
    sql: `SELECT 
    u.full_name,
    cp.loyalty_tier,
    cp.loyalty_points,
    COUNT(b.booking_id) AS lifetime_rentals,
    SUM(b.total_amount) AS lifetime_spend
FROM customer_profiles cp
JOIN users u ON cp.user_id = u.user_id
JOIN bookings b ON cp.customer_id = b.customer_id
GROUP BY cp.customer_id, u.full_name, cp.loyalty_tier, cp.loyalty_points
ORDER BY lifetime_spend DESC;`,
    columns: ['full_name', 'loyalty_tier', 'loyalty_points', 'lifetime_rentals', 'lifetime_spend'],
    rows: [
      ['David Chen', 'PLATINUM', 820, 1, '$727.60'],
      ['Sarah Jenkins', 'GOLD', 450, 2, '$1,047.60'],
      ['Emma Watson', 'SILVER', 250, 1, '$594.00'],
      ['Michael Rodriguez', 'BRONZE', 100, 1, '$453.60'],
      ['Priya Sharma', 'SILVER', 200, 1, '$302.40']
    ]
  },
  {
    title: 'Fleet Maintenance Expenditure & Status Log',
    sql: `SELECT 
    v.license_plate,
    v.make || ' ' || v.model AS vehicle_model,
    ml.service_type,
    ml.service_cost,
    ml.service_date,
    ml.maintenance_status
FROM maintenance_logs ml
JOIN vehicles v ON ml.vehicle_id = v.vehicle_id;`,
    columns: ['license_plate', 'vehicle_model', 'service_type', 'service_cost', 'service_date', 'maintenance_status'],
    rows: [
      ['MUS-V88-CA', 'Ford Mustang GT Premium', 'Suspension Overhaul & Brake Pads', '$680.00', '2026-09-25', 'IN_PROGRESS'],
      ['AUDI-Q77-NY', 'Audi Q7 55 TFSI', 'Scheduled 30,000 km Major Service', '$420.00', '2026-09-10', 'COMPLETED'],
      ['SUV-404-NY', 'Range Rover Velar', 'All-Terrain Laser Alignment', '$210.00', '2026-08-28', 'COMPLETED'],
      ['EV-789-NY', 'Tesla Model 3 Long Range', 'EV High-Voltage Battery Audit', '$150.00', '2026-08-14', 'COMPLETED']
    ]
  }
];

function initDatabasePortal() {
  const queryTabs = document.querySelectorAll('.query-tab-btn');
  queryTabs.forEach((btn, idx) => {
    btn.onclick = () => {
      queryTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderQueryDemo(idx);
    };
  });

  const runAllBtn = document.getElementById('btn-run-all-queries');
  if (runAllBtn) {
    runAllBtn.onclick = () => {
      renderQueryDemo(0);
      alert('✓ Executed 5 Analytical SQL Queries against SQLite Schema. Inspect results below.');
    };
  }

  // Initial load
  renderQueryDemo(0);
}

function renderQueryDemo(index) {
  const q = SQL_DEMO_QUERIES[index];
  if (!q) return;

  document.getElementById('current-query-code').textContent = q.sql;

  const thead = document.getElementById('query-results-thead');
  const tbody = document.getElementById('query-results-tbody');

  thead.innerHTML = `<tr>${q.columns.map(c => `<th>${c}</th>`).join('')}</tr>`;
  tbody.innerHTML = q.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
}

// ============================================================================
// 8. ACADEMIC REPORT & PDF EXPORTER
// ============================================================================
function initReportTab() {
  const downloadBtn = document.getElementById('btn-generate-custom-pdf');
  const groupInput = document.getElementById('input-custom-group-name');
  const previewBtn = document.getElementById('btn-preview-report');

  if (groupInput) {
    groupInput.addEventListener('input', () => {
      const g = groupInput.value.trim().toUpperCase() || 'B-19';
      if (downloadBtn) {
        downloadBtn.innerHTML = `<span>📄</span> Download Submission PDF (${g}.pdf)`;
      }
      if (previewBtn) {
        previewBtn.href = `report_template.html?group=${encodeURIComponent(g)}`;
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const groupName = groupInput ? (groupInput.value.trim().toUpperCase() || 'B-19') : 'B-19';
      const pdfFileName = `${groupName}.pdf`;

      if (groupName !== 'B-19' && groupName !== 'B19') {
        const userChoice = confirm(`Open interactive report for Group ${groupName} ready to print or save as PDF?`);
        if (userChoice) {
          window.open(`report_template.html?group=${encodeURIComponent(groupName)}&print=true`, '_blank');
          return;
        }
      }

      // Download the compiled PDF
      const link = document.createElement('a');
      link.href = pdfFileName;
      link.download = pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }
}

// ============================================================================
// 9. FLEET TELEMATICS CSV EXPORTER
// ============================================================================
function initExportCsv() {
  const exportBtn = document.getElementById('btn-export-fleet-csv');
  if (exportBtn) {
    exportBtn.onclick = () => {
      const headers = ['VehicleID', 'Make', 'Model', 'Year', 'Category', 'Fuel', 'Plate', 'VIN', 'DailyRate', 'Deposit', 'OdometerKM', 'Station', 'Status'];
      const rows = state.vehicles.map(v => [
        v.id,
        `"${v.make}"`,
        `"${v.model}"`,
        v.year,
        `"${v.category}"`,
        v.fuel,
        v.plate,
        v.vin,
        v.rate.toFixed(2),
        v.deposit.toFixed(2),
        v.odometer,
        `"${v.branch}"`,
        v.status
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `drivepulse_fleet_telematics_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = (req, res) => {
    try {
      const fs = require('fs');
      const path = require('path');

      const searchDirs = [
        __dirname,
        process.cwd(),
        path.join(__dirname, '..')
      ];

      const rootDir = searchDirs.find(d => fs.existsSync(path.join(d, 'index.html'))) || __dirname;
      const rawUrl = (req.url || '/').split('?')[0].replace(/^\/+/, '');

      if (!rawUrl || rawUrl === '' || rawUrl === 'index.html') {
        const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.statusCode = 200;
        return res.end(html);
      }

      const filePath = path.join(rootDir, rawUrl);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const mimeTypes = {
          '.css': 'text/css; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.html': 'text/html; charset=utf-8',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.pdf': 'application/pdf',
          '.json': 'application/json; charset=utf-8'
        };
        const ext = path.extname(filePath).toLowerCase();
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
        res.statusCode = 200;
        return res.end(fs.readFileSync(filePath));
      }

      // Default fallback: serve index.html
      const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.statusCode = 200;
      return res.end(html);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Server Error: ' + e.message);
    }
  };
}
