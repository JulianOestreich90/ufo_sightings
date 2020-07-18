from flask import Flask, jsonify, request
from flask_restful import Api
from api import Sightings
from search import create_index

from flask_cors import CORS

app = Flask(__name__)
api = Api(app)

api.add_resource(Sightings, '/api/v1/ufo/search')

CORS(app)

@app.route('/api/v1/ufo/index')
def index_sightings():
    create_index()
    return jsonify({
        'message': 'Indexing complete!',
    })

@app.after_request
def middleware_for_response(response):
    response.headers.add('Access-Control-Allow-Origin', request.headers.get("origin"))
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,HEAD,DELETE,UPDATE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)
