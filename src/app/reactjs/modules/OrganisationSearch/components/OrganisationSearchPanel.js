import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchPanel extends React.Component {
    constructor() {
        super()
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onClearSearch = this.onClearSearch.bind(this);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="input-group" id="adv-search">
                    <input type="text" className="form-control" ref='search' name='searchTerm'  placeholder="Search organisations" defaultValue={this.props.search} value={this.state.search} onChange={this.onSearchChange } />
                    <div className="input-group-btn">
                        <div className="btn-group" role="group">
                            <div className="dropdown dropdown-lg">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="caret"></span></button>
                                <div className="dropdown-menu dropdown-menu-right" role="menu">
                                    <form className="form-horizontal" role="form">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="filter">Rating (0.0 - 5.0)</label> <br />
                                                    <input type="text" ref='rating1' onChange={this.onSearchChange} placeholder='From'/> <br />
                                                    <input type="text" ref='rating2' onChange={this.onSearchChange} placeholder='To'/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="filter">Payment</label> <br />
                                                    <input type="checkbox" /> 0,000 - 5,000 <br/>
                                                    <input type="checkbox" /> 5,000 - 15,000 <br/>
                                                    <input type="checkbox" /> 15,000 - 25,000 <br/>
                                                    <input type="checkbox" /> 25,000 - 35,000 <br/>
                                                    <input type="checkbox" /> 35,000 +  <br/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="filter">Location</label>
                                            <select ref='locationSelection' className="form-control" onChange={this.onSearchChange}>
                                                <option value="0" placeholder="All"></option>
                                                <option value="1">London</option>
                                                <option value="2">Birmingham</option>
                                                <option value="3">New Yourk</option>
                                                <option value="4">Los Angeles</option>
                                                <option value="5">Paris</option>
                                            </select>
                                        </div>
                                         <div className="form-group">
                                            <label htmlFor="filter">Category</label>
                                            <select ref='categorySelection' className="form-control" onChange={this.onSearchChange}>
                                                <option value="0" placeholder="All"></option>
                                                <option value="1">Education</option>
                                                <option value="2">Public services</option>
                                                <option value="3">Environment</option>
                                                <option value="4">Healthcare</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onSearchChange() {
        let query = ReactDOM.findDOMNode(this.refs.search).value;

        let queryRatings = [];
        let r1 =  ReactDOM.findDOMNode(this.refs.rating1).value;
        let r2 =  ReactDOM.findDOMNode(this.refs.rating2).value;

        function validation(r1, r2) {
            var t1 =  parseFloat(r1).toFixed(1);
            var t2 =  parseFloat(r2).toFixed(1);

            if(t1 >= 0.0 && t1 <= 5.0 && t2 >= 0.0 && t2 <= 5.0) {
                return true;
            }

            return false;
        }

        if(r1 != "From" && r2 != "To" && validation(r1, r2)) {
            queryRatings.push(r1, r2);
        }

        let queryLocation = "";
        let locations = ReactDOM.findDOMNode(this.refs.locationSelection).childNodes;
        locations.forEach(function(element) {
            if (element.selected) {
                queryLocation = element.text;
            }
        }, this);

        let queryCategory = "";
        let categories = ReactDOM.findDOMNode(this.refs.categorySelection).childNodes;
        categories.forEach(function(element) {
            if (element.selected) {
                queryCategory = element.text;
            }
        }, this);


        if (this.promise) {
            clearInterval(this.promise)
        }

        this.setState({
            search: query,
            ratings: queryRatings,
            location: queryLocation,
            category: queryCategory
        });

        this.promise = setTimeout(() => this.props.onSearchChanged(query, queryRatings, queryLocation, queryCategory), 400);
    }

    onClearSearch() {
        this.setState({
            search: ''
        });
        this.props.onSearchChanged(undefined)
    }
}




