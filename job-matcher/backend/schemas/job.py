from pydantic import BaseModel
from typing import Optional

class JobCreate(BaseModel):
    title: str
    description: str
    requirements: Optional[str] = None

class JobOut(BaseModel):
    id: int
    title: str
    description: str
    requirements: Optional[str]

    class Config:
        orm_mode = True
