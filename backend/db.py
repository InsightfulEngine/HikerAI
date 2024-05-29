from pymongo.mongo_client import MongoClient
import pymongo.errors
from typing import Any
from dotenv import load_dotenv
import os
from sentence_transformers import SentenceTransformer

load_dotenv()

#https://docs.google.com/forms/d/1v4cUDyAbS6WpEggTx3LnMHdJNxQOiWTuPyTLrKrjLHM/viewform?edit_requested=true
class MongoDB():
    """
    The MongoDB class abstracts MongoDB operations from the client
    """
    
    def __init__(self) -> None:
        self.conn_string = os.environ["MONGO_URI"]
        self.colection = "documents"
        try:
            self.connection = MongoClient(self.conn_string)
            self.db = self.connection.get_database("hiker_ai")
        except pymongo.errors.ConnectionFailure as e:
            raise("error trying to get database from mongodb {}".format(e))
    
    def store_documents(self, documents):
        try:
            self.db["documents"].insert_many(documents)
        except Exception as e:
            print("error inserting documents: {}".format(e))

    def index(self):
        self.db[self.colection].create_index(
            [
                ("embedding", "columnvector")
            ],
            name="vector_index",
        )
    def update_docs(self, embedding_model):
        documents = self.db[self.colection].find()
        
        for doc in documents:
            embd = doc.get("embedding", "")
            if len(embd) > 0:
                print(f"got document that has already been computed, ignoring: {doc.get('Park_Name', '')}")
                continue

            park_name = doc.get("Park_Name", "")
            Width_ft = doc.get("Width_ft", "")
            Class = doc.get("Class", "")
            Surface = doc.get("Surface", "")
            Gen_Topog = doc.get("Gen_Topog", "")
            Difficulty = doc.get("Difficulty", "")
            Trail_name = doc.get("Trail_name", "")
            ParkID = doc.get("ParkID", "")
            TrailMarkersInstalled = doc.get("TrailMarkersInstalled", "")
            Latitude = doc.get("Latitude", "")
            Longitude = doc.get("Longitude", "")

            combined_text = f"{park_name} {Width_ft} {Class} {Surface} {Gen_Topog} {Difficulty} {Trail_name} {ParkID} {TrailMarkersInstalled} {Latitude} {Longitude}"
            embedding = embedding_model.encode(combined_text).tolist()
            self.db[self.colection].update_one(
                {"_id": doc["_id"]},
                {"$set": {"embedding": embedding}}
            )
            print(f"updated doc: {doc.get('Park_Name')}")
            
    def vector_search(self, user_query, embedding_model) -> list[Any]:
        """
        Perform a vector search in the MongoDB collection based on the user query.

        Args:
        user_query (str): The user's query string.
        collection (MongoCollection): The MongoDB collection to search.

        Returns:
        list: A list of matching documents.
        """
        # Generate embedding for the user query.
        query_embedding = embedding_model.encode(user_query).tolist()

        if query_embedding is None:
            return "Invalid query or embedding generation failed."

        # Define the vector search MongoDB aggregation pipeline.
        pipeline = [
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "queryVector": query_embedding,
                    "path": "embedding",
                    "numCandidates": 5000,  # Number of candidate documents to consider.
                    "limit": 1,  # Return top 4 matches.
                }
            },
            {
                "$project": {
                "_id": 0,
                "Park_Name": 1,
                "Trail_Name": 1,
                "Latitude": 1,
                "Longitude": 1,
                "Difficulty": 1,
                "Surface": 1,
                "Embedding_Score": {"$meta": "vectorSearchScore"},
                }
            },
        ]
        # Execute the vector search MongoDB aggregation pipeline.
        results = self.db["documents"].aggregate(pipeline)
        return list(results)