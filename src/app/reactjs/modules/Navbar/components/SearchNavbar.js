import React from 'react';
import ReactDOM from 'react-dom';
import { changeSearchAndLoadOrganisations } from '../../OrganisationSearch/actions/index'


export default class SearchNavbar extends React.Component {
    constructor() {
        super()
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.showHideSearchInput = this.showHideSearchInput.bind(this)
        this.state = {}
    }
    showHideSearchInput(e){
        e.preventDefault();
        if($('header .nav-search-input').width() == 0){
            $('header .nav-search-input').css({'width' : '150px'});
        }else{
            $('header .nav-search-input').css({'width' : '0'});
        }
    }
    render() {
        return (
            <div className="search-input-button">
                <button className="nav-search-button" onClick={this.showHideSearchInput}><i className="fa fa-search" aria-hidden="true"></i></button>
                <input className="nav-search-input" placeholder="Search The Bridge" ref='search' name='searchTerm' type='text' onChange={this.onSearchChange } onKeyDown={this.onClick} />
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



