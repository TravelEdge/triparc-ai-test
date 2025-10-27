# Senior AI Developer Take-Home Assignment
## Option 1: Restaurant Expansion Intelligence System

**Time Expectation:** 3-4 hours

---

## Business Context

A restaurant chain operates 50 locations across the US. They want to expand to 3 new cities in 2026 and need a data-driven system to analyze potential markets and generate recommendations.

## Your Task

Build a multi-agent AI system that:
- Retrieves data about potential expansion cities from multiple sources
- Uses specialized AI agents to analyze different aspects
- Implements RAG pattern to find similar successful expansions
- Generates comprehensive expansion recommendations with reasoning

---

## Must Have Requirements

### 1. Multi-Agent System (Minimum 3 Agents)
Create at least 3 specialized agents that work together:
- **Market Analysis Agent** - Demographics, population trends, income levels
- **Financial Analysis Agent** - Cost projections, ROI estimates, real estate costs
- **Competition Agent** - Restaurant density, competitor analysis, market saturation
- **Orchestrator/Coordinator** (recommended) - Routes tasks and synthesizes findings

### 2. RAG Implementation
**This is a core requirement:**
- Create embeddings for historical expansion data (at least 10 past expansions)
- Implement vector search to find similar successful cases
- Retrieve relevant historical context when analyzing new cities
- Use retrieved examples to inform agent recommendations

Example historical data to vectorize:
```json
{
  "expansion_id": "EXP-2019-DEN",
  "city": "Denver, CO",
  "year": 2019,
  "opening_cost": 480000,
  "time_to_profitability_months": 7,
  "year_1_revenue": 1800000,
  "success_factors": ["growing tech sector", "favorable demographics", "limited competition"],
  "outcome": "highly_successful"
}
```

### 3. Data Layer (Local Only)
Provide sample data for at least 8 candidate cities:
```json
{
  "city_id": "ATX",
  "name": "Austin, TX",
  "population": 950000,
  "median_income": 75000,
  "existing_locations": 2,
  "avg_rent_psf": 45,
  "restaurant_density": "high",
  "region": "Southwest"
}
```

### 4. API Endpoint
**Request:**
```
POST /api/expansion/analyze
{
  "target_count": 3,
  "budget_per_location": 500000
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "city_id": "ATX",
      "city_name": "Austin, TX",
      "ranking": 1,
      "recommendation": "Strong candidate for expansion",
      "analysis": {
        "market_agent": "Austin shows strong demographic alignment...",
        "financial_agent": "Based on historical data, projected ROI of 18%...",
        "competition_agent": "While density is high, analysis shows...",
        "similar_expansions": "Vector search found Denver 2019, Nashville 2020..."
      }
    }
  ]
}
```

### 5. Documentation
- README with setup instructions (< 5 min to run)
- Architecture explanation and agent design
- RAG implementation details:
  - How you vectorized historical data
  - Embedding model choice (OpenAI, sentence-transformers, etc.)
  - Vector store choice (ChromaDB, FAISS, etc.)
  - Retrieval strategy
- Example API usage

---

## Bonus Points (Optional)

### Advanced RAG Features
- **Hierarchical embeddings** - City-level + detail-level embeddings
- **Metadata filtering** - Filter by region, success level, time period
- **Multi-stage retrieval** - Broad search then focused re-ranking
- **Hybrid search** - Combine vector and keyword search

### Additional Agents
- **Risk Assessment Agent** - Location risks, market volatility
- **Logistics Agent** - Supply chain, distribution center proximity
- **Regulatory Agent** - Zoning, permits, local regulations

### Technical Enhancements
- **Local AI model** - Use Ollama/LM Studio with docker-compose
- **Agent observability** - Logging/tracing of agent interactions
- **Streaming responses** - Real-time agent updates
- **Error handling** - Retry logic, fallbacks between agents
- **Unit tests** - Test agent coordination and retrieval

### Advanced Analysis
- **Confidence scoring** - Rate certainty of recommendations
- **Scenario comparison** - "What if we had $750k budget instead?"
- **Interactive follow-up** - Agent can answer clarifying questions

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

**Download all data files from:** `https://github.com/TravelEdge/triparc-ai-test/tree/main/ai-test-data/restaurant`

We've provided ready-to-use JSON files with substantial data for meaningful testing:

### 1. cities.json (50 cities)
Candidate cities with demographics, market data, and economic indicators.

### 2. historical_expansions.json (200 records)  
Past expansion attempts with outcomes, success factors, challenges, and ROI data. **Use this for RAG/vector search - this is your primary embedding dataset.**

### 3. market_data.json (50 records)
Market analysis data for each city including competition, trends, and costs.

### 4. existing_locations.json (100 records)
Performance data from current restaurant locations across various cities.

**Total: ~400 records for comprehensive RAG testing**

Simply download the files, place them in your project, and start implementing your agents!
### Sample Data Structure

Each file contains records like these (simplified for reference):

**cities.json:**
```json
{
  "city_id": "ATX",
  "name": "Austin, TX",
  "population": 950000,
  "median_income": 75000,
  "region": "Southwest",
  "restaurant_density": "high"
}
```

**historical_expansions.json:**
```json
{
  "expansion_id": "EXP-2019-DEN",
  "city_name": "Denver, CO",
  "opening_cost": 480000,
  "year_1_revenue": 1800000,
  "outcome": "highly_successful",
  "success_factors": ["growing tech sector", "favorable demographics"],
  "notes": "Strong performance in tech-heavy downtown area"
}
```

See the downloaded files for complete field lists and all 250 records.

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

If you need clarification, please reach out. We're here to help!

Good luck! 🚀