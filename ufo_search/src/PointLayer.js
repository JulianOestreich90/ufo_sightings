import React from 'react';
import PointMarker from "./PointMarker";

class PointLayer extends React.Component {

    render() {
        return(
            this.props.sightings.length > 0 ? this.props.sightings.filter(sighting => sighting.latitude !== undefined).map((pos, index) => {
                return <PointMarker content={pos} openPopup={index === this.props.openPopupID - 1}/>
            }): <br/>
        )
    }
}

export default PointLayer