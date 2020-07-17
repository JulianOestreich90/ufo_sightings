from flask import Flask, jsonify
from flask_restful import Api
from api import Sightings
from search import create_index

app = Flask(__name__)
api = Api(app)

api.add_resource(Sightings, '/api/v1/ufo/search')

@app.route('/api/v1/ufo/index')
def index_sightings():
	create_index()
	return jsonify({
		'message': 'Indexing complete!',
		})


if __name__ == '__main__':
	app.run(debug=True)