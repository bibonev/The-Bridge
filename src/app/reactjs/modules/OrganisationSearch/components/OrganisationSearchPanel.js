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
                                                    <label htmlFor="filter">Rating</label> <br />
                                                    <input type="checkbox" ref='rating01' onChange={this.onSearchChange}/> 0.0 - 1.0 <br/>
                                                    <input type="checkbox" ref='rating12' onChange={this.onSearchChange}/> 1.0 - 2.0 <br/>
                                                    <input type="checkbox" ref='rating23' onChange={this.onSearchChange}/> 2.0 - 3.0 <br/>
                                                    <input type="checkbox" ref='rating34' onChange={this.onSearchChange}/> 3.0 - 4.0 <br/>
                                                    <input type="checkbox" ref='rating45' onChange={this.onSearchChange}/> 4.0 - 5.0 <br/>
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
                                            <select className="form-control">
                                                <option value="0">London</option>
                                                <option value="1">Birmingham</option>
                                                <option value="2">New Yourk</option>
                                                <option value="3">Los Angeles</option>
                                                <option value="4">Paris</option>
                                            </select>
                                        </div>
                                         <div className="form-group">
                                            <label htmlFor="filter">Category</label>
                                            <select className="form-control">
                                                <option value="0">Education</option>
                                                <option value="1">Public services</option>
                                                <option value="2">Environment</option>
                                                <option value="3">Healthcare</option>
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

        let ratings = [];

        let r1 = {'isChecked': ReactDOM.findDOMNode(this.refs.rating01).checked, 'valueFrom': 0, 'valueTo': 1};
        let r2 = {'isChecked': ReactDOM.findDOMNode(this.refs.rating12).checked, 'valueFrom': 1, 'valueTo': 2};
        let r3 = {'isChecked': ReactDOM.findDOMNode(this.refs.rating23).checked, 'valueFrom': 2, 'valueTo': 3};
        let r4 = {'isChecked': ReactDOM.findDOMNode(this.refs.rating34).checked, 'valueFrom': 3, 'valueTo': 4};
        let r5 = {'isChecked': ReactDOM.findDOMNode(this.refs.rating45).checked, 'valueFrom': 4, 'valueTo': 5};

        ratings.push(r1, r2, r3, r4, r5);

        function filterByChecks(rating) {
            if (rating.isChecked) {
                return true;
            } else {
                return false;
            }
        }

        let queryRatings = ratings.filter(filterByChecks);

        this.setState({
            ratings: queryRatings
        });

        if (this.promise) {
            clearInterval(this.promise)
        }

        this.setState({
            search: query
        });

        this.promise = setTimeout(() => this.props.onSearchChanged(query, queryRatings), 400);
    }

    onClearSearch() {
        this.setState({
            search: ''
        });
        this.props.onSearchChanged(undefined)
    }
}



