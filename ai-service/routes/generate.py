from fastapi import APIRouter
from models.schemas import (
    BulletEnhanceRequest,
    BulletEnhanceResponse,
    SummaryGenerateRequest,
    SummaryGenerateResponse,
)
from services.resume_generator import enhance_bullet_point, generate_summary

router = APIRouter(prefix="/api/generate", tags=["Generate"])

@router.post("/bullet", response_model=BulletEnhanceResponse)
async def enhance_bullet_endpoint(request: BulletEnhanceRequest):
    result = enhance_bullet_point(
        bullet=request.bullet,
        style=request.style or "achievement",
        target_role=request.target_role or "Software Engineer"
    )
    return result

@router.post("/summary", response_model=SummaryGenerateResponse)
async def generate_summary_endpoint(request: SummaryGenerateRequest):
    summary_text = generate_summary(
        experience_years=request.experience_years or "5+",
        target_role=request.target_role or "Software Engineer",
        skills=request.skills or []
    )
    return {"summary": summary_text}
