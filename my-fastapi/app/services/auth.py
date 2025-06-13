from passlib.context import CryptContext  # Для безопасного хеширования паролей
from app.config.config import settings
from jose import jwt
from datetime import datetime, timedelta



pwd_context = CryptContext(schemes = ['bcrypt'], deprecated = 'auto')

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy() #Создаём копию словаря, чтобы не изменить оригинальные данные. Это тот словарь, который мы закодируем в токен.
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)
    return token


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.JWTError:
        return None



