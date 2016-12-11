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
    messages: []
};

export const chat = (state=CHAT_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_CHAT_MESSAGES':
            return Object.assign({}, state, {
                messages: action.messages
            });
        default:
            return state;
    }
};

