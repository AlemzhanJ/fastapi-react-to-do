from app.models.user import User  # Модель SQLAlchemy: users table
from app.schemas.user import UserCreate  # Схема pydantic: приходящие данные
from sqlalchemy.ext.asyncio import AsyncSession  # Асинхронная сессия для работы с БД
from sqlalchemy.future import select  # Позволяет делать SELECT-запросы


from fastapi import Request, HTTPException, status, Depends

from app.services.auth import hash_password, verify_access_token

from app.dependencies.db import get_db




async def get_user_by_email(db: AsyncSession , email: str):
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()

async def get_user_by_id(db: AsyncSession , id: int):
    result = await db.execute(select(User).where(User.id == id))
    return result.scalar_one_or_none()

async def create_new_user(db: AsyncSession , user: UserCreate):
    hashed_password = hash_password(user.password)
    new_user = User(email = user.email , hashed_password = hashed_password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def get_current_user(request: Request, db: AsyncSession = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")

    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await get_user_by_id(db, payload["id"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user



    