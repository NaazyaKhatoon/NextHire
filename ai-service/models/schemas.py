from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    text: Optional[str] = ""
    target_role: Optional[str] = "Software Engineer"
    job_description: Optional[str] = ""
    file_name: Optional[str] = "resume.txt"

class RecommendationItem(BaseModel):
    category: str
    type: str  # critical | warning | tip
    problem: str
    whyItMatters: str
    suggestedImprovement: str
    sampleOriginal: Optional[str] = None
    sampleImproved: Optional[str] = None

class AnalyzeResponse(BaseModel):
    atsScore: int
    keywordScore: int
    skillsScore: int
    formattingScore: int
    readabilityScore: int
    impactScore: int
    sectionScore: int
    applicationReadinessScore: int
    readabilityLevel: str
    targetRole: str
    detectedSkills: List[str]
    missingSkills: List[str]
    missingKeywords: List[str]
    strengths: List[str]
    weaknesses: List[str]
    formattingProblems: List[str] = []
    recommendations: List[RecommendationItem]

class BulletEnhanceRequest(BaseModel):
    bullet: str
    style: Optional[str] = "achievement"
    target_role: Optional[str] = "Software Engineer"

class BulletEnhanceResponse(BaseModel):
    original: str
    improved: str
    explanation: str
    scoreImpact: str = "+15 ATS Metric Points"

class SummaryGenerateRequest(BaseModel):
    experience_years: Optional[str] = "5+"
    target_role: Optional[str] = "Software Engineer"
    skills: Optional[List[str]] = []
    background: Optional[str] = ""

class SummaryGenerateResponse(BaseModel):
    summary: str

class ChatbotRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = []
    resume_context: Optional[Dict[str, Any]] = None

class ChatbotResponse(BaseModel):
    reply: str

class JobMatchRequest(BaseModel):
    resume_text: Optional[str] = ""
    resume_data: Optional[Dict[str, Any]] = None
    job_description: str
    target_role: Optional[str] = "Software Engineer"

class JobMatchResponse(BaseModel):
    matchScore: int
    matchedSkills: List[str]
    missingSkills: List[str]
    matchedKeywords: List[str]
    missingKeywords: List[str]
    aiAdvice: str
