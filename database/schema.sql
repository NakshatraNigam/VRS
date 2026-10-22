-- ============================================================================
-- INDUSTRY PRACTICE PROJECT: VEHICLE RENTAL MANAGEMENT SYSTEM (VRMS)
-- DATABASE SCHEMA DESIGN & SPECIFICATION (3NF NORMALIZED RELATIONAL MODEL)
-- Authors: Group B-19
-- Compatible with: PostgreSQL / MySQL / SQLite / MariaDB
-- ============================================================================

-- Drop tables if existing (in reverse dependency order)
DROP VIEW IF EXISTS v_revenue_analytics;
DROP VIEW IF EXISTS v_fleet_summary_by_category;
DROP VIEW IF EXISTS v_active_rentals;
DROP VIEW IF EXISTS v_overdue_rentals;

DROP TABLE IF EXISTS maintenance_logs;
DROP TABLE IF EXISTS vehicle_inspections;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS rental_agreements;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS vehicle_features;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS vehicle_categories;
DROP TABLE IF EXISTS customer_profiles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS branches;

-- ============================================================================
-- 1. BRANCHES / HUBS TABLE
-- Stores physical pick-up and drop-off stations across regions
-- ============================================================================
CREATE TABLE branches (
    branch_id INTEGER PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    branch_code VARCHAR(10) NOT NULL UNIQUE,
    street_address VARCHAR(200) NOT NULL,
    city VARCHAR(80) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    phone_number VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL,
    operating_hours VARCHAR(100) DEFAULT '24/7 Service',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. ROLES TABLE
-- Role-based access control (Admin, Fleet Manager, Counter Agent, Customer)
-- ============================================================================
CREATE TABLE roles (
    role_id INTEGER PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- ============================================================================
-- 3. USERS TABLE
-- Core system authentication and identity table
-- ============================================================================
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    role_id INTEGER NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(25) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'PENDING')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE RESTRICT
);

-- ============================================================================
-- 4. CUSTOMER PROFILES TABLE
-- Extended customer data: Driver's license validation & KYC records
-- ============================================================================
CREATE TABLE customer_profiles (
    customer_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    driver_license_number VARCHAR(50) NOT NULL UNIQUE,
    license_expiry_date DATE NOT NULL,
    issuing_country_state VARCHAR(60) NOT NULL,
    date_of_birth DATE NOT NULL,
    verification_status VARCHAR(25) DEFAULT 'VERIFIED' CHECK (verification_status IN ('VERIFIED', 'PENDING', 'REJECTED')),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(25),
    loyalty_tier VARCHAR(20) DEFAULT 'SILVER' CHECK (loyalty_tier IN ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM')),
    loyalty_points INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ============================================================================
-- 5. VEHICLE CATEGORIES TABLE
-- Classification, base pricing tiers, and age restrictions
-- ============================================================================
CREATE TABLE vehicle_categories (
    category_id INTEGER PRIMARY KEY,
    category_name VARCHAR(60) NOT NULL UNIQUE,
    description TEXT,
    base_daily_rate DECIMAL(10, 2) NOT NULL CHECK (base_daily_rate > 0),
    security_deposit DECIMAL(10, 2) NOT NULL DEFAULT 200.00,
    min_driver_age INTEGER NOT NULL DEFAULT 21,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. VEHICLES TABLE
-- Complete fleet inventory, hardware specifications, and live operational status
-- ============================================================================
CREATE TABLE vehicles (
    vehicle_id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    current_branch_id INTEGER NOT NULL,
    vin VARCHAR(17) NOT NULL UNIQUE,
    license_plate VARCHAR(20) NOT NULL UNIQUE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    manufacture_year INTEGER NOT NULL CHECK (manufacture_year >= 2018),
    color VARCHAR(30) NOT NULL,
    odometer_km INTEGER NOT NULL DEFAULT 0,
    fuel_type VARCHAR(25) NOT NULL CHECK (fuel_type IN ('Petrol', 'Diesel', 'Electric', 'Hybrid')),
    transmission VARCHAR(20) NOT NULL CHECK (transmission IN ('Automatic', 'Manual')),
    seating_capacity INTEGER NOT NULL CHECK (seating_capacity >= 2),
    luggage_capacity INTEGER NOT NULL DEFAULT 2,
    daily_rate DECIMAL(10, 2) NOT NULL CHECK (daily_rate > 0),
    status VARCHAR(25) DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'RENTED', 'MAINTENANCE', 'RESERVED')),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES vehicle_categories(category_id) ON DELETE RESTRICT,
    FOREIGN KEY (current_branch_id) REFERENCES branches(branch_id) ON DELETE RESTRICT
);

-- ============================================================================
-- 7. VEHICLE FEATURES TABLE
-- Normalized features for each vehicle (e.g., GPS, Sunroof, Apple CarPlay)
-- ============================================================================
CREATE TABLE vehicle_features (
    feature_id INTEGER PRIMARY KEY,
    vehicle_id INTEGER NOT NULL,
    feature_name VARCHAR(80) NOT NULL,
    feature_value VARCHAR(100),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- ============================================================================
-- 8. BOOKINGS TABLE
-- Core transactional entity binding customer, vehicle, dates, and financials
-- ============================================================================
CREATE TABLE bookings (
    booking_id INTEGER PRIMARY KEY,
    booking_reference VARCHAR(30) NOT NULL UNIQUE,
    customer_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
    pickup_branch_id INTEGER NOT NULL,
    return_branch_id INTEGER NOT NULL,
    pickup_datetime TIMESTAMP NOT NULL,
    return_datetime TIMESTAMP NOT NULL,
    actual_return_datetime TIMESTAMP,
    rental_duration_days INTEGER NOT NULL CHECK (rental_duration_days >= 1),
    daily_rate_applied DECIMAL(10, 2) NOT NULL,
    subtotal_amount DECIMAL(10, 2) NOT NULL,
    addon_amount DECIMAL(10, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2) NOT NULL DEFAULT 200.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    booking_status VARCHAR(25) DEFAULT 'CONFIRMED' CHECK (booking_status IN ('PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer_profiles(customer_id) ON DELETE RESTRICT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE RESTRICT,
    FOREIGN KEY (pickup_branch_id) REFERENCES branches(branch_id) ON DELETE RESTRICT,
    FOREIGN KEY (return_branch_id) REFERENCES branches(branch_id) ON DELETE RESTRICT
);

-- ============================================================================
-- 9. RENTAL AGREEMENTS TABLE
-- Legal contract signed between customer and rental agency
-- ============================================================================
CREATE TABLE rental_agreements (
    agreement_id INTEGER PRIMARY KEY,
    booking_id INTEGER NOT NULL UNIQUE,
    agreement_number VARCHAR(35) NOT NULL UNIQUE,
    terms_version VARCHAR(20) DEFAULT 'v2.4-2026',
    terms_accepted BOOLEAN NOT NULL DEFAULT TRUE,
    digital_signature_hash VARCHAR(128) NOT NULL,
    insurance_policy_number VARCHAR(50),
    deposit_refund_status VARCHAR(25) DEFAULT 'HELD' CHECK (deposit_refund_status IN ('HELD', 'REFUNDED', 'FORFEITED', 'PARTIAL')),
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);

-- ============================================================================
-- 10. PAYMENTS TABLE
-- Multi-mode payment transaction auditing
-- ============================================================================
CREATE TABLE payments (
    payment_id INTEGER PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    invoice_number VARCHAR(35) NOT NULL UNIQUE,
    transaction_reference VARCHAR(64) NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(30) NOT NULL CHECK (payment_method IN ('Credit Card', 'Debit Card', 'UPI / NetBanking', 'Cash', 'Corporate Account')),
    payment_status VARCHAR(20) DEFAULT 'SUCCESS' CHECK (payment_status IN ('SUCCESS', 'PENDING', 'FAILED', 'REFUNDED')),
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE RESTRICT
);

-- ============================================================================
-- 11. VEHICLE INSPECTIONS TABLE
-- Pre-trip and post-trip condition auditing (damage, odometer, fuel)
-- ============================================================================
CREATE TABLE vehicle_inspections (
    inspection_id INTEGER PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
    inspection_type VARCHAR(20) NOT NULL CHECK (inspection_type IN ('PRE_RENTAL', 'POST_RENTAL')),
    inspector_user_id INTEGER NOT NULL,
    odometer_reading INTEGER NOT NULL,
    fuel_level_percentage INTEGER NOT NULL CHECK (fuel_level_percentage BETWEEN 0 AND 100),
    exterior_condition VARCHAR(50) DEFAULT 'CLEAN / NO NEW DAMAGE',
    interior_condition VARCHAR(50) DEFAULT 'CLEAN',
    damage_notes TEXT,
    passed_safety_check BOOLEAN DEFAULT TRUE,
    inspected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE RESTRICT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE RESTRICT,
    FOREIGN KEY (inspector_user_id) REFERENCES users(user_id) ON DELETE RESTRICT
);

-- ============================================================================
-- 12. MAINTENANCE LOGS TABLE
-- Fleet maintenance, servicing cycles, and expense tracking
-- ============================================================================
CREATE TABLE maintenance_logs (
    log_id INTEGER PRIMARY KEY,
    vehicle_id INTEGER NOT NULL,
    service_type VARCHAR(60) NOT NULL,
    description TEXT,
    service_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    service_date DATE NOT NULL,
    odometer_at_service INTEGER NOT NULL,
    service_provider VARCHAR(120) NOT NULL,
    maintenance_status VARCHAR(25) DEFAULT 'COMPLETED' CHECK (maintenance_status IN ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- ============================================================================
-- DATABASE PERFORMANCE INDEXES
-- Optimizes transactional lookups, reporting, and foreign key traversals
-- ============================================================================
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_category ON vehicles(category_id);
CREATE INDEX idx_vehicles_branch ON vehicles(current_branch_id);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_vehicle ON bookings(vehicle_id);
CREATE INDEX idx_bookings_dates ON bookings(pickup_datetime, return_datetime);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_customer_license ON customer_profiles(driver_license_number);

-- ============================================================================
-- DATABASE REPORTING VIEWS
-- Business Intelligence and Real-Time Operational Analytics
-- ============================================================================

-- View 1: Active Rentals with Driver & Vehicle Details
CREATE VIEW v_active_rentals AS
SELECT 
    b.booking_reference,
    u.full_name AS customer_name,
    u.phone_number,
    cp.driver_license_number,
    v.make || ' ' || v.model AS vehicle_model,
    v.license_plate,
    b.pickup_datetime,
    b.return_datetime,
    pb.branch_name AS pickup_location,
    rb.branch_name AS return_location,
    b.total_amount
FROM bookings b
JOIN customer_profiles cp ON b.customer_id = cp.customer_id
JOIN users u ON cp.user_id = u.user_id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
JOIN branches pb ON b.pickup_branch_id = pb.branch_id
JOIN branches rb ON b.return_branch_id = rb.branch_id
WHERE b.booking_status = 'ACTIVE';

-- View 2: Fleet Summary and Availability by Vehicle Category
CREATE VIEW v_fleet_summary_by_category AS
SELECT 
    vc.category_name,
    COUNT(v.vehicle_id) AS total_vehicles,
    SUM(CASE WHEN v.status = 'AVAILABLE' THEN 1 ELSE 0 END) AS available_count,
    SUM(CASE WHEN v.status = 'RENTED' THEN 1 ELSE 0 END) AS rented_count,
    SUM(CASE WHEN v.status = 'MAINTENANCE' THEN 1 ELSE 0 END) AS maintenance_count,
    ROUND(AVG(v.daily_rate), 2) AS avg_daily_rate
FROM vehicle_categories vc
LEFT JOIN vehicles v ON vc.category_id = v.category_id
GROUP BY vc.category_id, vc.category_name;

-- View 3: Revenue Analytics by Branch
CREATE VIEW v_revenue_analytics AS
SELECT 
    br.branch_name,
    COUNT(b.booking_id) AS total_bookings_processed,
    SUM(b.subtotal_amount) AS rental_revenue,
    SUM(b.addon_amount) AS addon_revenue,
    SUM(b.tax_amount) AS total_tax_collected,
    SUM(b.total_amount) AS gross_total_revenue
FROM branches br
JOIN bookings b ON br.branch_id = b.pickup_branch_id
WHERE b.booking_status IN ('CONFIRMED', 'ACTIVE', 'COMPLETED')
GROUP BY br.branch_id, br.branch_name;

-- View 4: Overdue Rentals Alert View
CREATE VIEW v_overdue_rentals AS
SELECT 
    b.booking_reference,
    u.full_name AS customer_name,
    u.phone_number,
    v.make || ' ' || v.model AS vehicle_name,
    v.license_plate,
    b.return_datetime AS expected_return
FROM bookings b
JOIN customer_profiles cp ON b.customer_id = cp.customer_id
JOIN users u ON cp.user_id = u.user_id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.booking_status = 'ACTIVE' 
  AND b.return_datetime < CURRENT_TIMESTAMP;
