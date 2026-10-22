-- ============================================================================
-- INDUSTRY PRACTICE PROJECT: VEHICLE RENTAL MANAGEMENT SYSTEM (VRMS)
-- COMPREHENSIVE SEED DATA SCRIPT
-- ============================================================================

-- 1. Insert Branches
INSERT INTO branches (branch_id, branch_name, branch_code, street_address, city, state, postal_code, phone_number, email, operating_hours) VALUES
(1, 'Downtown Hub & Headquarters', 'BR-DWTN', '100 Metro Boulevard', 'Metropolis', 'NY', '10001', '+1 (555) 234-5678', 'downtown@drivepulse.com', '24/7 Full Service'),
(2, 'International Airport Terminal 1', 'BR-AIR1', 'Terminal 1 Level 2 Arrival', 'Metropolis', 'NY', '11430', '+1 (555) 876-5432', 'airport@drivepulse.com', '24/7 Full Service'),
(3, 'Silicon Valley Tech Park Hub', 'BR-TECH', '450 Innovation Parkway', 'San Jose', 'CA', '95134', '+1 (555) 345-6789', 'techpark@drivepulse.com', '06:00 AM - 11:00 PM'),
(4, 'Westside Executive Station', 'BR-WEST', '820 Oceanfront Avenue', 'Santa Monica', 'CA', '90401', '+1 (555) 987-6543', 'westside@drivepulse.com', '07:00 AM - 10:00 PM');

-- 2. Insert Roles
INSERT INTO roles (role_id, role_name, description) VALUES
(1, 'System Administrator', 'Full system access, fleet audits, revenue reports, configuration'),
(2, 'Fleet & Operations Manager', 'Vehicle inventory management, maintenance scheduling, fleet metrics'),
(3, 'Rental Desk Agent', 'Front-desk check-in, check-out, vehicle inspection, payment receipts'),
(4, 'Registered Customer', 'Customer account for booking, license verification, billing history');

-- 3. Insert Users (Admins, Staff, and Customers)
INSERT INTO users (user_id, role_id, full_name, email, password_hash, phone_number, status) VALUES
(1, 1, 'Alexander Wright', 'admin@drivepulse.com', 'argon2id$v=19$m=65536,t=3,p=4$adminhash', '+1 (555) 101-0001', 'ACTIVE'),
(2, 2, 'Elena Rostova', 'fleet.manager@drivepulse.com', 'argon2id$v=19$m=65536,t=3,p=4$fleethash', '+1 (555) 101-0002', 'ACTIVE'),
(3, 3, 'Marcus Vance', 'counter.agent@drivepulse.com', 'argon2id$v=19$m=65536,t=3,p=4$agenthash', '+1 (555) 101-0003', 'ACTIVE'),
(4, 4, 'Sarah Jenkins', 'sarah.jenkins@example.com', 'argon2id$v=19$m=65536,t=3,p=4$userhash1', '+1 (555) 201-1101', 'ACTIVE'),
(5, 4, 'David Chen', 'david.chen@example.com', 'argon2id$v=19$m=65536,t=3,p=4$userhash2', '+1 (555) 201-1102', 'ACTIVE'),
(6, 4, 'Priya Sharma', 'priya.sharma@example.com', 'argon2id$v=19$m=65536,t=3,p=4$userhash3', '+1 (555) 201-1103', 'ACTIVE'),
(7, 4, 'Michael Rodriguez', 'm.rodriguez@example.com', 'argon2id$v=19$m=65536,t=3,p=4$userhash4', '+1 (555) 201-1104', 'ACTIVE'),
(8, 4, 'Emma Watson', 'emma.watson@example.com', 'argon2id$v=19$m=65536,t=3,p=4$userhash5', '+1 (555) 201-1105', 'ACTIVE');

-- 4. Insert Customer Profiles
INSERT INTO customer_profiles (customer_id, user_id, driver_license_number, license_expiry_date, issuing_country_state, date_of_birth, verification_status, emergency_contact_name, emergency_contact_phone, loyalty_tier, loyalty_points) VALUES
(1, 4, 'DL-NY-9823412', '2028-08-15', 'New York, USA', '1992-05-14', 'VERIFIED', 'Robert Jenkins', '+1 (555) 902-1111', 'GOLD', 450),
(2, 5, 'DL-CA-4491029', '2027-11-20', 'California, USA', '1988-10-03', 'VERIFIED', 'Lisa Chen', '+1 (555) 902-2222', 'PLATINUM', 820),
(3, 6, 'DL-TX-7738291', '2029-03-30', 'Texas, USA', '1995-12-22', 'VERIFIED', 'Rajesh Sharma', '+1 (555) 902-3333', 'SILVER', 200),
(4, 7, 'DL-IL-1192837', '2026-10-18', 'Illinois, USA', '1990-07-09', 'VERIFIED', 'Sofia Rodriguez', '+1 (555) 902-4444', 'BRONZE', 100),
(5, 8, 'DL-WA-8849201', '2028-01-14', 'Washington, USA', '1993-04-19', 'VERIFIED', 'James Watson', '+1 (555) 902-5555', 'SILVER', 250);

-- 5. Insert Vehicle Categories
INSERT INTO vehicle_categories (category_id, category_name, description, base_daily_rate, security_deposit, min_driver_age) VALUES
(1, 'Executive Luxury', 'Flagship German sedans and executive cruisers offering utmost comfort and prestige', 125.00, 350.00, 25),
(2, 'Electric & Hybrid (EV)', 'Next-gen zero-emission electric vehicles with cutting-edge autonomous pilot and ultra-fast charging', 95.00, 250.00, 21),
(3, 'Premium SUV & All-Wheel', 'High-riding, spacious luxury SUVs designed for all-terrain capability and executive road trips', 110.00, 300.00, 23),
(4, 'Sports & Performance', 'High-horsepower sports coupes designed for exhilarating driving dynamics', 175.00, 500.00, 25),
(5, 'Comfort Sedan & Compact', 'Fuel-efficient, reliable, and practical everyday vehicles for city transit and economy commutes', 55.00, 150.00, 20);

-- 6. Insert Vehicles
INSERT INTO vehicles (vehicle_id, category_id, current_branch_id, vin, license_plate, make, model, manufacture_year, color, odometer_km, fuel_type, transmission, seating_capacity, luggage_capacity, daily_rate, status, image_url) VALUES
(1, 2, 1, '5YJ3E1EB8LF892110', 'EV-789-NY', 'Tesla', 'Model 3 Long Range', 2024, 'Pearl White', 18450, 'Electric', 'Automatic', 5, 3, 95.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80'),
(2, 1, 1, 'WBA53AH04NC902188', 'LUX-550-NY', 'BMW', '530i M Sport', 2024, 'Carbon Black Metallic', 22100, 'Petrol', 'Automatic', 5, 3, 125.00, 'RENTED', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'),
(3, 3, 2, 'SALWR2V42LA309182', 'SUV-404-NY', 'Range Rover', 'Velar R-Dynamic', 2023, 'Silicon Silver', 31500, 'Petrol', 'Automatic', 5, 4, 135.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1606016159991-d41a87754652?auto=format&fit=crop&w=800&q=80'),
(4, 4, 4, 'WP0AB2A98NS120934', 'SPD-911-CA', 'Porsche', '911 Carrera S', 2024, 'Guards Red', 12300, 'Petrol', 'Automatic', 4, 2, 220.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'),
(5, 1, 3, 'WDD2050401R890123', 'BENZ-204-CA', 'Mercedes-Benz', 'C-Class AMG Line', 2024, 'Selenite Grey', 16800, 'Hybrid', 'Automatic', 5, 3, 115.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'),
(6, 2, 3, '5YJSA1E21NF991024', 'TSL-PLAID', 'Tesla', 'Model S Plaid', 2024, 'Midnight Silver', 9400, 'Electric', 'Automatic', 5, 3, 160.00, 'RENTED', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'),
(7, 3, 1, 'WAUZZZF27NA019284', 'AUDI-Q77-NY', 'Audi', 'Q7 55 TFSI Quattro', 2023, 'Glacier White', 28900, 'Petrol', 'Automatic', 7, 5, 130.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80'),
(8, 4, 4, '1FA6P8CF5L5198273', 'MUS-V88-CA', 'Ford', 'Mustang GT Premium', 2023, 'Grabber Blue', 21400, 'Petrol', 'Automatic', 4, 2, 140.00, 'MAINTENANCE', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80'),
(9, 5, 2, '4T1B11HK5MU192837', 'CAM-771-NY', 'Toyota', 'Camry Hybrid SE', 2024, 'Celestial Silver', 19300, 'Hybrid', 'Automatic', 5, 3, 65.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'),
(10, 5, 1, '1HGCR2F83NA829102', 'HON-442-NY', 'Honda', 'Accord Touring Turbo', 2023, 'Modern Steel', 34200, 'Petrol', 'Automatic', 5, 3, 62.00, 'RENTED', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80'),
(11, 2, 2, 'KM8K23AA7PU091823', 'HYU-ION-5', 'Hyundai', 'Ioniq 5 AWD EV', 2024, 'Cyber Grey', 14200, 'Electric', 'Automatic', 5, 3, 85.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1662581872277-0fd0bf3ae8f6?auto=format&fit=crop&w=800&q=80'),
(12, 3, 3, '5UXTY5C03N9821034', 'BMW-X55-CA', 'BMW', 'X5 xDrive40i', 2024, 'Phytonic Blue', 15800, 'Petrol', 'Automatic', 7, 4, 145.00, 'AVAILABLE', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80');

-- 7. Insert Vehicle Features
INSERT INTO vehicle_features (feature_id, vehicle_id, feature_name, feature_value) VALUES
(1, 1, 'Autopilot Suite', 'Full Self-Driving Computer 3.0'),
(2, 1, 'Audio System', '14-Speaker Immersive Audio with Subwoofer'),
(3, 1, 'Acceleration', '0-60 mph in 4.2 seconds'),
(4, 2, 'Executive Package', 'Harmon Kardon Surround, Head-Up Display'),
(5, 3, 'Terrain Response 2', 'Configurable All-Terrain All-Wheel Dynamics'),
(6, 4, 'Sport Chrono Package', 'Launch Control, Dynamic Engine Mounts'),
(7, 6, 'Tri-Motor AWD', '1,020 HP, 0-60 in 1.99s');

-- 8. Insert Bookings
INSERT INTO bookings (booking_id, booking_reference, customer_id, vehicle_id, pickup_branch_id, return_branch_id, pickup_datetime, return_datetime, actual_return_datetime, rental_duration_days, daily_rate_applied, subtotal_amount, addon_amount, tax_amount, deposit_amount, discount_amount, total_amount, booking_status) VALUES
(1, 'DP-2026-8941', 1, 2, 1, 1, '2026-09-25 09:00:00', '2026-09-29 18:00:00', NULL, 4, 125.00, 500.00, 60.00, 44.80, 350.00, 0.00, 604.80, 'ACTIVE'),
(2, 'DP-2026-8942', 2, 6, 3, 3, '2026-09-26 10:00:00', '2026-09-30 14:00:00', NULL, 4, 160.00, 640.00, 80.00, 57.60, 250.00, 50.00, 727.60, 'ACTIVE'),
(3, 'DP-2026-8943', 3, 10, 1, 2, '2026-09-24 08:30:00', '2026-09-28 17:00:00', NULL, 4, 62.00, 248.00, 32.00, 22.40, 150.00, 0.00, 302.40, 'ACTIVE'),
(4, 'DP-2026-8940', 4, 1, 1, 1, '2026-09-18 10:00:00', '2026-09-22 10:00:00', '2026-09-22 09:45:00', 4, 95.00, 380.00, 40.00, 33.60, 250.00, 0.00, 453.60, 'COMPLETED'),
(5, 'DP-2026-8939', 5, 3, 2, 2, '2026-09-15 14:00:00', '2026-09-19 12:00:00', '2026-09-19 11:30:00', 4, 135.00, 540.00, 60.00, 48.00, 300.00, 54.00, 594.00, 'COMPLETED'),
(6, 'DP-2026-8944', 2, 1, 1, 1, '2026-10-02 09:00:00', '2026-10-06 18:00:00', NULL, 4, 95.00, 380.00, 30.00, 32.80, 250.00, 0.00, 442.80, 'CONFIRMED');

-- 9. Insert Rental Agreements
INSERT INTO rental_agreements (agreement_id, booking_id, agreement_number, terms_version, terms_accepted, digital_signature_hash, insurance_policy_number, deposit_refund_status) VALUES
(1, 1, 'AGR-2026-008941', 'v2.4-2026', TRUE, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'POL-ALLIANZ-88210', 'HELD'),
(2, 2, 'AGR-2026-008942', 'v2.4-2026', TRUE, 'd7a8fbb307d7809469ca933b02dd32a76df51b75aa2830239c2ac2bced0a42c6', 'POL-CHUBB-99128', 'HELD'),
(3, 3, 'AGR-2026-008943', 'v2.4-2026', TRUE, 'f865b53623b121fd34ee5426c792e5c33afec884d0044cdceb838072f707f593', 'POL-LIBERTY-44102', 'HELD'),
(4, 4, 'AGR-2026-008940', 'v2.4-2026', TRUE, 'c2543fff3bfa6f144c383d45ceee42f31ac220e4b82ecd30f00fef0413234728', 'POL-ALLIANZ-88195', 'REFUNDED'),
(5, 5, 'AGR-2026-008939', 'v2.4-2026', TRUE, 'b1946ac92492d2347c6235b4d2611184ceded2eac1d6d335029e416a4f580718', 'POL-ZURICH-77192', 'REFUNDED');

-- 10. Insert Payments
INSERT INTO payments (payment_id, booking_id, invoice_number, transaction_reference, amount, payment_method, payment_status) VALUES
(1, 1, 'INV-2026-08941', 'TXN_CH_9021884129', 604.80, 'Credit Card', 'SUCCESS'),
(2, 2, 'INV-2026-08942', 'TXN_AP_4419203810', 727.60, 'Credit Card', 'SUCCESS'),
(3, 3, 'INV-2026-08943', 'TXN_UP_7728192034', 302.40, 'UPI / NetBanking', 'SUCCESS'),
(4, 4, 'INV-2026-08940', 'TXN_CH_8819203819', 453.60, 'Credit Card', 'SUCCESS'),
(5, 5, 'INV-2026-08939', 'TXN_DB_1192837492', 594.00, 'Debit Card', 'SUCCESS');

-- 11. Insert Vehicle Inspections (Pre and Post Inspections)
INSERT INTO vehicle_inspections (inspection_id, booking_id, vehicle_id, inspection_type, inspector_user_id, odometer_reading, fuel_level_percentage, exterior_condition, interior_condition, damage_notes, passed_safety_check) VALUES
(1, 1, 2, 'PRE_RENTAL', 3, 21850, 100, 'PRISTINE', 'CLEAN', 'No prior marks or scratches observed', TRUE),
(2, 2, 6, 'PRE_RENTAL', 3, 9150, 100, 'PRISTINE', 'CLEAN', 'Vehicle detailing verified; battery charged to 100%', TRUE),
(3, 3, 10, 'PRE_RENTAL', 3, 33950, 95, 'MINOR SCUFF BUMPER', 'CLEAN', 'Small pre-existing scuff on rear bumper passenger side (documented)', TRUE),
(4, 4, 1, 'PRE_RENTAL', 3, 17800, 100, 'PRISTINE', 'CLEAN', 'Fully sanitized', TRUE),
(5, 4, 1, 'POST_RENTAL', 3, 18450, 90, 'PRISTINE', 'CLEAN', 'Vehicle returned in spotless condition; deposit refunded', TRUE);

-- 12. Insert Maintenance Logs
INSERT INTO maintenance_logs (log_id, vehicle_id, service_type, description, service_cost, service_date, odometer_at_service, service_provider, maintenance_status) VALUES
(1, 8, 'Suspension Tuning & Brake Pad Replacement', 'Performance brake pad overhaul and electronic dampener sensor calibration', 680.00, '2026-09-25', 21400, 'Apex Performance Center', 'IN_PROGRESS'),
(2, 7, 'Scheduled 30,000 km Major Service', 'Engine synthetic oil change, air filters, brake fluid flush, and tire rotation', 420.00, '2026-09-10', 28500, 'Audi Authorized Service Center', 'COMPLETED'),
(3, 3, 'All-Terrain Alignment & Balancing', 'Full 4-wheel laser alignment and steering rack calibration', 210.00, '2026-08-28', 30800, 'Rover Specialist Hub', 'COMPLETED'),
(4, 1, 'EV Battery Health & High-Voltage Audit', 'State-of-health battery diagnostics (99.2% capacity verified) and tire swap', 150.00, '2026-08-14', 16200, 'Tesla Service Center', 'COMPLETED');
