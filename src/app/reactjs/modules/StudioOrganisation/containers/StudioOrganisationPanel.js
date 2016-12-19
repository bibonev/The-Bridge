import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadRequests, requestResult, loadRequestObject, sendMessage, showMessage } from '../actions';
import { ChatAPI } from '../utils/ChatAPI'

import RequestsRepresentation from '../../../shared_components/studio-view/requests-representation';
import MainStudioRepresentation from '../components/MainStudioRepresentation';

class StudioOrganisationPanel extends Component {
    componentDidMount() {
        // organisation id is passed as a global javascript variable from django template
        const { loadRequests, loadRequestObject, params } = this.props;
        loadRequests(organisationId);
        // calling the chat api when the component is initially called
        if(typeof params.requestId !== 'undefined'){
            ChatAPI.connect(params.requestId);
            ChatAPI.listen(this.context.store);
            loadRequestObject(params.requestId, 'relation')
        }else if(typeof params.pendingId !== 'undefined'){
            ChatAPI.connect('/pending/' + params.pendingId);
            ChatAPI.listen(this.context.store);
            loadRequestObject(params.pendingId, 'pending')
        }
    }

    componentWillReceiveProps(newProps){
        const { loadRequestObject, params } = this.props;
        // calling chat api when the request id is changed
        if(newProps.params.requestId != params.requestId || newProps.params.pendingId != params.pendingId){

            if(typeof newProps.params.requestId !== 'undefined'){
                ChatAPI.connect(newProps.params.requestId);
                ChatAPI.listen(this.context.store);
                loadRequestObject(newProps.params.requestId, 'relation')
            }else if(typeof newProps.params.pendingId !== 'undefined'){
                ChatAPI.connect('/pending/' + newProps.params.pendingId);
                ChatAPI.listen(this.context.store);
                loadRequestObject(newProps.params.pendingId, 'pending')
            }
        }
    }

    render(){
        const { relations, pending_requests, org_u_rows } = this.props.studio;
        const { loadRequests, requestResult, sendMessage, params } = this.props;
        const { conversation, messages } = this.props.chat;
        const showRequests = (org_id) => loadRequests(org_id);
        const submitRequestResult = (pr_id, result) => requestResult(organisationId, pr_id, result);
        const addCurrentMessage = (handler, message) => ChatAPI.send(handler, message);

        return (
            <div>
                <RequestsRepresentation relations={relations} pending_requests={pending_requests} org_u_rows={org_u_rows} curr_organisation_id={organisationId} showRequests={showRequests} submitRequestResult={submitRequestResult}/>
                <MainStudioRepresentation relations={relations} pending_requests={pending_requests} org_u_rows={org_u_rows} curr_organisation_id={organisationId} curr_request_id={params.requestId} curr_pending_id={params.pendingId} conversation={conversation} messages={messages} addCurrentMessage={addCurrentMessage}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studio: state.studio,
    chat: state.chat
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadRequests, requestResult, loadRequestObject, sendMessage, showMessage
}, dispatch)

StudioOrganisationPanel.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(StudioOrganisationPanel);