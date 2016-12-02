import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadRequests, requestResult } from '../actions';
import { bindActionCreators } from 'redux';

//import RequestsRepresentation from '../components/RequestsRepresentation';
import RequestsRepresentation from '../../../shared_components/studio-view/requests-representation';
import MainRequestsRepresentation from '../components/MainRequestsRepresentation';

class RequestsUserPanel extends Component {
    componentDidMount() {
        const { loadRequests } = this.props;
        loadRequests();
    }
    render(){
        const { relations, pending_requests } = this.props.requests_user;
        const { loadRequests, requestResult, params } = this.props;
        
        return (
            <div>
                <RequestsRepresentation relations={relations} pending_requests={pending_requests} />
                <MainRequestsRepresentation relations={relations} pending_requests={pending_requests} curr_request_id={params.requestId} curr_pending_id={params.pendingId}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    requests_user: state.requests_user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadRequests
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RequestsUserPanel);