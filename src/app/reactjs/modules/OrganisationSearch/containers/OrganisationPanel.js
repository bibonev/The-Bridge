import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadOrganisations, changeSearchAndLoadOrganisations } from '../actions';
import { bindActionCreators } from 'redux';

import OrganisationSearchPanel from '../components/OrganisationSearchPanel';
import OrganisationRepresentation from '../components/OrganisationRepresentation';

 class OrganisationPanel extends Component {
    componentWillMount() {
        const { loadOrganisations } = this.props;
        loadOrganisations();   
    }

    render() {
    const { rows, count, search } = this.props.organisations;
    const { loadOrganisations, changeSearchAndLoadOrganisations  } = this.props;
    const onSearchChanged = query => changeSearchAndLoadOrganisations(query);

    return ( 
        <div className="organisation-list">
            <OrganisationSearchPanel search={search} onSearchChanged={onSearchChanged} />
            <OrganisationRepresentation data={rows} />
        </div>
        );
    }
}

const mapStateToProps = state => ({
	organisations:state.organisations,
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
	loadOrganisations, changeSearchAndLoadOrganisations 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationPanel);
