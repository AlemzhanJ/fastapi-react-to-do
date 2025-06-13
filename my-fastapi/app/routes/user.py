from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.encoders import jsonable_encoder #для сериализации datetime

from app.schemas.user import UserOut, UserCreate, UserLogin, UserGet
from app.crud.user import (
    create_new_user,
    get_user_by_email,
    get_current_user,
)
from app.dependencies import get_db
from app.services import verify_password, create_access_token

router = APIRouter(prefix="/users", tags=["Users"])


def _issue_cookie(response: Response, token: str) -> None:
    """Вынес установка куки в отдельную функцию-утилиту."""
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,          # локальная разработка → False
        samesite="lax",        # lax достаточно, strict ломает межпортовые куки
        max_age=60 * 60 * 24,  # сутки
        path="/",
    )


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register(
    user: UserCreate, response: Response, db: AsyncSession = Depends(get_db)
):
    if await get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email is already registered.")

    new_user = await create_new_user(db, user)

    token = create_access_token({"id": new_user.id})
    _issue_cookie(response, token)
    #Превращаем sqlalchemy объект в объект pydantic, потому что иначе оно не сериализуется в json

    user_out = UserOut.model_validate(new_user)
    payload = jsonable_encoder(user_out)

    return payload




@router.post("/login", response_model=UserOut)
async def login(
    user: UserLogin, response: Response, db: AsyncSession = Depends(get_db)
):
    db_user = await get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Wrong email or password.")

    token = create_access_token({"id": db_user.id})
    _issue_cookie(response, token)

    user_out = UserOut.model_validate(db_user) 
    payload = jsonable_encoder(user_out)


    return payload


@router.get("/me", response_model=UserGet)
async def get_me(current_user = Depends(get_current_user)):
    return current_user
