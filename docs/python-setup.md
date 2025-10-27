# Python Quick Setup# Python Quick Setup



## Installation## Install

```bash

```bashpip install fastapi uvicorn langchain-openai chromadb

pip install fastapi uvicorn langchain-openai chromadb python-dotenv```

```

## Structure

## Project Structure```

main.py      # FastAPI app

```agents.py    # Agent classes  

your-project/rag.py       # RAG logic

├── main.py           # FastAPI app & endpoint```

├── agents.py         # Agent classes

├── rag.py            # RAG/vector search## Agent Pattern

├── .env              # API keys```python

└── data/             # Copy JSON files hereclass CapacityAgent:

```    def analyze(self, event, venue):

        # Your logic here

## 1. FastAPI Endpoint (`main.py`)        return {"score": 0, "reason": "..."}

```

```python

from fastapi import FastAPI## Run

import json```bash

uvicorn main:app --reload

app = FastAPI()```



# Load data at startup## Tips

venues = json.load(open('./data/venues.json'))- Load JSON once at startup

requests = json.load(open('./data/current_requests.json'))- Handle missing fields  

- Start with simple text matching for RAG
@app.post("/api/venues/recommend")
def recommend(request: dict):
    event_id = request['event_id']
    top_n = request.get('top_n', 3)
    
    # TODO: Find event from requests
    # TODO: Run agents on venues
    # TODO: Aggregate scores
    # TODO: Return top N
    
    return {"recommendations": []}
```

## 2. Agent Classes (`agents.py`)

```python
class CapacityAgent:
    def analyze(self, event, venue):
        # TODO: Calculate utilization
        # TODO: Score based on fit
        # Handle missing fields
        return {"score": 0, "reason": "..."}

class AmenityAgent:
    def analyze(self, event, venue):
        # TODO: Match required vs available amenities
        # Use sets for comparison
        return {"score": 0, "reason": "..."}

class LocationAgent:
    def analyze(self, event, venue):
        # TODO: Check location preference match
        return {"score": 0, "reason": "..."}
```

## 3. RAG System (`rag.py`)

```python
import json

def find_similar_events(target_event):
    history = json.load(open('./data/event_history.json'))
    
    # Simple approach: filter by type and size
    similar = [e for e in history 
               if e.get('event_type') == target_event.get('event_type')]
    
    return similar[:5]

# Advanced (optional): Use vector embeddings
# from langchain_openai import OpenAIEmbeddings
# import chromadb
```

## Running

```bash
# Set API key (if using embeddings)
export OPENAI_API_KEY=your_key

# Run server
uvicorn main:app --reload
```

Test at: http://localhost:8000/docs

## Key Tips

**Data Loading:**
- Load JSON once at startup, not per request
- Use try/except for file operations

**Data Quality:**
- Not all venues have all fields (e.g., some missing amenities array)
- Field names may vary slightly between records
- Always check if fields exist before accessing

**Agent Design:**
- Each agent should be independent
- Return consistent format: `{"score": 0-100, "reason": "string"}`
- Consider edge cases (what if capacity is 0?)

**RAG Implementation:**
- Start with simple text matching (filter by event_type)
- Add vector search if time permits
- Use top 3-5 similar events for context

**Score Aggregation:**
- Simple average: `sum(scores) / len(scores)`
- Or weighted: `capacity*0.4 + amenity*0.3 + location*0.3`

## Common Issues

- **Import errors**: Check all packages installed
- **File not found**: Verify data/ directory exists
- **KeyError**: Field missing in data - use `.get()` method
- **Division by zero**: Check venue capacity before dividing
