from fastapi import FastAPI
from app.routes import user, tasks
from app.config.config import settings

app = FastAPI()

app.include_router(user.router)
app.include_router(tasks.router)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
