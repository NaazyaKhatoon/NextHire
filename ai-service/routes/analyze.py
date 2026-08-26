from fastapi import APIRouter, HTTPException
from models.schemas import AnalyzeRequest, AnalyzeResponse
from services.ats_analyzer import analyze_resume

router = APIRouter(prefix="/api/analyze", tags=["Analyze"])

@router.post("", response_model=AnalyzeResponse)
async def analyze_endpoint(request: AnalyzeRequest):
    try:
        result = analyze_resume(
            text=request.text or "",
            target_role=request.target_role or "Software Engineer",
            job_description=request.job_description or ""
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ATS Analysis failed: {str(e)}")
