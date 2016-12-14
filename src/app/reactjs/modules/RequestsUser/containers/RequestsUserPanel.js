import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadRequests, requestResult, loadRequestObject, sendMessage, showMessage } from '../actions';
import { bindActionCreators } from 'redux';
import { ChatAPI } from '../utils/ChatAPI'

//import RequestsRepresentation from '../components/RequestsRepresentation';
import RequestsRepresentation from '../../../shared_components/studio-view/requests-representation';
import MainRequestsRepresentation from '../components/MainRequestsRepresentation';

let chatsock;

class RequestsUserPanel extends Component {
    componentDidMount() {
        const { loadRequests, loadRequestObject, params } = this.props;
        let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        loadRequests();
        // calling the chat api when the component is initially called
        if(typeof params.requestId !== 'undefined'){
            ChatAPI.connect(params.requestId);
            ChatAPI.listen(this.context.store);
            loadRequestObject(params.requestId, 'relation')
        }else if(typeof params.pendingId !== 'undefined'){
            cChatAPI.connect(params.pendingId);
            ChatAPI.listen(this.context.store);
            loadRequestObject(params.pendingId, 'pending')
        }
    }
    componentWillReceiveProps(newProps){
        const { loadRequests, loadRequestObject, params } = this.props;
        // calling chat api when the request id is changed
        if(newProps.params.requestId != params.requestId || newProps.params.pendingId != params.pendingId){

            if(typeof newProps.params.requestId !== 'undefined'){
                ChatAPI.connect(newProps.params.requestId);
                ChatAPI.listen(this.context.store);
                loadRequestObject(newProps.params.requestId, 'relation')
            }else if(typeof newProps.params.pendingId !== 'undefined'){
                ChatAPI.connect(newProps.params.pendingId);
                ChatAPI.listen(this.context.store);
                loadRequestObject(newProps.params.pendingId, 'pending')
            }
        }
    }
    render(){
        const { relations, pending_requests } = this.props.requests_user;
        const { conversation, messages } = this.props.chat;
        const { loadRequests, requestResult, sendMessage, showMessage, params } = this.props;
        const addCurrentMessage = (handler, message) => ChatAPI.send(handler, message);

        return (
            <div>
                <RequestsRepresentation relations={relations} pending_requests={pending_requests} />
                <MainRequestsRepresentation relations={relations} pending_requests={pending_requests} curr_request_id={params.requestId} curr_pending_id={params.pendingId} conversation={conversation} messages={messages} addCurrentMessage={addCurrentMessage}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    requests_user: state.requests_user,
    chat: state.chat,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadRequests, requestResult, loadRequestObject, sendMessage, showMessage
}, dispatch)

RequestsUserPanel.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsUserPanel);