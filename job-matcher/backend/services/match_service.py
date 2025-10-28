from core.vectorstore import get_or_create_collection
from core.embeddings import get_embeddings_client
from core.config import settings

def find_matches_for_text(text: str, top_k: int = 5):
    embed = get_embeddings_client()
    q_vector = embed.embed_query(text)
    col = get_or_create_collection()
    # chroma query by embeddings; result format depends on chroma version
    res = col.query(query_embeddings=[q_vector], n_results=top_k, include=["metadatas", "distances", "ids", "documents"])
    return res
