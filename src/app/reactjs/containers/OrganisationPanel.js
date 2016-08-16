import React from 'react'
import { connect } from 'react-redux'
import { loadOrganisations, changeSearchAndLoadOrganisations } from '../actions'
import OrganisationSearchPanel from '../components/OrganisationSearchPanel'
import OrganisationRepresentation from '../components/OrganisationRepresentation'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'


const OrganisationPanel = (props) => {
    console.log("Props", props.organisations);
    const { rows, count, search } = props.organisations;
    const { loadOrganisations, changeSearchAndLoadOrganisations  } = props;
    const onSearchChanged = query => changeSearchAndLoadOrganisations(query);
    return <div className="organisation-list">
        <OrganisationSearchPanel search={search} onSearchChanged={onSearchChanged} />
        <OrganisationRepresentation data={rows} />
    </div>
}


const mapStateToProps = state => ({
	organisations:state.organisations,
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
	loadOrganisations, changeSearchAndLoadOrganisations 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationPanel);
