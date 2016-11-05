import React, {Component}  from 'react';
import StarRating from 'react-star-rating';
import { connect } from 'react-redux';
import { loadRequests, currentOrganisationId, currentRequestId } from '../actions';
import { bindActionCreators } from 'redux';

import RequestsRepresentation from '../components/RequestsRepresentation';
import MainStudioRepresentation from '../components/MainStudioRepresentation';

class StudioOrganisationPanel extends Component {
    getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == "" || isNaN(org_id)){
            org_id = curr_url.pop();
        }
        return org_id;
    }
    componentWillMount() {
        const { loadRequests } = this.props;
        loadRequests(this.getCurrentOrganisationId());
    }
    render(){
        const { requests, org_u_rows, curr_organisation_id, curr_request_id } = this.props.studio;
        const { currentOrganisationId, currentRequestId } = this.props;
        const updateOrganisationId = (org_id) => currentOrganisationId(org_id);
        const changeRequestId = (request_id) => currentRequestId(request_id);
        return (
            <div>
                <RequestsRepresentation requests={requests} org_u_rows={org_u_rows} curr_organisation_id={curr_organisation_id} updateOrganisationId={updateOrganisationId} changeRequestId={changeRequestId}/>
                <MainStudioRepresentation requests={requests} org_u_rows={org_u_rows} curr_organisation_id={curr_organisation_id} curr_request_id={curr_request_id}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studio: state.studio,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadRequests, currentOrganisationId, currentRequestId
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudioOrganisationPanel);