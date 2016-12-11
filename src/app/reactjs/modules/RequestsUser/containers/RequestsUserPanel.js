import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadRequests, requestResult, loadRequestObject, sendMessage } from '../actions';
import { bindActionCreators } from 'redux';

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
            chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname + '/' + params.requestId);
            loadRequestObject(params.requestId, 'relation')
        }else if(typeof params.pendingId !== 'undefined'){
            chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname + 'pending/' + params.pendingId);
            loadRequestObject(params.pendingId, 'pending')
        }
    }
    componentWillReceiveProps(newProps){
        const { loadRequests, loadRequestObject } = this.props;
        // calling chat api when the request id is changed
        if(newProps.params.requestId != this.props.params.requestId || newProps.params.pendingId != this.props.params.pendingId){
            let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";

            if(typeof newProps.params.requestId !== 'undefined'){
                chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname + '/' + params.requestId);
                loadRequestObject(newProps.params.requestId, 'relation')
            }else if(typeof newProps.params.pendingId !== 'undefined'){
                chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname + 'pending/' + params.pendingId);
                loadRequestObject(newProps.params.pendingId, 'pending')
            }
        }
    }
    render(){
        const { relations, pending_requests } = this.props.requests_user;
        const { messages } = this.props.chat;
        const { loadRequests, requestResult, sendMessage, params } = this.props;
        const addCurrentMessage = (message) => sendMessage(message, chatsock);
        return (
            <div>
                <RequestsRepresentation relations={relations} pending_requests={pending_requests} />
                <MainRequestsRepresentation relations={relations} pending_requests={pending_requests} curr_request_id={params.requestId} curr_pending_id={params.pendingId} messages={messages} addCurrentMessage={addCurrentMessage}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    requests_user: state.requests_user,
    chat: state.chat,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadRequests, requestResult, loadRequestObject, sendMessage
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RequestsUserPanel);