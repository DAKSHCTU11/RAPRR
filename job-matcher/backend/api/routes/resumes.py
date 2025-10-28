from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from services.resume_service import create_resume

router = APIRouter()

@router.post("/upload")
async def upload_resume(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    # naive text extraction
    try:
        text = contents.decode("utf-8", errors="ignore")
    except Exception:
        text = ""
    if not text:
        # try minimal fallback
        text = file.filename
    resume = create_resume(db=db, user_id=user_id, filename=file.filename, content=text)
    return {"id": resume.id, "filename": resume.filename}
