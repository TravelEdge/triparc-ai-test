// Restaurant Expansion Data Generator
// Install: npm install @faker-js/faker
// Run: node generate-restaurant-data.js

import { faker } from '@faker-js/faker';
import fs from 'fs';

// Helper function to get random item from array
const randomItem = (arr) => arr[faker.number.int({ min: 0, max: arr.length - 1 })];

// Helper function to get random items from array
const randomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate 50 candidate cities
function generateCities() {
  const regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West Coast'];
  const densities = ['low', 'medium', 'high', 'very_high'];
  const industries = [
    ['technology', 'healthcare', 'education'],
    ['finance', 'tourism', 'manufacturing'],
    ['energy', 'aerospace', 'biotech'],
    ['retail', 'logistics', 'agriculture'],
    ['entertainment', 'real_estate', 'consulting']
  ];

  const cities = [];
  const usedCityIds = new Set();

  for (let i = 0; i < 50; i++) {
    let cityId;
    do {
      cityId = faker.string.alpha({ length: 3, casing: 'upper' });
    } while (usedCityIds.has(cityId));
    usedCityIds.add(cityId);

    const city = faker.location.city();
    const state = faker.location.state({ abbreviated: true });
    
    cities.push({
      city_id: cityId,
      name: `${city}, ${state}`,
      state: state,
      population: faker.number.int({ min: 200000, max: 3000000 }),
      median_income: faker.number.int({ min: 45000, max: 95000 }),
      median_age: faker.number.int({ min: 28, max: 42 }),
      growth_rate: parseFloat(faker.number.float({ min: -0.02, max: 0.05, fractionDigits: 3 })),
      existing_locations: faker.number.int({ min: 0, max: 5 }),
      region: randomItem(regions),
      metro_area: `${city} Metro Area`,
      avg_rent_psf: faker.number.int({ min: 25, max: 75 }),
      restaurant_density: randomItem(densities),
      major_industries: randomItems(industries.flat(), 3),
      unemployment_rate: parseFloat(faker.number.float({ min: 0.025, max: 0.08, fractionDigits: 3 }))
    });
  }

  return cities;
}

// Generate 200 historical expansions
function generateHistoricalExpansions(cities) {
  const outcomes = ['highly_successful', 'successful', 'moderate', 'challenging', 'unsuccessful'];
  const successFactors = [
    'growing tech sector', 'favorable demographics', 'limited direct competition',
    'strong local supplier network', 'high foot traffic area', 'excellent visibility',
    'supportive local government', 'growing population', 'strong tourism',
    'diverse cuisine scene', 'high median income', 'low unemployment',
    'established food culture', 'strong nightlife', 'business district location'
  ];
  const challenges = [
    'higher than expected rent increases', 'initial staffing difficulties',
    'permitting delays', 'supply chain issues', 'parking challenges',
    'higher competition than expected', 'slower customer adoption',
    'seasonal fluctuations', 'local regulations', 'construction delays'
  ];

  const expansions = [];
  const citySubset = cities.slice(0, 30); // Use subset of cities for history

  for (let i = 0; i < 200; i++) {
    const city = randomItem(citySubset);
    const year = faker.number.int({ min: 2015, max: 2024 });
    const outcome = randomItem(outcomes);
    const costMultiplier = outcome === 'highly_successful' ? 0.8 : 
                          outcome === 'successful' ? 1.0 : 1.3;
    
    const openingCost = faker.number.int({ min: 350000, max: 650000 }) * costMultiplier;
    const year1Revenue = openingCost * faker.number.float({ min: 2.5, max: 5.0, fractionDigits: 2 });
    
    expansions.push({
      expansion_id: `EXP-${year}-${faker.string.alpha({ length: 3, casing: 'upper' })}`,
      city_id: city.city_id,
      city_name: city.name,
      opening_date: `${year}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}-15`,
      opening_cost: Math.round(openingCost),
      location_size_sqft: faker.number.int({ min: 2500, max: 5000 }),
      time_to_profitability_months: faker.number.int({ min: 4, max: 18 }),
      year_1_revenue: Math.round(year1Revenue),
      year_2_revenue: Math.round(year1Revenue * faker.number.float({ min: 1.1, max: 1.3 })),
      year_3_revenue: Math.round(year1Revenue * faker.number.float({ min: 1.2, max: 1.5 })),
      peak_revenue: Math.round(year1Revenue * faker.number.float({ min: 1.3, max: 1.8 })),
      staff_count: faker.number.int({ min: 18, max: 35 }),
      avg_customer_rating: parseFloat(faker.number.float({ min: 3.5, max: 4.9, fractionDigits: 1 })),
      success_factors: randomItems(successFactors, faker.number.int({ min: 2, max: 5 })),
      challenges: randomItems(challenges, faker.number.int({ min: 1, max: 3 })),
      outcome: outcome,
      roi_3year: parseFloat(faker.number.float({ min: -0.1, max: 0.35, fractionDigits: 2 })),
      notes: faker.company.catchPhrase()
    });
  }

  return expansions;
}

// Generate 50 market data records
function generateMarketData(cities) {
  const trends = ['increasing', 'stable', 'decreasing', 'volatile'];
  
  return cities.map(city => ({
    city_id: city.city_id,
    year: 2025,
    restaurant_count: faker.number.int({ min: 500, max: 5000 }),
    cuisine_diversity_score: parseFloat(faker.number.float({ min: 5.0, max: 9.5, fractionDigits: 1 })),
    avg_meal_price: faker.number.int({ min: 15, max: 45 }),
    food_delivery_penetration: parseFloat(faker.number.float({ min: 0.35, max: 0.75, fractionDigits: 2 })),
    competition_score: parseFloat(faker.number.float({ min: 3.0, max: 9.0, fractionDigits: 1 })),
    food_scene_rating: parseFloat(faker.number.float({ min: 5.0, max: 9.5, fractionDigits: 1 })),
    tourism_annual_visitors: faker.number.int({ min: 1000000, max: 40000000 }),
    local_supplier_density: randomItem(['low', 'medium', 'high']),
    commercial_rent_trend: randomItem(trends),
    construction_costs_psf: faker.number.int({ min: 150, max: 300 })
  }));
}

// Generate 100 existing location performance records
function generateExistingLocations(cities) {
  const locations = [];
  
  // Generate 100 locations across various cities
  let locationCounter = 1;
  for (let i = 0; i < 100; i++) {
    const city = cities[i % cities.length]; // Cycle through cities
    const openingYear = faker.number.int({ min: 2015, max: 2023 });
    const baseRevenue = faker.number.int({ min: 1500000, max: 3000000 });
    
    locations.push({
      location_id: `LOC-${city.city_id}-${String(locationCounter++).padStart(3, '0')}`,
      city_id: city.city_id,
      opening_year: openingYear,
      annual_revenue_2024: Math.round(baseRevenue * 1.2),
      annual_revenue_2023: Math.round(baseRevenue * 1.1),
      annual_revenue_2022: baseRevenue,
      profit_margin: parseFloat(faker.number.float({ min: 0.08, max: 0.22, fractionDigits: 2 })),
      customer_rating: parseFloat(faker.number.float({ min: 3.8, max: 4.9, fractionDigits: 1 })),
      repeat_customer_rate: parseFloat(faker.number.float({ min: 0.40, max: 0.70, fractionDigits: 2 })),
      avg_wait_time_minutes: faker.number.int({ min: 10, max: 45 }),
      staff_retention_rate: parseFloat(faker.number.float({ min: 0.55, max: 0.85, fractionDigits: 2 })),
      food_cost_percentage: parseFloat(faker.number.float({ min: 0.28, max: 0.38, fractionDigits: 2 })),
      labor_cost_percentage: parseFloat(faker.number.float({ min: 0.25, max: 0.35, fractionDigits: 2 }))
    });
  }

  return locations;
}

// Generate all data and save to files
function generateAllData() {
  console.log('Generating restaurant expansion data...');

  const cities = generateCities();
  console.log(`✓ Generated ${cities.length} cities`);

  const historicalExpansions = generateHistoricalExpansions(cities);
  console.log(`✓ Generated ${historicalExpansions.length} historical expansions`);

  const marketData = generateMarketData(cities);
  console.log(`✓ Generated ${marketData.length} market data records`);

  const existingLocations = generateExistingLocations(cities);
  console.log(`✓ Generated ${existingLocations.length} existing locations`);

  // Create data directory if it doesn't exist
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  // Write files
  fs.writeFileSync('./data/cities.json', JSON.stringify(cities, null, 2));
  fs.writeFileSync('./data/historical_expansions.json', JSON.stringify(historicalExpansions, null, 2));
  fs.writeFileSync('./data/market_data.json', JSON.stringify(marketData, null, 2));
  fs.writeFileSync('./data/existing_locations.json', JSON.stringify(existingLocations, null, 2));

  console.log('\n✅ All files generated successfully in ./data/ directory');
  console.log(`Total records: ${cities.length + historicalExpansions.length + marketData.length + existingLocations.length}`);
}

// Run the generator
generateAllData();