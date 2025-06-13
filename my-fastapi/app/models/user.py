from app.config.db import Base
from sqlalchemy import Column, Integer, DateTime, String, func
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String, unique = True, index = True)
    hashed_password = Column(String, nullable = False)
    created_at = Column(DateTime(timezone = True), server_default = func.now())

    tasks = relationship('Task', back_populates = 'user')