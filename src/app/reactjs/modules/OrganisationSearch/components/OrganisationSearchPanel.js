import React from 'react';
import ReactDOM from 'react-dom';


export default class SearchPanel extends React.Component {
    constructor() {
        super()
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onClearSearch = this.onClearSearch.bind(this)
        this.state = {}
    }
    
    render() {
        return (
            <div >
                <input className='search-input' ref='search' name='searchTerm' type='text' defaultValue={this.props.search} value={this.state.search} onChange={this.onSearchChange } />
                <button className="search-button" value="" onClick={this.onSearchChange}>
                    <i className="fa fa-search" aria-hidden="true">
                    </i>
                </button>
            </div>
        )
    }
    
    onSearchChange() {
        let query = ReactDOM.findDOMNode(this.refs.search).value;
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.setState({
            search: query
        });
        this.promise = setTimeout(() => this.props.onSearchChanged(query), 0);
    }
    
    onClearSearch() {
        this.setState({
            search: ''
        });
        this.props.onSearchChanged(undefined) 
        
    }
}



