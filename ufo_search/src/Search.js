import React from 'react';


class SearchData extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
            this.props.handleInputChange(e.target.value);
        }

    render() {
        const query = this.props.query;
        const data = this.props.data;
        return (
            <div className="searchForm">
                <form>
                    <input
                        placeholder="Search for..."
                        value={query}
                        onChange={this.handleChange}
                    />
                </form>
                <div>{data.totalSightings > 0 ?
                    <table style={{width: "100%"}}>
                        <tr>
                            <th>Date</th>
                            <th>City</th>
                            <th>Comments</th>
                        </tr>
                        {data.sightings.map(i => {
                            return (
                                <tr>
                                    <td>{i.date}</td>
                                    <td>{i.city}</td>
                                    <td>{i.comments}</td>
                                </tr>
                            )
                        })}
                    </table> : "no results"}</div>
            </div>
        )
    }
}

export default SearchData;
