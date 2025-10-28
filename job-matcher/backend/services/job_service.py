from sqlalchemy.orm import Session
from backend.models.job_model import Job
from core.embeddings import get_embeddings_client
from core.vectorstore import get_or_create_collection
import uuid

def create_job(db: Session, title: str, description: str, requirements: str = None, recruiter_id: int = None):
    job = Job(title=title, description=description, requirements=requirements or "", recruiter_id=recruiter_id)
    db.add(job)
    db.commit()
    db.refresh(job)

    # create embedding and store in chroma
    embed_client = get_embeddings_client()
    text = f"{title}\n{description}\n{requirements or ''}"
    vector = embed_client.embed_documents([text])[0]
    col = get_or_create_collection()
    vector_id = f"job-{job.id}-{uuid.uuid4().hex}"
    col.add(documents=[text], metadatas=[{"job_id": job.id, "title": title}], ids=[vector_id], embeddings=[vector])
    job.vector_id = vector_id
    db.commit()
    db.refresh(job)
    return job

def list_jobs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Job).offset(skip).limit(limit).all()
