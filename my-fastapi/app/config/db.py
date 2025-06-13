from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config.config import settings  # ✅ абсолютный импорт


import ssl

engine = create_async_engine(settings.DATABASE_URL, pool_pre_ping=True, echo = True, connect_args={"ssl": ssl.create_default_context()})

SessionLocal = sessionmaker(bind = engine, class_ = AsyncSession, expire_on_commit = False)

Base = declarative_base()