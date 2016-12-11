export function showRequestsResult(pending, relations) {
    return {
        type: "SHOW_REQUESTS",
        pending_requests: pending,
        relations
    };
}

export function showMessagesResult(messages) {
    return {
        type: "SHOW_CHAT_MESSAGES",
        messages
    };
}

export function loadRequests() {
    return (dispatch, getState) => {
        let url = `http://localhost:8000/api/v1/pending_requests/currentUser/`;
        $.get(url, data_pending => {
            let url_relation = `http://localhost:8000/api/v1/relations/currentUser/`;
            $.get(url_relation, data_relation => {
                dispatch(showRequestsResult(data_pending, data_relation));
            });
        });
    }
}

export function loadRequestObject(requestId, type){
    return (dispatch, getState) => {
        let url = `http://localhost:8000/api/v1/messages/currentUserWithOrganisationList/?request_id=${requestId}&request_type=${type}`;
        $.get(url, data => {
            dispatch(showMessagesResult(data));
        });
    }
}

export function sendMessage(message, chatsock){
    return (dispatch, getState) => {

        var send_message = {
            handle: "Simeon",
            message: message,
        }
        chatsock.send(JSON.stringify(send_message));
        
    }
}

