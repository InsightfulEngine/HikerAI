import pymongo
from typing import Union, Dict
from db import MongoDB
from maps import MapsAPI
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForCausalLM
from huggingface_hub import login

login(token="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")
embedding_model = SentenceTransformer("thenlper/gte-large")
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b-it")
model = AutoModelForCausalLM.from_pretrained("google/gemma-2b-it").to("cpu")
maps = MapsAPI()

def get_embeddin(text: str) -> list[float]:
    if not text.strip():
        print("Attempted to get embedding for empty text.")
        return []

    embedding = embedding_model.encode(text)
    return embedding.tolist()

def get_search_results(query) -> Union[Dict, str]:
    db = MongoDB()
    knowledge = db.vector_search(user_query=query, embedding_model=embedding_model)

    search_result = {}
    for result in knowledge:
        embedding_score = result.get('Embedding_Score', 'N/A')
        if float(embedding_score) > 0.91:
            search_result["name"] =  result.get('Park_Name', 'N/A')
            search_result["difficulty"] = result.get("Difficulty", "N/A").strip()
            search_result["latitude"] = result.get("Latitude", "N/A")
            search_result["longitude"] = result.get("Longitude", "N/A")
            search_result["trail"] =  result.get('Trail_Name', 'N/A')

    if not search_result:
       res = "Sorry, I couldn't find hiking trails in NYC based on your query!"
       return res
    
    park_info = maps.get_place_info(search_result)
    search_result.update(park_info)
    
    return search_result

# print(get_search_results("I want you to give park with a paved surface and a wavy topog, as well as fully developed".lower()))

