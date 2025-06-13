from fastapi import FastAPI
from app.routes import user, tasks
from app.config.config import settings

app = FastAPI()

app.include_router(user.router)
app.include_router(tasks.router)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,

    allow_methods=["*"],
    allow_headers=["*"],
)
