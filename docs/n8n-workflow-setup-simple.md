# n8n Workflow Setup# n8n Quick Start



## Quick Start## Start n8n

```bash

```bashdocker run -it --rm --name n8n -p 5678:5678 n8nio/n8n

docker run -it --rm --name n8n -p 5678:5678 -v $(pwd)/data:/data n8nio/n8n```

```Open: http://localhost:5678



Open: http://localhost:5678## Build Workflow

1. **Webhook** (POST)  /api/venues/recommend

**Important**: Mount data folder so n8n can access JSON files2. **Code nodes**  Agent logic  

3. **Merge**  Combine results

## Workflow Structure4. **Respond to Webhook**  Return JSON



```## Agent Code

Webhook → Load Data → Loop Venues → Agent Nodes → Merge → RAG → Response```javascript

```// Access: dollar-json.body

return { 

### Required Nodes  score: yourScore, 

  reason: "explanation" 

1. **Webhook Trigger**};

   - Method: POST```

   - Path: `/api/venues/recommend`

   - Response Mode: "Using 'Respond to Webhook' Node"## RAG

- Load event_history.json

2. **Code Node - Load Data**- Filter by event_type and size

   ```javascript- Or use OpenAI embeddings node

   // Load JSON files

   const fs = require('fs');## Export

   const venues = JSON.parse(fs.readFileSync('/data/venues.json'));**Critical**: Export as workflow-export.json

   const requests = JSON.parse(fs.readFileSync('/data/current_requests.json'));

   Settings  Export Workflow

   const eventId = $json.body.event_id;

   const event = requests.find(e => e.event_id === eventId);## Tips

   - Test each node individually

   return { event, venues: venues.slice(0, 10) };- Use Split In Batches for loops

   ```- Handle missing fields

3. **Split In Batches Node**
   - Batch size: 1
   - Loops through venues for agent analysis

4. **Agent Code Nodes** (Create 3 separate nodes)

   **Capacity Agent:**
   ```javascript
   const event = $node["Load Data"].json.event;
   const venue = $json;
   
   // TODO: Calculate utilization
   // TODO: Determine score
   
   return { 
     venue_id: venue.venue_id,
     agent: 'capacity',
     score: 0,
     reason: "..."
   };
   ```

   **Amenity Agent:**
   ```javascript
   const event = $node["Load Data"].json.event;
   const venue = $json;
   
   // TODO: Match amenities
   // Check if arrays exist first
   
   return {
     venue_id: venue.venue_id,
     agent: 'amenity',
     score: 0,
     reason: "..."
   };
   ```

   **Location Agent:**
   ```javascript
   const event = $node["Load Data"].json.event;
   const venue = $json;
   
   // TODO: Check location match
   
   return {
     venue_id: venue.venue_id,
     agent: 'location',
     score: 0,
     reason: "..."
   };
   ```

5. **Merge Node**
   - Mode: "Merge By Key"
   - Key: venue_id
   - Combines all agent results

6. **Code Node - RAG Search**
   ```javascript
   const event = $node["Load Data"].json.event;
   const history = JSON.parse(fs.readFileSync('/data/event_history.json'));
   
   // TODO: Filter similar events
   const similar = history.filter(e => 
     e.event_type === event.event_type
   ).slice(0, 5);
   
   return { similar_events: similar };
   ```

7. **Code Node - Aggregate Scores**
   ```javascript
   const merged = $input.all();
   
   // TODO: Calculate average scores per venue
   // TODO: Sort by score
   // TODO: Return top N
   
   return { recommendations: [] };
   ```

8. **Respond to Webhook**
   - Returns final JSON response

## Key Tips

- `$json` = current item, `$json.body` = webhook request
- `$node["NodeName"].json` = data from specific node
- Docker needs volume mount: `-v $(pwd)/data:/data`
- Test each node individually (click "Execute Node")
- Each agent outputs same structure with venue_id
- Merge combines based on venue_id

## Common Issues

- **Can't read files**: Check Docker volume mount
- **Undefined variables**: Verify node connections and names
- **Merge not working**: Ensure all agents output venue_id field

## Export

**Critical**: Export workflow before submission

Settings → Workflows → Export → `workflow-export.json`
