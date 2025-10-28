from sqlalchemy.orm import Session
from models.user import User
from core.auth import get_password_hash, verify_password

def create_user(db: Session, email: str, password: str, full_name: str = None, is_recruiter: bool = False):
    hashed = get_password_hash(password)
    user = User(email=email, hashed_password=hashed, full_name=full_name, is_recruiter=is_recruiter)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
