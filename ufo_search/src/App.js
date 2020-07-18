import React from 'react';
import SearchData from "./Search";
import axios from "axios";
import UfoMap from "./map";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    };

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

    handleInputChange = value => {
        this.setState({query: value})
        this.searchData(value);
    }

    render() {
        return (
            <div className="App">
                <SearchData handleInputChange={this.handleInputChange} query={this.state.query} data={this.state.data}/>
                <UfoMap data={this.state.data}/>
            </div>
        )
    }
}

export default App;
