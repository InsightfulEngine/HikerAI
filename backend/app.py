from flask import Flask, Response, jsonify, render_template, request
import json
# from flask_cors import CORS, cross_origin

app = Flask(__name__, template_folder="../frontend")
# cors = CORS(app, resource={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("index.html")


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
    return Response(body["text"], 200)

