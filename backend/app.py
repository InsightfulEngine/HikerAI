from flask import Flask, Response, jsonify,send_from_directory, request
from flask_cors import CORS
import json

from model import get_search_results

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
CORS(app)
# cors = CORS(app, resource={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET", "POST"])
def home():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/ping", methods=["GET"])
def index():
    """
    Validates that the server is up and running.
    """
    return Response("Server is running", status=200)


@app.route("/invoke", methods=["POST"])
def invoke():
    """
    invoke is called by the frontend client and sends the user query to the model.
    the returning response should be an object containing information trail to be 
    displayed on the frontend.
    """
    # Get request data
    body = request.get_json()
    msg = body["message"]
    if not msg:
        return Response("missing message in body", 400)
    response = get_search_results(msg)
    if not response:
        return Response(f"error getting model response", 500)
    
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")