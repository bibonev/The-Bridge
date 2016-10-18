import React from 'react';
import ReactDOM from 'react-dom';


export default class SearchNavbar extends React.Component {
    constructor() {
        super()
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.state = {}
    }
    
    render() {
        return (
            <div>
                <input className='search-input' ref='search' name='searchTerm' type='text' onChange={this.onSearchChange } onKeyDown={this.onClick} />
            </div>
        )
    }
    
    onSearchChange() {
        let suggestions = ReactDOM.findDOMNode(this.refs.search).value;

        if (this.promise) {
            clearInterval(this.promise)
        }

        this.promise = setTimeout(() => this.props.onSearchChanged(suggestions), 400);
    }
    
    onClick(event) {
        if (event.keyCode === 13) {
            let searchQuery = ReactDOM.findDOMNode(this.refs.search).value;
            localStorage.setItem("searchTerm", searchQuery);
            window.location.replace("http://localhost:8000/organisations/");
        }
    }
}



