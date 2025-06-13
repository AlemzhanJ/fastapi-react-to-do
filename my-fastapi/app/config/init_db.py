# app/config/init_db.py

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine

from app.config.config import settings         # ✅ не через __init__.py
from app.config.db import Base                 # ✅ напрямую
from app.models.user import User               # ❗️обязательно импортировать модели
from app.models.tasks import Task               # ❗️чтобы они добавились в metadata

DATABASE_URL = settings.DATABASE_URL
engine = create_async_engine(DATABASE_URL, echo=True)

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(init_models())
