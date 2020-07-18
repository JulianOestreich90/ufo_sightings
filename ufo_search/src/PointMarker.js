import React, {useEffect, useRef} from "react";
import {Marker, Popup} from "react-leaflet";

export default function PointMarker(props) {
    const markerRef = useRef(null);
    const {content, openPopup} = props;
    useEffect(() => {
        if (openPopup) markerRef.current.leafletElement.openPopup();
    }, [openPopup]);
    console.log(content)
    return (
        content.latitude !== undefined && content.longitude !== undefined ? (
            <Marker ref={markerRef} position={[content.latitude, content.longitude]}>
                <Popup>
                    <b>UFO Sighting Data</b><br/><br/>
                    <ul>
                        <li><b>Date: </b>{content.date}</li>
                        <li><b>City: </b>{content.city}</li>
                        <li><b>Country: </b>{content.country}</li>
                        <li><b>Shape: </b>{content.shape}</li>
                        <li><b>Durations: </b>{content.duration_sec} seconds</li>
                        <li><b>Comment: </b>{content.comments}</li>
                    </ul>
                </Popup>
            </Marker>) : <br/>
    );
}