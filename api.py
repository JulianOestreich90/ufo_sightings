'''api module for retrieving ufo data from index'''

from flask_restful import Resource, reqparse
from search import query_index


class Sightings(Resource):
    '''UFO Sightings resource to find sightings according to querystring'''

    # arguments parser for sightings
    reqparser = reqparse.RequestParser()
    reqparser.add_argument('q', required=True, type=str, help='Search text')
    reqparser.add_argument('offset', required=True, type=int, help='Starting point')
    reqparser.add_argument('limit', required=True, type=int, help='Number of Sightings')

    def get(self):
        args = self.reqparser.parse_args()

        sightings, total_sightings = query_index(args['q'], args['offset'], args['limit'])

        return {
            'sightings': sightings,
            'totalSightings': total_sightings,
        }
