from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from core.database import Base

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    filename = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    vector_id = Column(String, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
