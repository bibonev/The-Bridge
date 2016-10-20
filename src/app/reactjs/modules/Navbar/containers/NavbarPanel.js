import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadSuggestions } from '../actions';

import SearchNavbar from '../components/SearchNavbar';
import SuggestionsRepresentation from '../components/SuggestionsRepresentation';

class NavbarPanel extends Component {
    render() {
        const { loadSuggestions } = this.props;
        const onSearchChanged = query => loadSuggestions(query);

        return (
            <div>
                <SearchNavbar onSearchChanged={onSearchChanged} />
                <SuggestionsRepresentation suggestions={this.props.suggestions} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    suggestions: state.organisations.suggestions,
})

const mapDispatchToProps = dispatch => bindActionCreators({
     loadSuggestions 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NavbarPanel);
