from app.config.db import Base
from sqlalchemy import Column, Integer, DateTime, String, ForeignKey
from sqlalchemy.orm import relationship

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key = True, index = True)
    name = Column(String)
    description = Column(String)

    user = relationship('User', back_populates = 'tasks')

    user_id = Column(Integer, ForeignKey('users.id'))
