// Supplier Qualification Data Generator
// Install: npm install @faker-js/faker
// Run: node generate-supplier-data.js

import { faker } from '@faker-js/faker';
import fs from 'fs';

const randomItem = (arr) => arr[faker.number.int({ min: 0, max: arr.length - 1 })];
const randomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate 80 supplier profiles
function generateSuppliers() {
  const countries = [
    { name: 'Vietnam', cities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'] },
    { name: 'China', cities: ['Shenzhen', 'Shanghai', 'Guangzhou', 'Beijing'] },
    { name: 'Mexico', cities: ['Monterrey', 'Guadalajara', 'Tijuana'] },
    { name: 'Thailand', cities: ['Bangkok', 'Chiang Mai', 'Phuket'] },
    { name: 'India', cities: ['Bangalore', 'Mumbai', 'Chennai', 'Pune'] },
    { name: 'Poland', cities: ['Warsaw', 'Krakow', 'Wroclaw'] },
    { name: 'Malaysia', cities: ['Kuala Lumpur', 'Penang', 'Johor Bahru'] },
    { name: 'Taiwan', cities: ['Taipei', 'Taichung', 'Kaohsiung'] }
  ];

  const certifications = ['ISO9001', 'ISO14001', 'IATF16949', 'ISO13485', 'ISO27001', 'OHSAS18001'];
  const products = [
    'electronic components', 'pcb assembly', 'sensors', 'connectors', 'switches',
    'cables', 'power supplies', 'motors', 'displays', 'housings', 'fasteners'
  ];
  const ownership = ['private', 'public', 'family_owned', 'foreign_owned'];
  const creditRatings = ['AAA', 'AA', 'A+', 'A', 'A-', 'BBB+', 'BBB', 'BBB-', 'BB+', 'BB', 'B+', 'B'];
  const paymentTerms = ['Net 30', 'Net 45', 'Net 60', 'Net 90', '2/10 Net 30'];
  const qualitySystems = ['ISO9001:2015', 'ISO9001:2008', 'IATF16949:2016', 'AS9100', 'ISO13485:2016'];

  const suppliers = [];

  for (let i = 0; i < 80; i++) {
    const country = randomItem(countries);
    const city = randomItem(country.cities);
    const yearsInBusiness = faker.number.int({ min: 3, max: 30 });
    
    suppliers.push({
      supplier_id: `SUP-${faker.number.int({ min: 1000, max: 9999 })}`,
      company_name: `${faker.company.name()} ${randomItem(['Manufacturing', 'Industries', 'Ltd', 'Corp', 'Co.', 'Systems'])}`,
      country: country.name,
      city: city,
      years_in_business: yearsInBusiness,
      employee_count: faker.number.int({ min: 50, max: 1500 }),
      ownership: randomItem(ownership),
      certifications: randomItems(certifications, faker.number.int({ min: 1, max: 4 })),
      annual_capacity: faker.number.int({ min: 500000, max: 5000000 }),
      current_utilization: parseFloat(faker.number.float({ min: 0.55, max: 0.95, fractionDigits: 2 })),
      primary_products: randomItems(products, faker.number.int({ min: 2, max: 4 })),
      secondary_products: randomItems(products, faker.number.int({ min: 1, max: 3 })),
      lead_time_days: faker.number.int({ min: 20, max: 90 }),
      min_order_quantity: faker.number.int({ min: 500, max: 10000 }),
      annual_revenue_usd: faker.number.int({ min: 5000000, max: 50000000 }),
      credit_rating: randomItem(creditRatings),
      payment_terms: randomItem(paymentTerms),
      preferred_currencies: randomItems(['USD', 'EUR', 'GBP', 'CNY', 'JPY'], faker.number.int({ min: 1, max: 2 })),
      languages_spoken: ['English', country.name === 'Vietnam' ? 'Vietnamese' : 
                         country.name === 'China' ? 'Mandarin' :
                         country.name === 'Mexico' ? 'Spanish' :
                         country.name === 'Thailand' ? 'Thai' :
                         country.name === 'India' ? 'Hindi' :
                         country.name === 'Poland' ? 'Polish' :
                         country.name === 'Malaysia' ? 'Malay' : 'Mandarin'],
      quality_mgmt_system: randomItem(qualitySystems)
    });
  }

  return suppliers;
}

// Generate 250 historical supplier relationships
function generateSupplierHistory() {
  const countries = ['Vietnam', 'China', 'Mexico', 'Thailand', 'India', 'Poland', 'Malaysia', 'Taiwan'];
  const products = ['electronic components', 'pcb assembly', 'sensors', 'connectors', 'switches', 'cables'];
  const outcomes = ['highly_successful', 'successful', 'satisfactory', 'problematic', 'terminated_early'];
  const issues = [
    'occasional shipping delays during monsoon season',
    'documentation errors in first 6 months',
    'quality escape incidents',
    'communication challenges',
    'capacity constraints during peak season',
    'customs clearance delays',
    'packaging issues',
    'late deliveries',
    'inconsistent quality',
    'pricing disputes'
  ];
  const strengths = [
    'excellent communication',
    'flexible with urgent orders',
    'continuous improvement mindset',
    'strong technical capabilities',
    'responsive customer service',
    'competitive pricing',
    'reliable delivery',
    'high quality standards',
    'good problem-solving',
    'transparent operations'
  ];

  const history = [];

  for (let i = 0; i < 250; i++) {
    const startYear = faker.number.int({ min: 2015, max: 2021 });
    const durationYears = faker.number.float({ min: 1.0, max: 8.0, fractionDigits: 2 });
    const outcome = randomItem(outcomes);
    const isSuccessful = ['highly_successful', 'successful', 'satisfactory'].includes(outcome);
    
    history.push({
      relationship_id: `REL-${String(i + 1).padStart(3, '0')}`,
      supplier_id: `SUP-HIST-${String(i + 1).padStart(3, '0')}`,
      company_name: `${faker.company.name()} ${randomItem(['Manufacturing', 'Industries', 'Ltd'])}`,
      country: randomItem(countries),
      employee_count: faker.number.int({ min: 80, max: 800 }),
      products: randomItems(products, faker.number.int({ min: 1, max: 3 })),
      start_date: `${startYear}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}-01`,
      end_date: outcome === 'terminated_early' ? 
        `${startYear + Math.floor(durationYears)}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}-01` :
        durationYears < 5 ? 
          `${startYear + Math.floor(durationYears)}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}-01` :
          null,
      relationship_duration_years: parseFloat(durationYears.toFixed(2)),
      total_orders: faker.number.int({ min: 20, max: 250 }),
      total_value_usd: faker.number.int({ min: 500000, max: 10000000 }),
      avg_defect_rate: parseFloat(faker.number.float({ 
        min: isSuccessful ? 0.010 : 0.040, 
        max: isSuccessful ? 0.035 : 0.080, 
        fractionDigits: 3 
      })),
      on_time_delivery_rate: parseFloat(faker.number.float({ 
        min: isSuccessful ? 0.85 : 0.65, 
        max: isSuccessful ? 0.98 : 0.82, 
        fractionDigits: 2 
      })),
      response_time_hours: faker.number.int({ min: 2, max: 48 }),
      quality_incidents: faker.number.int({ min: 0, max: isSuccessful ? 5 : 15 }),
      issues_encountered: randomItems(issues, faker.number.int({ min: isSuccessful ? 0 : 2, max: isSuccessful ? 2 : 5 })),
      strengths: randomItems(strengths, faker.number.int({ min: isSuccessful ? 3 : 1, max: isSuccessful ? 6 : 3 })),
      overall_rating: parseFloat(faker.number.float({ 
        min: isSuccessful ? 3.8 : 2.0, 
        max: isSuccessful ? 4.9 : 3.5, 
        fractionDigits: 1 
      })),
      overall_outcome: outcome,
      would_recommend: isSuccessful,
      notes: faker.company.catchPhrase()
    });
  }

  return history;
}

// Generate 80 financial data records
function generateFinancials(suppliers) {
  return suppliers.map(supplier => {
    const revenueGrowth = parseFloat(faker.number.float({ min: -0.05, max: 0.25, fractionDigits: 2 }));
    const isHealthy = supplier.credit_rating.startsWith('A') || supplier.credit_rating.startsWith('BBB');
    
    return {
      supplier_id: supplier.supplier_id,
      year: 2024,
      revenue_usd: supplier.annual_revenue_usd,
      revenue_growth_yoy: revenueGrowth,
      profit_margin: parseFloat(faker.number.float({ 
        min: isHealthy ? 0.08 : 0.02, 
        max: isHealthy ? 0.18 : 0.10, 
        fractionDigits: 2 
      })),
      debt_to_equity: parseFloat(faker.number.float({ 
        min: isHealthy ? 0.2 : 0.6, 
        max: isHealthy ? 0.6 : 1.5, 
        fractionDigits: 2 
      })),
      current_ratio: parseFloat(faker.number.float({ 
        min: isHealthy ? 1.3 : 0.8, 
        max: isHealthy ? 2.5 : 1.3, 
        fractionDigits: 1 
      })),
      quick_ratio: parseFloat(faker.number.float({ 
        min: isHealthy ? 1.0 : 0.5, 
        max: isHealthy ? 2.0 : 1.0, 
        fractionDigits: 1 
      })),
      credit_score: faker.number.int({ min: isHealthy ? 65 : 40, max: isHealthy ? 95 : 65 }),
      credit_rating: supplier.credit_rating,
      days_sales_outstanding: faker.number.int({ min: 30, max: 90 }),
      inventory_turnover: parseFloat(faker.number.float({ min: 4.0, max: 12.0, fractionDigits: 1 })),
      bankruptcy_risk: isHealthy ? 'low' : randomItem(['low', 'medium', 'medium', 'high']),
      financial_stability_score: parseFloat(faker.number.float({ 
        min: isHealthy ? 7.0 : 4.0, 
        max: isHealthy ? 9.5 : 7.0, 
        fractionDigits: 1 
      }))
    };
  });
}

// Generate 80 regional benchmarks
function generateRegionalBenchmarks() {
  const regions = [
    { region: 'Southeast Asia', countries: ['Vietnam', 'Thailand', 'Malaysia', 'Indonesia', 'Philippines'] },
    { region: 'East Asia', countries: ['China', 'Taiwan', 'South Korea', 'Japan'] },
    { region: 'South Asia', countries: ['India', 'Bangladesh', 'Pakistan', 'Sri Lanka'] },
    { region: 'Eastern Europe', countries: ['Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria'] },
    { region: 'Latin America', countries: ['Mexico', 'Brazil', 'Colombia', 'Chile', 'Argentina'] },
    { region: 'North Africa', countries: ['Egypt', 'Morocco', 'Tunisia'] },
    { region: 'Middle East', countries: ['Turkey', 'UAE', 'Saudi Arabia'] }
  ];

  const industries = [
    'Electronics Manufacturing', 'Automotive Components', 'Textiles', 
    'Machinery', 'Plastics', 'Metal Fabrication', 'Chemicals', 
    'Pharmaceuticals', 'Food Processing', 'Packaging'
  ];
  const certifications = ['ISO9001', 'ISO14001', 'IATF16949', 'ISO13485'];
  const issues = [
    'shipping delays during monsoon', 'documentation accuracy', 'language barriers',
    'customs clearance delays', 'quality consistency', 'capacity constraints',
    'infrastructure limitations', 'currency fluctuation impact'
  ];
  const successFactors = [
    'strong technical capabilities', 'competitive pricing', 'improving infrastructure',
    'skilled workforce', 'government support', 'established supply chains',
    'quality focus', 'innovation capability'
  ];
  const riskFactors = [
    'political stability concerns', 'currency fluctuation', 'supply chain disruptions',
    'regulatory changes', 'natural disasters', 'infrastructure gaps',
    'talent retention', 'intellectual property concerns'
  ];

  const benchmarks = [];

  regions.forEach(reg => {
    reg.countries.forEach(country => {
      industries.forEach(industry => {
        benchmarks.push({
          region: reg.region,
          country: country,
          industry: industry,
          avg_defect_rate: parseFloat(faker.number.float({ min: 0.020, max: 0.055, fractionDigits: 3 })),
          avg_on_time_delivery: parseFloat(faker.number.float({ min: 0.82, max: 0.95, fractionDigits: 2 })),
          avg_lead_time_days: faker.number.int({ min: 28, max: 65 }),
          avg_labor_cost_hourly_usd: parseFloat(faker.number.float({ min: 2.0, max: 15.0, fractionDigits: 1 })),
          avg_shipping_cost_usd_per_kg: parseFloat(faker.number.float({ min: 1.5, max: 5.0, fractionDigits: 1 })),
          typical_payment_terms: randomItem(['Net 30', 'Net 45', 'Net 60']),
          common_certifications: randomItems(certifications, 2),
          common_issues: randomItems(issues, faker.number.int({ min: 2, max: 4 })),
          success_factors: randomItems(successFactors, faker.number.int({ min: 2, max: 4 })),
          risk_factors: randomItems(riskFactors, faker.number.int({ min: 2, max: 4 }))
        });
      });
    });
  });

  return benchmarks.slice(0, 80);
}

// Generate all data and save to files
function generateAllData() {
  console.log('Generating supplier qualification data...');

  const suppliers = generateSuppliers();
  console.log(`✓ Generated ${suppliers.length} suppliers`);

  const supplierHistory = generateSupplierHistory();
  console.log(`✓ Generated ${supplierHistory.length} supplier relationships`);

  const financials = generateFinancials(suppliers);
  console.log(`✓ Generated ${financials.length} financial records`);

  const benchmarks = generateRegionalBenchmarks();
  console.log(`✓ Generated ${benchmarks.length} regional benchmarks`);

  // Create data directory if it doesn't exist
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  // Write files
  fs.writeFileSync('./data/suppliers.json', JSON.stringify(suppliers, null, 2));
  fs.writeFileSync('./data/supplier_history.json', JSON.stringify(supplierHistory, null, 2));
  fs.writeFileSync('./data/supplier_financials.json', JSON.stringify(financials, null, 2));
  fs.writeFileSync('./data/regional_benchmarks.json', JSON.stringify(benchmarks, null, 2));

  console.log('\n✅ All files generated successfully in ./data/ directory');
  console.log(`Total records: ${suppliers.length + supplierHistory.length + financials.length + benchmarks.length}`);
}

// Run the generator
generateAllData();