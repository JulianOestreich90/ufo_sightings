import React from 'react';
import SearchData from "./Search";
import axios from "axios";
import UfoMap from "./map";
import './styles.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data: [],
            openPopup: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.openPopup = this.openPopup.bind(this);
    };

    searchData = (query, offset = 0, limit = 200) => {

        axios.get('http://192.168.0.183:5000/api/v1/ufo/search', {
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

    openPopup = data => {
        this.setState({openPopup: data.id})
    }

    render() {
        return (
            <div className="App">
                <SearchData
                    query={this.state.query}
                    data={this.state.data}
                    handleInputChange={this.handleInputChange}
                    openPopup={this.openPopup}
                />
                <UfoMap data={this.state.data} openPopupID={this.state.openPopup}/>
            </div>
        )
    }
}

export default App;
