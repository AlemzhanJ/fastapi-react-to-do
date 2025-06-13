from app.models.tasks import Task  # Модель SQLAlchemy: users table
from app.schemas.task import TaskCreate, TaskDelete
from app.schemas.user import UserLogin # Схема pydantic: приходящие данные
from sqlalchemy.ext.asyncio import AsyncSession  # Асинхронная сессия для работы с БД
from sqlalchemy.future import select # Позволяет делать SELECT-запросы
from sqlalchemy import delete






async def create_task(db: AsyncSession, task: TaskCreate, user_id: int):
    new_task = Task(name = task.name, description = task.description, user_id = user_id)
    db.add(new_task)
    await db.commit()
    await db.refresh(new_task)
    return new_task


async def show_tasks(db:AsyncSession, user: UserLogin):
    tasks = await db.execute(select(Task).where(Task.user_id == user.id))
    return tasks.scalars().all()

async def delete_task(db:AsyncSession, task_id: int, user_id: int):
    await db.execute(delete(Task).where(Task.user_id == user_id).where(Task.id == task_id))
    await db.commit()

    remained_tasks = await db.execute(select(Task).where(Task.user_id == user_id))

    return remained_tasks.scalars().all()


async def edit_task(db: AsyncSession, edited_task: TaskDelete, user_id: int):
    result = await db.execute(select(Task).where(Task.user_id == user_id).where(Task.id == edited_task.id))

    task = result.scalar_one_or_none()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.name = edited_task.name
    task.description = edited_task.description

    await db.commit()
    await db.refresh(task)

    return task