import React from 'react'
import 'leaflet/dist/leaflet.css';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import './styles.css'

class UfoMap extends React.Component {

    render() {
        return (
            <Map center={[0, 0]} zoom={13}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.props.data.hasOwnProperty('sightings') ? this.props.data.sightings.map(pos => {
                    if (pos.hasOwnProperty('latitude') && pos.hasOwnProperty('longitude')) {
                        return (
                            <Marker position={[pos.latitude, pos.longitude]}>
                                <Popup>{pos.shape + pos.city + pos.date}</Popup>
                            </Marker>
                        )
                    }
                }) : <br/>}
            </Map>
        )
    }
}

export default UfoMap;