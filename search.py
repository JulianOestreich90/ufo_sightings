import os
import csv
from pprint import pprint
from whoosh.index import create_in, open_dir
from whoosh.fields import *
from whoosh import qparser


class UfoSchema(SchemaClass):
    summary = TEXT(stored=True)
    dt = TEXT(stored=True)
    city = TEXT(stored=True)
    state = TEXT(stored=True)
    shape = TEXT(stored=True)
    duration_sec = TEXT(stored=True)
    stats = TEXT(stored=True)
    link = TEXT(stored=True)
    date_posted = TEXT(stored=True)
    text = NGRAM(stored=True)
    latitude = NUMERIC(stored=True)
    longitude = NUMERIC(stored=True)


def create_index():
    # check if directory exits
    if not os.path.exists('index'):
        os.mkdir('./index')

    ix = create_in("index", UfoSchema)
    writer = ix.writer()

    with open("nuforc_reports.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")

        for row in csv_reader:
            if row[0] != "summary":
                writer.add_document(
                    summary=row[0],
                    dt=row[3],
                    city=row[1],
                    state=row[2],
                    shape=row[4],
                    duration_sec=row[5],
                    stats=row[6],
                    link=row[7],
                    text=row[8],
                    latitude=float(row[10]) if row[10] not in ['', '0'] else None,
                    longitude=float(row[11]) if row[11] not in ['', '0'] else None
                )

        writer.commit()


def query_index(q, offset, limit):
    ix = open_dir('index')
    sightings = []

    with ix.searcher() as searcher:
        mp = qparser.MultifieldParser(
            ['dt', 'city', 'state', 'shape', 'text', 'stats'], ix.schema)
        mpq = mp.parse(q)
        results = searcher.search_page(mpq, pagenum=offset + 1, pagelen=limit)
        identifier = 0
        for result in results:
            #pprint(result)
            identifier = identifier + 1
            if 'latitude' in result and 'longitude' in result:
                sightings.append({
                    'id': identifier,
                    'date': result['dt'],
                    'city': result['city'],
                    'shape': result['shape'],
                    'text': result['text'],
                    'stats': result['stats'],
                    'duration_sec': result['duration_sec'],
                    'summary': result['summary'],
                    'latitude': result['latitude'],
                    'longitude': result['longitude']
                })
            else:
                sightings.append({
                    'id': identifier,
                    'date': result['dt'],
                    'city': result['city'],
                    'shape': result['shape'],
                    'text': result['text'],
                    'stats': result['stats'],
                    'duration_sec': result['duration_sec'],
                    'summary': result['summary'],
                })
    print("found {} ufo sightings".format(len(results)))
    return sightings, len(results)
