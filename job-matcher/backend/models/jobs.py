from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from core.database import Base

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    requirements = Column(Text, nullable=True)
    recruiter_id = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    vector_id = Column(String, nullable=True)
