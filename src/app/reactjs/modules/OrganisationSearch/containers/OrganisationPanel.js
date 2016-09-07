import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadOrganisations, changeSearchAndLoadOrganisations } from '../actions';
import { bindActionCreators } from 'redux';

import OrganisationSearchPanel from '../components/OrganisationSearchPanel';
import OrganisationRepresentation from '../components/OrganisationRepresentation';
import LoadingContainer from '../../../shared_components/loader/'

class OrganisationPanel extends Component {
    
    componentDidMount() {
        const { loadOrganisations } = this.props;
        loadOrganisations();
    }

    render() {
        const { rows, count, search } = this.props.organisations;
        const { loadOrganisations, changeSearchAndLoadOrganisations  } = this.props;
        const onSearchChanged = query => changeSearchAndLoadOrganisations(query);
        const { isLoading } = this.props.ui;

        return (
            <div>
                <LoadingContainer isLoading={isLoading} />
                <div className="organisation-list">
                    <OrganisationSearchPanel search={search} onSearchChanged={onSearchChanged} />
                    <OrganisationRepresentation data={rows} />
                </div>
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
