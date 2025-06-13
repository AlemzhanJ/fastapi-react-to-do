from fastapi import FastAPI
from app.routes import user, tasks

app = FastAPI()

app.include_router(user.router)
app.include_router(tasks.router)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://vercel.com/alemzhans-projects/alemzhan-to-do/HQ58QBCjricXAtGoW6sm9FPZ7E7x"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
