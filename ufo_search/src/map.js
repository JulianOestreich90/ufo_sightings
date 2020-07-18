import React from 'react'
import 'leaflet/dist/leaflet.css';
import {Map, TileLayer} from 'react-leaflet';
import './styles.css';
import PointLayer from './PointLayer'



class UfoMap extends React.Component {
    render() {
        return (
            <div className={"split right"}>
                <Map center={[0, 0]} zoom={2}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.data.hasOwnProperty('sightings') ? <PointLayer sightings={this.props.data.sightings} openPopupID={this.props.openPopupID} /> : <br/>}
                </Map>
            </div>
        )
    }
}

export default UfoMap;