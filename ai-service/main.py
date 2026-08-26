import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routes.analyze import router as analyze_router
from routes.generate import router as generate_router
from routes.chatbot import router as chatbot_router
from routes.match import router as match_router

app = FastAPI(
    title="NextHire Deterministic ATS & Career Copilot Microservice",
    version="2.5.0",
    description="NextHire Deterministic Multi-Factor ATS Scoring, Skill Extraction, and ChatGPT-Class Career Engineering Engine."
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "NextHire Python FastAPI Engine",
        "demoMode": os.getenv("DEMO_MODE", "true") == "true"
    }

# Mount Routers
app.include_router(analyze_router)
app.include_router(generate_router)
app.include_router(chatbot_router)
app.include_router(match_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "127.0.0.1")
    uvicorn.run("main:app", host=host, port=port, reload=True)
