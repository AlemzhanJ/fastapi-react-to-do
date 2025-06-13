from pydantic import BaseModel
from pydantic import EmailStr
from datetime import datetime



class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserGet(BaseModel):
    id: int
