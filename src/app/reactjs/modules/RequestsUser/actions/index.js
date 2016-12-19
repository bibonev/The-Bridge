export function showRequestsResult(pending, relations) {
    return {
        type: "SHOW_REQUESTS",
        pending_requests: pending,
        relations
    };
}

export function showConversationResult(conversation, messages) {
    return {
        type: "SHOW_CONVERSATION",
        conversation,
        messages
    };
}

export function showMessageResult(message) {
    return {
        type: "SHOW_MESSAGE",
        message
    };
}

export function loadRequests() {
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/pending_requests/currentUser/`;
        $.get(url, data_pending => {
            let url_relation = `http://localhost:${port}/api/v1/relations/currentUser/`;
            $.get(url_relation, data_relation => {
                dispatch(showRequestsResult(data_pending, data_relation));
            });
        });
    }
}

export function loadRequestObject(requestId, type){
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/messages/conversationUserOrganisation/?request_id=${requestId}&request_type=${type}&user_type=user`;
        $.get(url, data => {
            let conversation_info = {
                id: data.id,
                user: data.user,
                organisation: data.organisation,
                label: data.label
            }

            let messages = data.messages;
            dispatch(showConversationResult(conversation_info, messages));
        });
    }
}

export function showMessage(data){
    return (dispatch, getState) => {
        let show_message = {
            handle: data.handle,
            handle_type: data.handle_type,
            message: data.message,
            timestamp: data.timestamp
        }

        dispatch(showMessageResult(show_message))
        
    }
}

