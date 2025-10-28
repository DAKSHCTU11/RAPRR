from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.database import Base, engine
from backend.api.routes import auth, jobs, resumes, matching

# Create DB tables (development only)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Job Matcher API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["jobs"])
app.include_router(resumes.router, prefix="/api/resumes", tags=["resumes"])
app.include_router(matching.router, prefix="/api/match", tags=["matching"])
