from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from typing import AsyncGenerator
from app.config import settings

# Configure async engine based on dialect (PostgreSQL vs SQLite)
is_sqlite = settings.database_url.startswith("sqlite")

engine_kwargs = {"echo": False}
if not is_sqlite:
    engine_kwargs.update({
        "pool_size": 10,
        "max_overflow": 20,
    })

engine = create_async_engine(
    settings.database_url,
    **engine_kwargs
)

# Aliases used across modules
async_engine = engine

async_session_factory = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

AsyncSessionLocal = async_session_factory

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:
        yield session

async def get_raw_connection():
    if is_sqlite:
        import aiosqlite
        db_path = settings.database_url.replace("sqlite+aiosqlite:///", "")
        return await aiosqlite.connect(db_path)
    else:
        import asyncpg
        db_url = settings.database_url.replace("postgresql+asyncpg://", "postgresql://")
        return await asyncpg.connect(db_url)
