from pydantic import BaseModel
from typing import List


class TaskCreate(BaseModel):
    name: str
    description: str


class TaskOut(BaseModel):
    id: int
    name: str
    description: str

class TasksShow(BaseModel):
    tasks: List[TaskOut]

class TaskDelete(BaseModel):
    id: int
    name: str
    description: str