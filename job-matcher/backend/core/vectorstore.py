import os
import chromadb
from chromadb.config import Settings as ChromaSettings
from core.config import settings

_client = None

def get_chroma_client():
    global _client
    if _client is None:
        os.makedirs(settings.CHROMA_PERSIST_DIR, exist_ok=True)
        _client = chromadb.Client(
            ChromaSettings(
                chroma_db_impl="duckdb+parquet",
                persist_directory=settings.CHROMA_PERSIST_DIR
            )
        )
    return _client

def get_or_create_collection(name="job_matcher"):
    client = get_chroma_client()
    try:
        return client.get_collection(name)
    except Exception:
        return client.create_collection(name=name)
