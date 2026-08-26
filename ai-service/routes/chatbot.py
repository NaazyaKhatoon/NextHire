from fastapi import APIRouter
from models.schemas import ChatbotRequest, ChatbotResponse
from services.chatbot_service import generate_copilot_reply

router = APIRouter(prefix="/api/chatbot", tags=["Chatbot"])

@router.post("", response_model=ChatbotResponse)
async def chat_endpoint(request: ChatbotRequest):
    reply_text = generate_copilot_reply(
        message=request.message,
        history=request.history or [],
        resume_context=request.resume_context or {}
    )
    return {"reply": reply_text}
