from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None
    is_recruiter: bool = False

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    is_recruiter: bool

    class Config:
        orm_mode = True
