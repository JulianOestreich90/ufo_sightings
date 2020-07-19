import React from 'react';
import PointMarker from "./PointMarker";

class PointLayer extends React.Component {

    render() {
        return (
            this.props.sightings.length > 0 ? this.props.sightings
                .filter(sighting => sighting.latitude !== undefined)
                .map((pos) => {
                    return <PointMarker content={pos}
                                        openPopup={pos.id === (this.props.openPopupID)}
                    />
                }) : <br/>
        )
    }
}

export default PointLayer