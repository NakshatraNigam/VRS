-- ============================================================================
-- INDUSTRY PRACTICE PROJECT: VEHICLE RENTAL MANAGEMENT SYSTEM (VRMS)
-- ADVANCED ANALYTICAL & OPERATIONAL SQL QUERIES
-- ============================================================================

-- QUERY 1: Active Rental Details with Customer Contact & Duration
-- Used by front-desk agents to track current vehicles on the road
SELECT 
    b.booking_reference,
    u.full_name AS customer_name,
    u.phone_number,
    cp.driver_license_number,
    v.make || ' ' || v.model AS vehicle_rented,
    v.license_plate,
    b.pickup_datetime,
    b.return_datetime,
    b.rental_duration_days,
    b.total_amount
FROM bookings b
JOIN customer_profiles cp ON b.customer_id = cp.customer_id
JOIN users u ON cp.user_id = u.user_id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.booking_status = 'ACTIVE'
ORDER BY b.return_datetime ASC;

-- QUERY 2: Fleet Category Performance & Utilization Analysis
-- Used by Fleet Managers to analyze vehicle demand, revenue, and idle rates
SELECT 
    vc.category_name,
    COUNT(v.vehicle_id) AS total_vehicles,
    SUM(CASE WHEN v.status = 'AVAILABLE' THEN 1 ELSE 0 END) AS available_units,
    SUM(CASE WHEN v.status = 'RENTED' THEN 1 ELSE 0 END) AS active_rentals,
    SUM(CASE WHEN v.status = 'MAINTENANCE' THEN 1 ELSE 0 END) AS maintenance_units,
    ROUND((CAST(SUM(CASE WHEN v.status = 'RENTED' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(v.vehicle_id)) * 100, 1) AS utilization_rate_pct,
    ROUND(AVG(v.daily_rate), 2) AS avg_daily_rate
FROM vehicle_categories vc
LEFT JOIN vehicles v ON vc.category_id = v.category_id
GROUP BY vc.category_id, vc.category_name
ORDER BY utilization_rate_pct DESC;

-- QUERY 3: Branch Revenue & Transaction Audit
-- Used by Finance/Executive Management to evaluate branch profitability
SELECT 
    br.branch_name,
    br.city,
    COUNT(b.booking_id) AS total_bookings,
    SUM(b.subtotal_amount) AS base_rental_revenue,
    SUM(b.addon_amount) AS addon_revenue,
    SUM(b.tax_amount) AS taxes_collected,
    SUM(b.total_amount) AS gross_revenue
FROM branches br
JOIN bookings b ON br.branch_id = b.pickup_branch_id
WHERE b.booking_status IN ('CONFIRMED', 'ACTIVE', 'COMPLETED')
GROUP BY br.branch_id, br.branch_name, br.city
ORDER BY gross_revenue DESC;

-- QUERY 4: High-Value Customer Loyalty & Rental Frequency Ranking
-- Used for CRM marketing and loyalty reward program tier upgrades
SELECT 
    u.full_name,
    u.email,
    cp.loyalty_tier,
    cp.loyalty_points,
    COUNT(b.booking_id) AS lifetime_rentals,
    SUM(b.total_amount) AS lifetime_spend
FROM customer_profiles cp
JOIN users u ON cp.user_id = u.user_id
LEFT JOIN bookings b ON cp.customer_id = b.customer_id
GROUP BY cp.customer_id, u.full_name, u.email, cp.loyalty_tier, cp.loyalty_points
ORDER BY lifetime_spend DESC;

-- QUERY 5: Fleet Maintenance Schedule & Expense Summary
-- Highlights maintenance expenditure and vehicles under service
SELECT 
    v.license_plate,
    v.make || ' ' || v.model AS vehicle_model,
    v.odometer_km,
    ml.service_type,
    ml.service_cost,
    ml.service_date,
    ml.service_provider,
    ml.maintenance_status
FROM maintenance_logs ml
JOIN vehicles v ON ml.vehicle_id = v.vehicle_id
ORDER BY ml.service_date DESC;
