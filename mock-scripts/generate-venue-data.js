// Event Venue Data Generator
// Install: npm install @faker-js/faker
// Run: node generate-venue-data.js

import { faker } from '@faker-js/faker';
import fs from 'fs';

const randomItem = (arr) => arr[faker.number.int({ min: 0, max: arr.length - 1 })];
const randomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate 120 venue profiles
function generateVenues() {
  const cities = [
    { name: 'San Diego, CA', state: 'CA', region: 'West Coast' },
    { name: 'San Francisco, CA', state: 'CA', region: 'West Coast' },
    { name: 'Los Angeles, CA', state: 'CA', region: 'West Coast' },
    { name: 'Seattle, WA', state: 'WA', region: 'West Coast' },
    { name: 'Portland, OR', state: 'OR', region: 'West Coast' },
    { name: 'Austin, TX', state: 'TX', region: 'Southwest' },
    { name: 'Dallas, TX', state: 'TX', region: 'Southwest' },
    { name: 'Phoenix, AZ', state: 'AZ', region: 'Southwest' },
    { name: 'Denver, CO', state: 'CO', region: 'Mountain' },
    { name: 'Chicago, IL', state: 'IL', region: 'Midwest' },
    { name: 'Boston, MA', state: 'MA', region: 'Northeast' },
    { name: 'New York, NY', state: 'NY', region: 'Northeast' },
    { name: 'Miami, FL', state: 'FL', region: 'Southeast' },
    { name: 'Atlanta, GA', state: 'GA', region: 'Southeast' }
  ];

  const venueTypes = ['hotel', 'convention_center', 'conference_center', 'resort', 'university', 'historic_venue'];
  const venueNameTypes = ['Center', 'Hall', 'Convention Center', 'Hotel & Conference Center', 'Resort', 'Pavilion'];
  const amenities = [
    'av_equipment', 'catering', 'wifi', 'parking', 'virtual_streaming',
    'breakout_rooms', 'stage', 'green_room', 'coat_check', 'registration_area'
  ];
  const features = [
    'ocean_views', 'mountain_views', 'city_views', 'outdoor_space', 'rooftop_terrace',
    'tech_support_staff', 'loading_dock', 'accessible', 'natural_light', 'historic_architecture'
  ];
  const cateringOptions = ['in_house', 'preferred_vendors', 'bring_your_own', 'multiple_options'];
  const policies = ['30_days', '60_days', '90_days', 'flexible', 'non_refundable'];

  const venues = [];

  for (let i = 0; i < 120; i++) {
    const city = randomItem(cities);
    const venueType = randomItem(venueTypes);
    const capacity = faker.number.int({ min: 100, max: 1000 });
    const dailyRate = faker.number.int({ min: 5000, max: 25000 });

    venues.push({
      venue_id: `VEN-${faker.number.int({ min: 100, max: 999 })}`,
      name: `${faker.company.name()} ${randomItem(venueNameTypes)}`,
      venue_type: venueType,
      city: city.name,
      state: city.state,
      region: city.region,
      address: `${faker.location.streetAddress()}, ${city.name}`,
      established_year: faker.number.int({ min: 1990, max: 2020 }),
      max_capacity: capacity,
      min_capacity: Math.floor(capacity * 0.1),
      total_sqft: faker.number.int({ min: 15000, max: 50000 }),
      meeting_rooms: faker.number.int({ min: 4, max: 20 }),
      largest_room_sqft: faker.number.int({ min: 5000, max: 15000 }),
      ballroom_capacity: Math.floor(capacity * 0.8),
      daily_rate: dailyRate,
      half_day_rate: Math.floor(dailyRate * 0.6),
      setup_fee: faker.number.int({ min: 1000, max: 3000 }),
      amenities: randomItems(amenities, faker.number.int({ min: 5, max: 9 })),
      features: randomItems(features, faker.number.int({ min: 2, max: 6 })),
      catering_options: randomItems(cateringOptions, faker.number.int({ min: 1, max: 2 })),
      av_included: faker.datatype.boolean(),
      parking_spaces: faker.number.int({ min: 50, max: 400 }),
      nearby_hotels: faker.number.int({ min: 3, max: 25 }),
      airport_distance_miles: parseFloat(faker.number.float({ min: 2.0, max: 30.0, fractionDigits: 1 })),
      public_transit: faker.datatype.boolean(),
      past_events_count: faker.number.int({ min: 10, max: 150 }),
      avg_client_rating: parseFloat(faker.number.float({ min: 3.8, max: 4.9, fractionDigits: 1 })),
      cancellation_policy: randomItem(policies)
    });
  }

  return venues;
}

// Generate 500 historical event matches
function generateEventHistory(venues) {
  const eventTypes = [
    'corporate_conference', 'training', 'product_launch', 'gala', 'awards_ceremony',
    'trade_show', 'workshop', 'team_building', 'annual_meeting', 'client_appreciation'
  ];
  const eventStyles = ['in_person', 'hybrid_in_person_virtual', 'virtual'];
  const requirements = [
    'large main hall', 'breakout rooms', 'streaming capability', 'stage',
    'outdoor space', 'flexible seating', 'natural light', 'tech support'
  ];
  const requirementsMet = ['capacity', 'amenities', 'location', 'budget', 'dates', 'style'];
  const positiveFeedback = [
    'Excellent AV support throughout',
    'Staff very responsive to last-minute changes',
    'Breakout rooms perfect size',
    'Virtual streaming worked flawlessly',
    'Great natural light in main hall',
    'Food was exceptional',
    'Easy check-in process',
    'Tech support team was outstanding',
    'Beautiful venue atmosphere',
    'Perfect location for attendees'
  ];
  const negativeFeedback = [
    'Parking was tight during peak hours',
    'Catering setup took longer than expected',
    'Some AV equipment needed troubleshooting',
    'Temperature control issues in one room',
    'Noise from adjacent event',
    'WiFi struggled with high usage',
    'Registration area too small',
    'Limited elevator access'
  ];
  const outcomes = ['highly_successful', 'successful', 'satisfactory', 'below_expectations'];

  const events = [];
  const venueSubset = venues.slice(0, 60); // Use subset for variety

  for (let i = 0; i < 500; i++) {
    const venue = randomItem(venueSubset);
    const eventType = randomItem(eventTypes);
    const attendeeCount = faker.number.int({ min: 50, max: Math.floor(venue.max_capacity * 0.9) });
    const outcome = randomItem(outcomes);
    const isSuccess = ['highly_successful', 'successful'].includes(outcome);
    const year = faker.number.int({ min: 2020, max: 2024 });
    const month = faker.number.int({ min: 1, max: 12 });
    
    const venueCost = venue.daily_rate * faker.number.int({ min: 1, max: 3 });
    const cateringCost = attendeeCount * faker.number.int({ min: 50, max: 120 });
    const totalCost = venueCost + cateringCost + faker.number.int({ min: 5000, max: 15000 });

    events.push({
      event_id: `EVT-${year}-${String(i + 1).padStart(3, '0')}`,
      event_name: `${faker.company.name()} ${eventType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} ${year}`,
      event_type: eventType,
      client_id: `CLI-${faker.number.int({ min: 100, max: 999 })}`,
      client_name: faker.company.name(),
      attendee_count: attendeeCount,
      duration_days: faker.number.int({ min: 1, max: 3 }),
      event_dates: [`${year}-${String(month).padStart(2, '0')}-15`, `${year}-${String(month).padStart(2, '0')}-16`],
      venue_id: venue.venue_id,
      venue_name: venue.name,
      city: venue.city,
      total_cost: totalCost,
      venue_cost: venueCost,
      catering_cost: cateringCost,
      av_cost: faker.number.int({ min: 3000, max: 12000 }),
      other_costs: faker.number.int({ min: 2000, max: 10000 }),
      budget_met: isSuccess || faker.datatype.boolean(),
      event_style: randomItem(eventStyles),
      key_requirements: randomItems(requirements, faker.number.int({ min: 3, max: 6 })),
      requirements_met: randomItems(requirementsMet, faker.number.int({ min: isSuccess ? 5 : 3, max: 6 })),
      client_rating: parseFloat(faker.number.float({ 
        min: isSuccess ? 4.2 : 3.0, 
        max: isSuccess ? 4.9 : 4.0, 
        fractionDigits: 1 
      })),
      venue_rating: parseFloat(faker.number.float({ min: isSuccess ? 4.3 : 3.2, max: isSuccess ? 4.9 : 4.1, fractionDigits: 1 })),
      catering_rating: parseFloat(faker.number.float({ min: isSuccess ? 4.0 : 3.0, max: isSuccess ? 4.8 : 4.0, fractionDigits: 1 })),
      av_rating: parseFloat(faker.number.float({ min: isSuccess ? 4.2 : 3.1, max: isSuccess ? 4.9 : 4.0, fractionDigits: 1 })),
      overall_satisfaction: parseFloat(faker.number.float({ 
        min: isSuccess ? 4.2 : 3.0, 
        max: isSuccess ? 4.9 : 4.0, 
        fractionDigits: 1 
      })),
      positive_feedback: randomItems(positiveFeedback, faker.number.int({ min: isSuccess ? 3 : 1, max: isSuccess ? 6 : 3 })),
      negative_feedback: randomItems(negativeFeedback, faker.number.int({ min: isSuccess ? 0 : 2, max: isSuccess ? 2 : 4 })),
      success_factors: randomItems([
        'great breakout rooms', 'in-house tech support', 'flexible staff',
        'ocean views', 'modern facilities', 'excellent catering', 'ample parking'
      ], faker.number.int({ min: 2, max: 5 })),
      challenges: isSuccess ? 
        randomItems(['parking logistics', 'last-minute room changes', 'weather'], faker.number.int({ min: 0, max: 2 })) :
        randomItems(['capacity issues', 'AV problems', 'catering delays', 'poor communication'], faker.number.int({ min: 2, max: 4 })),
      outcome: outcome,
      would_rebook: isSuccess,
      would_recommend: isSuccess,
      rebooking_likelihood: parseFloat(faker.number.float({ 
        min: isSuccess ? 0.7 : 0.2, 
        max: isSuccess ? 1.0 : 0.5, 
        fractionDigits: 1 
      })),
      notes: faker.company.catchPhrase()
    });
  }

  return events;
}

// Generate 30 current event requests
function generateEventRequests() {
  const eventTypes = [
    'corporate_conference', 'training', 'product_launch', 'gala', 'annual_meeting'
  ];
  const regions = ['West Coast', 'East Coast', 'Midwest', 'Southwest', 'Southeast'];
  const amenities = [
    'av_equipment', 'breakout_rooms', 'catering', 'wifi', 'parking',
    'virtual_streaming', 'stage', 'outdoor_space'
  ];
  const styles = ['in_person', 'hybrid_in_person_virtual'];
  const flexibility = ['firm', 'some_flexibility', 'flexible'];

  const requests = [];

  for (let i = 0; i < 30; i++) {
    const year = 2026;
    const month = faker.number.int({ min: 1, max: 12 });
    const attendeeCount = faker.number.int({ min: 100, max: 500 });
    
    requests.push({
      event_id: `EVT-${year}-${String(i + 1).padStart(3, '0')}`,
      client_id: `CLI-${faker.number.int({ min: 100, max: 999 })}`,
      client_name: faker.company.name(),
      event_name: `${faker.company.catchPhrase()} ${year}`,
      event_type: randomItem(eventTypes),
      attendee_count: attendeeCount,
      duration_days: faker.number.int({ min: 1, max: 3 }),
      preferred_dates: [`${year}-${String(month).padStart(2, '0')}-15`, `${year}-${String(month).padStart(2, '0')}-16`],
      flexible_dates: faker.datatype.boolean(),
      date_flexibility_days: faker.number.int({ min: 3, max: 14 }),
      budget: faker.number.int({ min: 40000, max: 150000 }),
      budget_flexibility: randomItem(flexibility),
      location_preference: randomItem(regions),
      location_requirements: {
        region: [randomItem(regions)],
        cities: randomItems(['San Diego', 'San Francisco', 'Los Angeles', 'Seattle', 'Boston', 'Chicago'], 3),
        max_airport_distance_miles: faker.number.int({ min: 10, max: 30 })
      },
      required_amenities: randomItems(amenities, faker.number.int({ min: 4, max: 6 })),
      preferred_amenities: randomItems(amenities, faker.number.int({ min: 2, max: 4 })),
      event_style: randomItem(styles),
      special_requirements: randomItems([
        'stage for presentations',
        'minimum 4 breakout rooms',
        'dietary restrictions catering',
        'accessible venue required',
        'loading dock access',
        'green room needed'
      ], faker.number.int({ min: 2, max: 4 })),
      past_events_with_us: faker.number.int({ min: 0, max: 8 }),
      client_preferences: randomItems([
        'modern facilities',
        'responsive staff',
        'strong AV support',
        'natural light',
        'flexible spaces',
        'experienced event team'
      ], faker.number.int({ min: 2, max: 4 }))
    });
  }

  return requests;
}

// Generate 80 client profiles
function generateClientProfiles() {
  const industries = [
    'technology', 'financial_services', 'healthcare', 'manufacturing',
    'consulting', 'real_estate', 'media', 'education', 'non_profit'
  ];
  const sizes = ['small', 'medium', 'large', 'enterprise'];
  const eventTypes = ['corporate_conference', 'training', 'gala', 'product_launch', 'team_building'];
  const venueTypes = ['hotel', 'convention_center', 'conference_center', 'resort'];
  const regions = ['West Coast', 'East Coast', 'Midwest', 'Southwest'];
  const tiers = ['bronze', 'silver', 'gold', 'platinum'];

  const clients = [];

  for (let i = 0; i < 80; i++) {
    const eventsPerYear = faker.number.int({ min: 1, max: 12 });
    const totalEvents = faker.number.int({ min: eventsPerYear, max: eventsPerYear * 5 });
    
    clients.push({
      client_id: `CLI-${faker.number.int({ min: 100, max: 999 })}`,
      company_name: faker.company.name(),
      industry: randomItem(industries),
      company_size: randomItem(sizes),
      avg_event_size: faker.number.int({ min: 50, max: 500 }),
      events_per_year: eventsPerYear,
      total_events_booked: totalEvents,
      avg_budget: faker.number.int({ min: 30000, max: 150000 }),
      preferred_regions: randomItems(regions, faker.number.int({ min: 1, max: 3 })),
      preferred_venue_types: randomItems(venueTypes, faker.number.int({ min: 1, max: 2 })),
      required_amenities: randomItems(['av_equipment', 'catering', 'wifi', 'parking'], 3),
      event_types: randomItems(eventTypes, faker.number.int({ min: 2, max: 4 })),
      satisfaction_score: parseFloat(faker.number.float({ min: 3.5, max: 4.9, fractionDigits: 1 })),
      loyalty_tier: randomItem(tiers),
      special_notes: faker.company.catchPhrase()
    });
  }

  return clients;
}

// Generate all data and save to files
function generateAllData() {
  console.log('Generating event venue data...');

  const venues = generateVenues();
  console.log(`✓ Generated ${venues.length} venues`);

  const eventHistory = generateEventHistory(venues);
  console.log(`✓ Generated ${eventHistory.length} historical events`);

  const eventRequests = generateEventRequests();
  console.log(`✓ Generated ${eventRequests.length} current event requests`);

  const clientProfiles = generateClientProfiles();
  console.log(`✓ Generated ${clientProfiles.length} client profiles`);

  // Create data directory if it doesn't exist
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  // Write files
  fs.writeFileSync('./data/venues.json', JSON.stringify(venues, null, 2));
  fs.writeFileSync('./data/event_history.json', JSON.stringify(eventHistory, null, 2));
  fs.writeFileSync('./data/current_requests.json', JSON.stringify(eventRequests, null, 2));
  fs.writeFileSync('./data/client_profiles.json', JSON.stringify(clientProfiles, null, 2));

  console.log('\n✅ All files generated successfully in ./data/ directory');
  console.log(`Total records: ${venues.length + eventHistory.length + eventRequests.length + clientProfiles.length}`);
}

// Run the generator
generateAllData();