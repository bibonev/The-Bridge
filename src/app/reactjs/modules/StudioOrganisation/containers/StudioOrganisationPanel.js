import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadRequests, requestResult } from '../actions';
import { bindActionCreators } from 'redux';

//import RequestsRepresentation from '../components/RequestsRepresentation';
import RequestsRepresentation from '../../../shared_components/studio-view/requests-representation';
import MainStudioRepresentation from '../components/MainStudioRepresentation';

class StudioOrganisationPanel extends Component {
    componentDidMount() {
        // organisation id is passed as a global javascript variable from django template
        const { loadRequests, params } = this.props;
        loadRequests(organisationId);
    }
    render(){
        const { relations, pending_requests, org_u_rows } = this.props.studio;
        const { loadRequests, requestResult, params } = this.props;
        const showRequests = (org_id) => loadRequests(org_id);
        const submitRequestResult = (pr_id, result) => requestResult(organisationId, pr_id, result);
        
        return (
            <div>
                <RequestsRepresentation relations={relations} pending_requests={pending_requests} org_u_rows={org_u_rows} curr_organisation_id={organisationId} showRequests={showRequests} submitRequestResult={submitRequestResult}/>
                <MainStudioRepresentation relations={relations} pending_requests={pending_requests} org_u_rows={org_u_rows} curr_organisation_id={organisationId} curr_request_id={params.requestId} curr_pending_id={params.pendingId}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studio: state.studio,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadRequests, requestResult
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudioOrganisationPanel);