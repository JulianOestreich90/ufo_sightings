# Search Engine for UFO Sightings

*This investigation on UFO Sighting data is purely descriptive. For interesting information on extra-terrestrials and Aliens i would rather suggest Rick & Morty, than watching Ancient Aliens on Netflix.*

This Search Engine for a [UFO Sightings Dataset](https://github.com/timothyrenner/nuforc_sightings_data) is based on [Python Whoosh](https://whoosh.readthedocs.io/en/latest/intro.html) and its my first try of building a Search Engine.

The results are rendered in a React.js Frontend with the help of [react-leaflet](https://www.openstreetmap.org/) using [OSM](https://www.openstreetmap.org/).

## Requirements
* Python 3.7
* node/npm
* Get a [NUFORC Sightings Dataset](https://github.com/timothyrenner/nuforc_sightings_data) by using this amazing repository by timothyrenner and place it in the root of this repository

## Test it

*This explanation assumes that you're using a unix system.*

1. Clone the repository
1. Run the backend:
    - Open a Terminal
    - `cd <cloned-folder>`
    - `python3 -m venv env`
    - `source env/bin/activate`
    - `pip install -r requirements.txt`
    - `python app.py`

1. Run the frontend:
    - Open another shell
    - `cd <cloned-folder>/ufo_search`
    - `npm install`
    - `npm start`

1. Index the data by requesting http://localhost:5000/api/v1/ufo/index
 
    **This will take some time, because of the slow Python Backend!!**
    
1. Open a browser on http://localhost:3000


## Todos
* Geotag non-us sighting data (!!)
* Use a faster library for building the search engine
* make everything prettier and faster 





