from app.config.db import SessionLocal
from app.schemas.task import TaskCreate, TasksShow, TaskOut, TaskDelete
from app.crud.tasks import delete_task,  create_task,  show_tasks, edit_task
from app.crud.user import get_current_user
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse

from app.services import verify_access_token
from app.dependencies import get_db


router = APIRouter(prefix = '/tasks', tags = ['Tasks'])


@router.get('/', response_model = TasksShow)
async def show_all_tasks(db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    tasks = await show_tasks(db, current_user)
    return {'tasks': tasks}

@router.post('/', response_model = TaskOut)
async def create_new_task(task: TaskCreate, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    new_task = await create_task(db, task, current_user.id)
    return new_task

@router.delete('/', response_model = TasksShow)
async def delete_one_task(task_id: int, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    remained_tasks = await delete_task(db, task_id, current_user.id)
    return {'tasks': remained_tasks}

@router.put('/', response_model = TaskOut)
async def edit_one_task(task: TaskDelete, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    edited_task = await edit_task(db, task, current_user.id)
    return edited_task

    