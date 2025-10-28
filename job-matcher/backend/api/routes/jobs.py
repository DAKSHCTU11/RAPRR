from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from services.job_service import create_job, list_jobs
from schemas.job import JobCreate, JobOut

router = APIRouter()

@router.post("/", response_model=JobOut)
def post_job(payload: JobCreate, db: Session = Depends(get_db)):
    job = create_job(db, title=payload.title, description=payload.description, requirements=payload.requirements)
    return job

@router.get("/", response_model=list[JobOut])
def get_jobs(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return list_jobs(db, skip=skip, limit=limit)
