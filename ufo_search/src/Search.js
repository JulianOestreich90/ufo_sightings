import React from 'react';
import {RowComponent} from "./RowComponent";


class SearchData extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.fetchSightingDetails = this.fetchSightingDetails.bind(this);
    }

    handleChange(e) {
        this.props.handleInputChange(e.target.value);
    }

    fetchSightingDetails = (data) => {
        this.props.openPopup(data);
    }

    render() {
        const query = this.props.query;
        const data = this.props.data;
        return (
            <div className="searchForm split left">
                <form>
                    <input
                        className={"form-control"}
                        placeholder="Search for..."
                        value={query}
                        onChange={this.handleChange}
                    />
                </form>
                <div>{data.totalSightings > 0 ?
                    <table className={"table table-hover"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Date</th>
                            <th scope={"col"}>City</th>
                            <th scope={"col"}>Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.sightings.map((sighting, index) => {
                            return (
                                <RowComponent
                                    key={index}
                                    data={sighting}
                                    onClick={this.fetchSightingDetails}
                                    />
                            )
                        })}
                        </tbody>
                    </table> : "no results"}</div>
            </div>
        )
    }
}

export default SearchData;
