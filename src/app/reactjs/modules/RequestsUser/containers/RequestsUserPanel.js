import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadRequests, requestResult } from '../actions';
import { bindActionCreators } from 'redux';

//import RequestsRepresentation from '../components/RequestsRepresentation';
import RequestsRepresentation from '../../../shared_components/studio-view/requests-representation';
//import MainStudioRepresentation from '../components/MainStudioRepresentation';

class RequestsUserPanel extends Component {
    componentDidMount() {
        const { loadRequests } = this.props;
        loadRequests();
    }
    render(){
        const { relations, pending_requests } = this.props.requests_user;
        const { loadRequests, requestResult } = this.props;
        
        return (
            <div>
                <RequestsRepresentation relations={relations} pending_requests={pending_requests} />
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