# TripArc AI Take-Home Assignment

**Time Budget: 3-4 hours** | Choose one scenario and build a working multi-agent RAG system.

## 🎯 Choose Your Challenge

Pick **ONE** of these AI scenarios:

### [📍 Event Venue Recommendation Engine](tests/event-venue-recommendation-engine.md)
Match corporate events with optimal venues using capacity, amenities, location analysis + RAG.

### [🏪 Restaurant Expansion Intelligence](tests/restuarant-expansion-intelligence-system.md)  
Analyze market opportunities for restaurant expansion using demographics + historical data.

### [📦 Supplier Qualification System](tests/supplier-qualification-system.md)
Evaluate and qualify suppliers based on financials, certifications + performance history.

## 🚀 Quick Implementation Guide

**All scenarios require the same core elements:**
- **3+ AI Agents** (Capacity, Location, Cost, etc.)
- **RAG System** (vector search on historical data)  
- **API Endpoint** (POST /api/{domain}/recommend)
- **< 5 min setup** (clear README required)

See [implementation notes](docs/submission-guidelines.md) for details.

## 📊 Sample Data Included

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

## Quick Setup Examples

**Python**: [3-file FastAPI setup](docs/python-setup.md)  
**Node.js**: [Single file Express server](docs/nodejs-setup.md)  
**n8n**: [Visual workflow](docs/n8n-workflow-setup-simple.md)  
**.NET**: [Minimal API](docs/dotnet-minimal-setup.md)  
**Other**: [Any language](docs/custom-implementation-setup.md)

## 💡 Success Strategy (3-4 Hours)

**Hour 1**: Setup + Basic API  
**Hour 2**: Implement 3 core agents  
**Hour 3**: Add RAG system  
**Hour 4**: Polish + documentation  

👉 **Focus on working over perfect!**

## 🎯 What We're Looking For

- **Working system** that processes requests end-to-end
- **Clear agent separation** with distinct responsibilities  
- **RAG integration** using the historical data files
- **Easy setup** - we should be able to run it in < 5 minutes
- **Problem-solving skills** - data isn't perfect, handling edge cases matters

## 📋 Submission Checklist

- [ ] Working API endpoint (POST /api/{domain}/recommend)
- [ ] 3+ agents with clear roles (Capacity, Amenity, Location, etc.)
- [ ] RAG system using historical events/expansions/relationships
- [ ] README with setup instructions (< 5 min)
- [ ] .env.example with required API keys
- [ ] Response format matches assignment specification

---
**Time Budget: 3-4 hours** | **Goal: Working multi-agent RAG system**

Ready to start? Pick your scenario above and follow the quick setup guide! 🚀