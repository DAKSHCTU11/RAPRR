from pydantic import BaseModel

class ResumeOut(BaseModel):
    id: int
    user_id: int
    filename: str
    content: str

    class Config:
        orm_mode = True
