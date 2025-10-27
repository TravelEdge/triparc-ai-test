# Senior AI Developer Take-Home Assignment
## Option 2: Supplier Qualification System

**Time Expectation:** 3-4 hours

---

## Business Context

A manufacturing company sources components from 50+ suppliers globally. They need to evaluate new potential suppliers quickly and consistently before onboarding. The evaluation must consider financial stability, quality history, operational capacity, and compliance.

## Your Task

Build a multi-agent AI system that:
- Retrieves supplier data from multiple sources
- Uses specialized AI agents to evaluate different criteria
- Implements RAG pattern to find similar supplier profiles and outcomes
- Generates comprehensive qualification reports with risk assessment

---

## Must Have Requirements

### 1. Multi-Agent System (Minimum 3 Agents)
Create at least 3 specialized agents that work together:
- **Financial Analysis Agent** - Revenue, credit rating, payment terms, stability
- **Quality Assessment Agent** - Certifications, defect rates, industry standards
- **Operational Capability Agent** - Capacity, lead times, employee count, scalability
- **Orchestrator/Coordinator** (recommended) - Routes tasks and synthesizes findings

### 2. RAG Implementation
**This is a core requirement:**
- Create embeddings for historical supplier relationships (at least 10 past suppliers)
- Implement vector search to find similar supplier profiles
- Retrieve relevant historical outcomes when evaluating new suppliers
- Use retrieved examples to inform risk assessments

Example historical data to vectorize:
```json
{
  "supplier_id": "SUP-HIST-042",
  "company_name": "TechParts Vietnam Ltd",
  "country": "Vietnam",
  "employee_count": 380,
  "products": ["electronic components", "pcb assembly"],
  "relationship_duration_years": 4,
  "avg_defect_rate": 0.028,
  "on_time_delivery": 0.91,
  "issues_encountered": ["occasional shipping delays", "documentation errors"],
  "overall_outcome": "successful",
  "notes": "Reliable partner after initial 6-month ramp-up period"
}
```

### 3. Data Layer (Local Only)
Provide sample data for at least 6-8 suppliers to evaluate:
```json
{
  "supplier_id": "SUP-2847",
  "company_name": "Acme Manufacturing Ltd",
  "country": "Vietnam",
  "years_in_business": 12,
  "employee_count": 450,
  "certifications": ["ISO9001", "ISO14001"],
  "annual_capacity": 2000000,
  "primary_products": ["electronic components", "pcb assembly"],
  "annual_revenue_usd": 15000000,
  "credit_rating": "B+",
  "payment_terms": "Net 60"
}
```

### 4. API Endpoint
**Request:**
```
POST /api/suppliers/evaluate
{
  "supplier_ids": ["SUP-2847", "SUP-1923"],
  "requirements": {
    "min_capacity": 500000,
    "required_certifications": ["ISO9001"],
    "max_lead_time_days": 45
  }
}
```

**Response:**
```json
{
  "evaluations": [
    {
      "supplier_id": "SUP-2847",
      "recommendation": "Qualified with monitoring recommended",
      "analysis": {
        "financial_agent": "Stable revenue growth over 5 years. Credit rating B+ acceptable for tier 2 suppliers. Comparing to similar Vietnamese suppliers...",
        "quality_agent": "ISO certifications current. Vietnam region avg defect rate 3.2%. Their category typically requires...",
        "operational_agent": "450 employees and 2M capacity meets requirements. Lead time analysis suggests...",
        "similar_suppliers": "Vector search found TechParts Vietnam (4yr success), MegaParts Thailand (3yr success)..."
      },
      "risk_factors": ["Payment terms longer than standard", "Limited shipping options"],
      "next_steps": "Request quality samples, conduct virtual facility tour"
    }
  ]
}
```

### 5. Documentation
- README with setup instructions (< 5 min to run)
- Architecture explanation and agent design
- RAG implementation details:
  - How you vectorized supplier data
  - Embedding model choice
  - Vector store choice
  - Similarity metrics used
- Example API usage

---

## Bonus Points (Optional)

### Advanced RAG Features
- **Multi-modal embeddings** - Combine company profile + performance metrics + certifications
- **Country/region clustering** - Group similar geographic risk profiles
- **Temporal awareness** - Weight recent performance more heavily
- **Attribute filtering** - Pre-filter by certifications before vector search

### Additional Agents
- **Compliance & Regulatory Agent** - Export controls, sanctions, trade regulations
- **Reputation Agent** - Industry reviews, third-party audits, references
- **Logistics Agent** - Shipping routes, customs, delivery reliability

### Technical Enhancements
- **Local AI model** - Use Ollama/LM Studio with docker-compose
- **Comparative analysis** - Side-by-side supplier comparisons
- **Risk scoring visualization** - Generate risk heat maps
- **Audit trail** - Track evaluation history and decisions
- **Unit tests** - Test retrieval accuracy and agent logic

### Advanced Analysis
- **Confidence intervals** - Statistical confidence in recommendations
- **What-if scenarios** - "What if defect rate increases by 2%?"
- **Portfolio balancing** - Recommend mix of suppliers by risk/region
- **Cost-benefit analysis** - Trade-offs between cost and quality/reliability

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

**Download all data files from:** `https://github.com/Traveledge/ai-test-data/tree/main/supplier`

We've provided ready-to-use JSON files with substantial data for meaningful testing:

### 1. suppliers.json (80 suppliers)
Supplier profiles with certifications, capacity, financials, and capabilities.

### 2. supplier_history.json (250 records)
Historical supplier relationships with performance metrics, issues, and outcomes. **Use this for RAG/vector search - this is your primary embedding dataset.**

### 3. supplier_financials.json (80 records)
Detailed financial data for each supplier.

### 4. regional_benchmarks.json (80 records)
Industry benchmarks by region, country, and sector for comparison.

**Total: ~490 records for comprehensive RAG testing**

Simply download the files, place them in your project, and start implementing your agents!

### Sample Data Structure

Each file contains records like these (simplified for reference):

**suppliers.json:**
```json
{
  "supplier_id": "SUP-2847",
  "company_name": "Acme Manufacturing Ltd",
  "country": "Vietnam",
  "years_in_business": 12,
  "certifications": ["ISO9001", "ISO14001"],
  "annual_capacity": 2000000,
  "credit_rating": "B+"
}
```

**supplier_history.json:**
```json
{
  "relationship_id": "REL-042",
  "company_name": "TechParts Vietnam Ltd",
  "country": "Vietnam",
  "relationship_duration_years": 4.75,
  "avg_defect_rate": 0.028,
  "overall_outcome": "successful",
  "notes": "Reliable partner after initial ramp-up period"
}
```

See the downloaded files for complete field lists and all 340 records.

---

## Evaluation Criteria

We'll evaluate your submission on:

**Architecture & Design**
- How agents are designed and coordinate with each other
- Separation of concerns and scalability considerations
- Overall system design decisions

**RAG Implementation**
- Vectorization strategy and approach
- Retrieval quality and relevance
- How retrieved context is integrated into agent reasoning

**AI Integration**
- Prompt engineering quality
- How effectively agents reason and analyze
- Context management between agents

**Implementation Quality**
- Code organization and readability
- Error handling and edge cases
- Choice of frameworks and tools

**Documentation**
- Clarity of setup instructions
- Explanation of architectural decisions
- RAG approach documented

---

## Deliverables

1. **GitHub Repository** with complete code
2. **README.md** with all documentation
3. **Sample data** included in repo
4. **Example output** showing agents working together
5. **.env.example** with configuration template

---

## Questions?

If you need clarification, please reach out. We're here to help!

Good luck! 🚀