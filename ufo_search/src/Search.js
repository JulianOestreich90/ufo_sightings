import React from 'react';
import axios from 'axios';

class SearchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data: []
        }
    }

    searchData = (query, offset = 0, limit = 20) => {

        axios.get('http://127.0.0.1:5000/api/v1/ufo/search', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            params: {
                q: query,
                offset: offset,
                limit: limit
            }
        })
            .then((res) => {
                this.setState({data: res.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleInputChange = event => {
        const query = event.target.value;
        this.setState({query: query})
        this.searchData(query);
    }

    render() {
        return (
            <div className="searchForm">
                <form>
                    <input
                        placeholder="Search for..."
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                </form>
                <div>{this.state.data.totalSightings > 0 ? this.state.data.sightings.map(i => <table style={{width: "100%"}}>
                    <tr>
                        <th>Date</th>
                        <th>City</th>
                        <th>Comments</th>
                    </tr>
                    <tr>
                        <td>{i.date}</td>
                        <td>{i.city}</td>
                        <td>{i.comments}</td>
                    </tr>
                </table>) : "no results"}</div>
            </div>
        )
    }
}

export default SearchData;
