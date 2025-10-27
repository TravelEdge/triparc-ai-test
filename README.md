# TripArc AI Developer Take-Home Test Data

This repository contains pre-generated sample data for the TripArc Senior AI Developer take-home assignment.

## What's Included

### Restaurant Expansion Intelligence (`/restaurant`)
- `cities.json` - 50 candidate cities with demographics and market data
- `historical_expansions.json` - 200 past expansion attempts with outcomes (for RAG)
- `market_data.json` - 50 market analysis records
- `existing_locations.json` - 100 current location performance records
- **Total: ~400 records**

### Supplier Qualification System (`/supplier`)
- `suppliers.json` - 80 supplier profiles with certifications and capabilities
- `supplier_history.json` - 250 historical supplier relationships (for RAG)
- `supplier_financials.json` - 80 financial data records
- `regional_benchmarks.json` - 80 regional/industry benchmarks
- **Total: ~490 records**

### Event Venue Recommendation Engine (`/venue`)
- `venues.json` - 120 venue profiles with amenities and pricing
- `event_history.json` - 500 past event/venue matches (for RAG)
- `current_requests.json` - 30 sample event requests
- `client_profiles.json` - 80 client profiles with preferences
- **Total: ~730 records**

## How to Use

1. Choose your scenario (restaurant/supplier/venue)
2. Download the JSON files from the appropriate folder
3. Place them in your project
4. Start building your multi-agent AI system!

## Data Format

All files are in JSON format with realistic, varied data including:
- Rich historical records perfect for vector embeddings
- Success factors, challenges, and outcomes
- Performance metrics and ratings
- Detailed notes and feedback

## Questions?

This data is provided to help you focus on AI architecture and RAG implementation rather than data generation. If you have any questions, please reach out!