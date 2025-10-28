from core.config import settings
from langchain.embeddings import GoogleGenerativeAIEmbeddings

def get_embeddings_client():
    # LangChain Google wrapper will read API key from environment var
    return GoogleGenerativeAIEmbeddings(api_key=settings.GOOGLE_API_KEY)
