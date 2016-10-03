const updateRating = (state, action) => {
    switch(action.type){
        case 'UPDATE_RATING':
            return [...state, action.comment]
        default:
            return state;
    }
}

export const ratings = (state={}, action) => {
    switch (action.type) {
        case 'UPDATE_RATING':
            return {
                    ...state, 
                    [action.org_id]: updateRating(state[action.org_id], action)
            }
        default:
            return state;
    }
};

/* export const comments = (state={}, action) => {
    switch (action.type) {
        case 'SHOW_COMMENTS':
            return {
                    ...state,
                    [action.id]: action.comments
            }
        case 'ADD_COMMENT':
            return {
                    ...state, 
                    [action.id]: postComment(state[action.id], action)
            }
        default:
            return state;
    }
}; */