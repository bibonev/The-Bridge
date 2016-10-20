import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadOrganisations, changeSearchAndLoadOrganisations } from '../actions';
import { bindActionCreators } from 'redux';

import OrganisationSearchPanel from '../components/OrganisationSearchPanel';
import OrganisationRepresentation from '../components/OrganisationRepresentation';
import LoadingContainer from '../../../shared_components/loader'

class OrganisationPanel extends Component {
    componentWillMount() {
        const { loadOrganisations } = this.props;
        loadOrganisations();
    }

    render() {
        const { rows, count, search } = this.props.organisations;
        const { loadOrganisations, changeSearchAndLoadOrganisations  } = this.props;
        const { isLoading } = this.props.ui;

        const onSearchChanged = query => changeSearchAndLoadOrganisations(query);

        let searchTerm = "";
        if(localStorage.getItem("searchTerm") != "") {
            searchTerm = localStorage.getItem("searchTerm");
        } else {
            searchTerm = search;
        }

        return (
            <div className="organisation-list">
                <OrganisationSearchPanel search={searchTerm} onSearchChanged={onSearchChanged} />
                <LoadingContainer isLoading={isLoading} />
                <OrganisationRepresentation data={rows} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    organisations: state.organisations,
    ui: state.ui,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadOrganisations, changeSearchAndLoadOrganisations
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationPanel);
