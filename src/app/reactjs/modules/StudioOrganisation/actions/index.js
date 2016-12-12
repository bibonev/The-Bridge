export function showRequestsResult(pending, relations) {
    return {
        type: "SHOW_REQUESTS",
        pending_requests: pending,
        relations
    };
}

export function showOrganisationsCurrentUser(jsonResult){
    return {
        type: "ORGANISATION_CHOICE",
        organisations: jsonResult
    }
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

export function loadRequests(org_id) {
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/pending_requests/?org_id=${org_id}`;
        $.get(url, data_pending => {
            let url_relation = `http://localhost:${port}/api/v1/relations/?org_id=${org_id}`;
            $.get(url_relation, data_relation => {
                dispatch(showRequestsResult(data_pending, data_relation));
                dispatch(loadOrganisationsCurrentUser());
            });
        });
    }
}

export function loadOrganisationsCurrentUser(){
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/organisations/currentUser/`;
        $.get(url, data => {
            dispatch(showOrganisationsCurrentUser(data));
        });
    }
}

export function requestResult(org_id, pending_request_id, result){
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/pending_requests/result/?org_id=${org_id}&pending_request_id=${pending_request_id}&result=${result}`;
        $.get(url, data_pending => {
            let url_relation = `http://localhost:${port}/api/v1/relations/?org_id=${org_id}`;
            $.get(url_relation, data_relation => {
                dispatch(showRequestsResult(data_pending, data_relation));
            });
        });
    }
}

export function loadRequestObject(requestId, type){
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/messages/conversationUserOrganisation/?request_id=${requestId}&request_type=${type}&user_type=organisation`;
        $.get(url, data => {
            let conversation_info = {
                id: data.id,
                user: data.user,
                organisation: data.organisation,
                label: data.label
            }

            let messages = data.messages;
            console.log(data)
            dispatch(showConversationResult(conversation_info, messages));
        });
    }
}

export function sendMessage(handler, message, chatsock){
    return (dispatch, getState) => {

        let send_message = {
            handle: handler,
            message: message,
        }
        chatsock.send(JSON.stringify(send_message));
        
    }
}

export function showMessage(data){
    return (dispatch, getState) => {
        let show_message = {
            handle: data.handle,
            message: data.message,
            timestamp: data.timestamp
        }

        dispatch(showMessageResult(show_message))
        
    }
}

