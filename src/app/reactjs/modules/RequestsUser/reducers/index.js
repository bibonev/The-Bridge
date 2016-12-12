const REQUESTS_USER_INITIAL = {
    pending_requests: [],
    relations: [],
};


export const requests_user = (state=REQUESTS_USER_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_REQUESTS':
            return Object.assign({}, state, {
                pending_requests: action.pending_requests,
                relations: action.relations,
            });
        default:
            return state;
    }
};

const CHAT_INITIAL = {
    conversation: {},
    messages: []
};

export const chat = (state=CHAT_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_CONVERSATION':
            return Object.assign({}, state, {
                conversation: action.conversation,
                messages: action.messages
            });
        case 'SHOW_MESSAGE':
            return Object.assign({}, state, {
                messages: [
                    ...state.messages,
                    action.message,
                ]
            });
        default:
            return state;
    }
};

