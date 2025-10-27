# Node.js Quick Setup# Node.js Quick Setup



## Installation## Install

```bash

```bashnpm init -y

npm init -ynpm install express

npm install express dotenv```

```

## Structure

Optional for embeddings:```

```bashserver.js    # Express app

npm install @langchain/openai chromadbagents.js    # Agent functions

```rag.js       # RAG logic

```

## Project Structure

## Agent Pattern

``````javascript

your-project/class CapacityAgent {

├── server.js         # Express app    analyze(event, venue) {

├── agents.js         # Agent logic        // Your logic here

├── rag.js            # RAG system        return { score: 0, reason: "..." };

├── .env              # API keys    }

└── data/             # Copy JSON files here}

``````



## 1. Express Server (`server.js`)## Run

```bash

```javascriptnode server.js

const express = require('express');```

const fs = require('fs');

## Tips

const app = express();- Use fs.readFileSync to load JSON

app.use(express.json());- Check for missing fields with optional chaining

- Filter history by event_type for RAG
// Load data at startup
const venues = JSON.parse(fs.readFileSync('./data/venues.json'));
const requests = JSON.parse(fs.readFileSync('./data/current_requests.json'));
const history = JSON.parse(fs.readFileSync('./data/event_history.json'));

app.post('/api/venues/recommend', (req, res) => {
    const { event_id, top_n = 3 } = req.body;
    
    // TODO: Find event by event_id
    // TODO: Create agent instances
    // TODO: Score each venue with agents
    // TODO: Combine and sort scores
    // TODO: Return top N
    
    res.json({ recommendations: [] });
});

app.listen(3000, () => console.log('Server on port 3000'));
```

## 2. Agent Modules (`agents.js`)

```javascript
class CapacityAgent {
    analyze(event, venue) {
        // TODO: Calculate utilization ratio
        // TODO: Score based on optimal range
        // Handle missing max_capacity field
        return { score: 0, reason: "..." };
    }
}

class AmenityAgent {
    analyze(event, venue) {
        // TODO: Match required vs available
        // Use array methods: filter, includes
        // Handle undefined amenities array
        return { score: 0, reason: "..." };
    }
}

class LocationAgent {
    analyze(event, venue) {
        // TODO: Match location preference
        // Compare city/region strings
        return { score: 0, reason: "..." };
    }
}

module.exports = { CapacityAgent, AmenityAgent, LocationAgent };
```

## 3. RAG System (`rag.js`)

```javascript
function findSimilarEvents(targetEvent, history) {
    // Simple filtering approach
    const similar = history.filter(e => {
        const typeMatch = e.event_type === targetEvent.event_type;
        const sizeMatch = Math.abs(
            (e.attendee_count || 0) - (targetEvent.attendee_count || 0)
        ) < 100;
        return typeMatch && sizeMatch;
    });
    
    return similar.slice(0, 5);
}

// Advanced (optional): Use LangChain for vector embeddings
// const { OpenAIEmbeddings } = require('@langchain/openai');

module.exports = { findSimilarEvents };
```

## Running

```bash
node server.js
```

Test with:
```bash
curl -X POST http://localhost:3000/api/venues/recommend \
  -H "Content-Type: application/json" \
  -d '{"event_id": "EVT-2026-001", "top_n": 3}'
```

## Key Tips

- Use `fs.readFileSync()` at startup for sync loading
- Use optional chaining: `venue?.amenities`
- Check arrays exist: `if (Array.isArray(venue.amenities))`
- Field names might vary between records - normalize them
- Filter event_history by event_type and attendee_count
- Return consistent format: `{ score, reason }`

**Score Aggregation:**
```javascript
const scores = agents.map(a => a.analyze(event, venue));
const avgScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
```

## Common Issues

- **Undefined errors**: Use `venue?.field` or check existence first
- **Array errors**: Verify arrays exist before `.filter()` or `.map()`
- **File paths**: Ensure relative paths correct from where you run node
