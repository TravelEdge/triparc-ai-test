# Senior AI Developer Take-Home Assignment
## Option 3: Event Venue Recommendation Engine

**Time Expectation:** 3-4 hours

---

## Business Context

A corporate event planning company books 200+ events annually. They need to match client requirements with optimal venues from their network of 100+ properties. The system must consider capacity, amenities, location, cost, and historical performance to generate personalized recommendations.

## Your Task

Build a multi-agent AI system that:
- Retrieves venue data and event requirements from multiple sources
- Uses specialized AI agents to analyze different matching criteria
- Implements RAG pattern to find similar successful event matches
- Generates ranked venue recommendations with detailed reasoning

---

## Must Have Requirements

### 1. Multi-Agent System (Minimum 3 Agents)
Create at least 3 specialized agents that work together:
- **Capacity & Space Agent** - Attendee fit, room layouts, breakout spaces
- **Amenity Matching Agent** - Required equipment, services, catering
- **Location Agent** - Geographic preferences, accessibility, nearby accommodations
- **Cost Analysis Agent** - Budget fit, value assessment, hidden costs
- **Orchestrator/Coordinator** (recommended) - Routes tasks and synthesizes findings

### 2. RAG Implementation
**This is a core requirement:**
- Create embeddings for historical event matches (at least 15 past events)
- Implement vector search to find similar successful event/venue pairings
- Retrieve relevant historical performance when recommending venues
- Use retrieved examples to improve matching accuracy

Example historical data to vectorize:
```json
{
  "event_id": "EVT-2024-156",
  "event_type": "corporate_conference",
  "attendee_count": 280,
  "venue_id": "VEN-442",
  "venue_name": "Pacific Convention Center",
  "city": "San Diego, CA",
  "client_rating": 4.7,
  "feedback": "Excellent AV support, staff very responsive, parking was tight",
  "success_factors": ["great breakout rooms", "in-house catering", "tech support"],
  "challenges": ["parking logistics", "last-minute room changes"],
  "outcome": "highly_successful",
  "would_recommend": true
}
```

### 3. Data Layer (Local Only)
Provide sample data:

**Event Requirements:**
```json
{
  "event_id": "EVT-2026-089",
  "event_type": "corporate_conference",
  "attendee_count": 250,
  "duration_days": 2,
  "dates": ["2026-03-15", "2026-03-16"],
  "budget": 75000,
  "location_preference": "West Coast",
  "required_amenities": ["av_equipment", "breakout_rooms", "catering", "wifi"],
  "event_style": "hybrid_in_person_virtual"
}
```

**8-10 Venue Profiles:**
```json
{
  "venue_id": "VEN-442",
  "name": "Pacific Convention Center",
  "city": "San Diego, CA",
  "max_capacity": 500,
  "meeting_rooms": 8,
  "daily_rate": 12000,
  "amenities": ["av_equipment", "catering", "wifi", "parking", "virtual_streaming"],
  "features": ["ocean_views", "outdoor_space", "tech_support_staff"],
  "past_events_count": 47,
  "avg_client_rating": 4.6
}
```

### 4. API Endpoint
**Request:**
```
POST /api/venues/recommend
{
  "event_id": "EVT-2026-089",
  "top_n": 3
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "venue_id": "VEN-442",
      "venue_name": "Pacific Convention Center",
      "ranking": 1,
      "estimated_cost": 68000,
      "analysis": {
        "capacity_agent": "Venue capacity of 500 provides comfortable buffer for 250 attendees. 8 meeting rooms allow for concurrent breakout sessions...",
        "amenity_agent": "All required amenities available in-house. AV equipment modern and well-maintained. Virtual streaming capability matches hybrid requirement...",
        "location_agent": "San Diego on West Coast as requested. Airport 15min, 12 hotels within walking distance. March weather typically excellent...",
        "cost_agent": "Total estimated $68k within $75k budget. Daily rate includes most services. Comparing to similar venues shows competitive pricing...",
        "similar_events": "Vector search found 8 similar corporate conferences at this venue: March 2024 Tech Summit (4.8 rating), September 2024 Sales Kickoff (4.7)..."
      },
      "strengths": ["Proven track record with similar events", "All amenities in-house", "Strong tech support"],
      "considerations": ["Parking can be tight for large events", "Book catering early"]
    }
  ]
}
```

### 5. Documentation
- README with setup instructions (< 5 min to run)
- Architecture explanation and agent design
- RAG implementation details:
  - How you vectorized event history
  - Embedding strategy (event + venue + outcome)
  - Vector store choice
  - Matching/similarity approach
- Example API usage

---

## Bonus Points (Optional)

### Advanced RAG Features
- **Multi-faceted embeddings** - Separate embeddings for event type, venue features, client feedback
- **Semantic search** - Match on intent not just keywords (e.g., "team building" → venues with "collaborative spaces")
- **Negative examples** - Learn from unsuccessful matches
- **Hybrid ranking** - Combine vector similarity with hard constraints (capacity, dates)

### Additional Agents
- **Date Availability Agent** - Calendar checking, seasonal considerations
- **Client History Agent** - Previous bookings, preferences, special requirements
- **Vendor Coordination Agent** - Third-party services, equipment rental needs
- **Budget Optimization Agent** - Cost-saving suggestions, upgrade options

### Technical Enhancements
- **Local AI model** - Use Ollama/LM Studio with docker-compose
- **Alternative suggestions** - "No exact match, but here are close alternatives..."
- **Explanation quality** - Why venue X ranked higher than venue Y
- **Confidence scoring** - How certain is the recommendation?
- **Unit tests** - Test matching logic and retrieval accuracy

### Advanced Analysis
- **Multi-event booking** - Optimize across multiple events simultaneously
- **Seasonal patterns** - Best venues by time of year
- **Client clustering** - Group similar clients and their preferences
- **Price sensitivity analysis** - Budget vs. quality trade-offs
- **Interactive refinement** - "Show me options with outdoor space"

---

## Technical Requirements

### Technical Implementation
- **Framework:** Your choice (LangChain, Semantic Kernel, n8n, AutoGen, etc.)
- **Language:** Python, .NET, or JavaScript/TypeScript
- **Data Storage:** Local (SQLite, JSON, in-memory) preferred, but cloud databases are fine
- **AI Provider:** Bring your own API key OR use local models (Ollama/Docker)
- **Vector Database:** Local (ChromaDB, FAISS) preferred, but cloud services (Pinecone, Azure AI Search) are fine
- **Deployment:** We prefer to run locally for evaluation, so document any cloud setup needed

---

## Sample Data Files (Provided)

**Download all data files from:** `https://github.com/TravelEdge/triparc-ai-test/tree/main/ai-test-data/venue`

We've provided ready-to-use JSON files with substantial data for meaningful testing:

### 1. venues.json (120 venues)
Venue profiles with capacity, amenities, pricing, and location details.

### 2. event_history.json (500 records)
Past event/venue matches with ratings, feedback, and outcomes. **Use this for RAG/vector search - this is your primary embedding dataset.**

### 3. current_requests.json (30 records)
Sample event requests to test your recommendation system.

### 4. client_profiles.json (80 records)
Client preferences and booking history.

**Total: ~730 records for comprehensive RAG testing**

Simply download the files, place them in your project, and start implementing your agents!

### Sample Data Structure

Each file contains records like these (simplified for reference):

**venues.json:**
```json
{
  "venue_id": "VEN-442",
  "name": "Pacific Convention Center",
  "city": "San Diego, CA",
  "max_capacity": 500,
  "daily_rate": 12000,
  "amenities": ["av_equipment", "catering", "wifi"],
  "avg_client_rating": 4.6
}
```

**event_history.json:**
```json
{
  "event_id": "EVT-2024-156",
  "event_type": "corporate_conference",
  "attendee_count": 280,
  "venue_name": "Pacific Convention Center",
  "client_rating": 4.7,
  "outcome": "highly_successful",
  "positive_feedback": ["Excellent AV support", "Staff very responsive"],
  "notes": "Client praised the tech support team"
}
```

See the downloaded files for complete field lists and all 470 records.

---

## Evaluation Criteria

We'll evaluate your submission on:

**Architecture & Design (35%)**
- How agents are designed and coordinate with each other
- Separation of concerns and scalability considerations
- Overall system design decisions

**RAG Implementation (25%)**
- Vectorization strategy and approach
- Retrieval quality and relevance
- How retrieved context is integrated into agent reasoning

**AI Integration (20%)**
- Prompt engineering quality
- How effectively agents reason and analyze
- Context management between agents

**Implementation Quality (15%)**
- Code organization and readability
- Error handling and edge cases (data may have inconsistencies)
- Choice of frameworks and tools
- Data normalization approach

**Documentation (5%)**
- Clarity of setup instructions
- Explanation of architectural decisions
- RAG approach documented

**Note**: During the technical interview, you'll be asked to explain design choices, modify code live, and discuss trade-offs you made. We evaluate engineering judgment, not just code output.

---

## Deliverables

1. **GitHub Repository** with complete code
2. **README.md** with all documentation
3. **Sample data** included in repo (or clear instructions to load provided data)
4. **Example output** showing agents working together
5. **.env.example** with configuration template
6. **n8n Workflow Export** (if using n8n) - Include `workflow-export.json` with complete workflow

## Important Notes

**On Data Quality:**
The provided JSON files contain real-world data with some intentional variability:
- Field names may vary slightly between records
- Some optional fields may be missing in certain records
- You'll need to implement proper data validation and normalization

Handling these edge cases is part of the evaluation.

**On AI Tool Usage:**
You may use AI assistants (GitHub Copilot, ChatGPT, etc.) as you would in normal development. However, you must be able to:
- Explain every design decision you made
- Modify your code live during the technical interview
- Debug issues on the spot
- Discuss alternative approaches and trade-offs

We're evaluating your engineering judgment and problem-solving ability, not just working code.

---

## Questions?

If you encounter blocking issues or need clarification, please reach out. We're here to help!

Good luck! 🚀