# Submission Guidelines

You have 3-4 hours. Pick what you know best and build something that works.

## Core Requirements
- 3+ specialized agents (capacity, amenity, location analysis, etc.)
- RAG implementation using historical event data
- API endpoint that returns ranked recommendations
- Setup instructions in README (< 5 min to run)

## Tech Stack Options
**Python**: FastAPI + LangChain/basic agents  
**Node.js**: Express + simple agent logic  
**n8n**: Visual workflows (must export JSON)  
**.NET**: Minimal API + agent framework  
**Other**: Use whatever makes you most productive

## Time Management Strategy
**Hour 1**: Basic API + data loading  
**Hour 2**: Core agent implementation  
**Hour 3**: RAG system + similarity search  
**Hour 4**: Testing, documentation, polish

## What We Evaluate

### Technical Execution (40%)
- Working system that processes requests correctly
- Proper agent separation and coordination
- RAG integration quality
- Code organization and clarity

### Problem Solving (30%)
- Data handling and normalization
- Error handling for edge cases
- Agent scoring logic
- Design trade-offs

### Documentation (20%)
- Clear setup instructions
- Architecture explanation
- Design decisions and rationale

### Code Quality (10%)
- Readability and structure
- Appropriate use of tools/frameworks
- Pragmatic approach for time constraints

## Submission Checklist

- [ ] Working API endpoint
- [ ] 3+ agents implemented
- [ ] RAG system using provided historical data
- [ ] README.md with setup instructions
- [ ] .env.example file (if needed)
- [ ] Code runs successfully on fresh clone
- [ ] Test data/examples included

## Important Notes

**On AI Assistance:**
You're welcome to use AI tools (GitHub Copilot, ChatGPT, etc.) as you would in your daily work. However, during the technical interview, you'll need to:
- Explain your implementation choices
- Modify code live during discussion
- Debug issues on the spot
- Discuss trade-offs you considered

We're evaluating your engineering judgment, not just code output.

**On Data Quality:**
The provided JSON files are real-world samples - you may encounter:
- Missing fields
- Inconsistent formatting
- Edge cases requiring normalization

Handling these issues thoughtfully is part of the evaluation.

**Focus Areas:**
✅ Working end-to-end system  
✅ Clear agent design with distinct responsibilities  
✅ Thoughtful RAG implementation  
✅ Clean, understandable code  

❌ Perfect error handling  
❌ Production-ready deployment  
❌ Processing all 500+ records  
❌ Complex UI

## Questions?

If you encounter blocking issues or need clarification, reach out. We're here to help!

---

**Time Budget: 3-4 hours** | **Goal: Demonstrate multi-agent AI system design**