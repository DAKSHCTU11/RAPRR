from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from services.match_service import find_matches_for_text
from models.resume import Resume

router = APIRouter()

@router.get("/resume/{resume_id}")
def match_by_resume(resume_id: int, top_k: int = 5, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    results = find_matches_for_text(resume.content, top_k=top_k)
    return results
