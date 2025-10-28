from sqlalchemy.orm import Session
from models.resume import Resume
from core.embeddings import get_embeddings_client
from core.vectorstore import get_or_create_collection
import uuid

def create_resume(db: Session, user_id: int, filename: str, content: str):
    r = Resume(user_id=user_id, filename=filename, content=content)
    db.add(r)
    db.commit()
    db.refresh(r)

    embed_client = get_embeddings_client()
    vector = embed_client.embed_documents([content])[0]
    col = get_or_create_collection()
    vector_id = f"resume-{r.id}-{uuid.uuid4().hex}"
    col.add(documents=[content], metadatas=[{"resume_id": r.id, "user_id": user_id}], ids=[vector_id], embeddings=[vector])
    r.vector_id = vector_id
    db.commit()
    db.refresh(r)
    return r
