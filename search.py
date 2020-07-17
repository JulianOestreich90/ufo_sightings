import os
import csv
from pprint import pprint
from whoosh.index import create_in, open_dir
from whoosh.fields import *
from whoosh import qparser
import datetime


class UfoSchema(SchemaClass):
    dt = DATETIME(stored=True)
    city = TEXT(stored=True)
    state = TEXT(stored=True)
    country = TEXT(stored=True)
    shape = TEXT(stored=True)
    duration_sec = NUMERIC(stored=True)
    duration_hr = TEXT(stored=True)
    comments = TEXT(stored=True)
    date_posted = TEXT(stored=True)
    latitude = NUMERIC(stored=True)
    longitude = NUMERIC(stored=True)


def create_index():
    # check if directory exits
    if not os.path.exists('index'):
        os.mkdir('index')

    ix = create_in("index", UfoSchema)
    writer = ix.writer()

    with open("complete.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")

        for row in csv_reader:
            if row[0] != "datetime" and len(row) is 11:

                if row[0][-5:-3] == "24":
                    date_str = row[0][:-5] + '00' + row[0][-3:]
                else:
                    date_str = row[0]
                print(row[7])
                writer.add_document(
                    dt=datetime.datetime.strptime(date_str, "%m/%d/%Y %H:%M"),
                    city=row[1],
                    state=row[2],
                    country=row[3],
                    shape=row[4],
                    duration_sec=int(float(row[5])) if row[5] != '' else 0,
                    duration_hr=row[6],
                    comments=row[7],
                    date_posted=row[8],
                    latitude=float(row[9]) if row[9] != '' else None,
                    longitude=float(row[10] if row[10] != '' else None)
                )

        writer.commit()


def query_index(q, offset, limit):
    ix = open_dir('index')
    sightings = []

    with ix.searcher() as searcher:
        mp = qparser.MultifieldParser(
            ['dt', 'city', 'state', 'country', 'shape', 'comments'], ix.schema)
    mpq = mp.parse(q)
    results = searcher.search_page(mpq, pagenum=offset + 1, pagelen=limit)

    for result in results:
        pprint(result)

        sightings.append({
            'date': result['dt'].strftime('%d/%m/%Y %H:%M'),
            'city': result['city'],
            'country': result['country'],
            'comments': result['comments'],
            'duration_sec': result['duration_sec'],
            'latitude': result['latitude'],
            'longitude': result['longitude']
        })

    return (sightings, len(results))
