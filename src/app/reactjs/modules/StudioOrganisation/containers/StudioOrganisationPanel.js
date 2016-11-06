import React, {Component}  from 'react';
import StarRating from 'react-star-rating';
import { connect } from 'react-redux';
import { loadRequests } from '../actions';
import { bindActionCreators } from 'redux';

import RequestsRepresentation from '../components/RequestsRepresentation';
import MainStudioRepresentation from '../components/MainStudioRepresentation';

class StudioOrganisationPanel extends Component {
    componentWillMount() {
        const { loadRequests, params } = this.props;
        loadRequests(params.orgId);
    }
    render(){
        const { requests, org_u_rows } = this.props.studio;
        const { loadRequests, params } = this.props;
        const showRequests = (org_id) => loadRequests(org_id);
        return (
            <div>
                <RequestsRepresentation requests={requests} org_u_rows={org_u_rows} curr_organisation_id={params.orgId} showRequests={showRequests}/>
                <MainStudioRepresentation requests={requests} org_u_rows={org_u_rows} curr_organisation_id={params.orgId} curr_request_id={params.requestId}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studio: state.studio,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadRequests
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudioOrganisationPanel);