var update = require('react/lib/update')

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const POSTS_INITIAL = {
    rows: [],
    count: 0,
    page: 1,
    posts: {},

};

export const posts = (state=POSTS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_POSTS':
            return Object.assign({}, state, {
                rows: action.posts,
                count: action.posts.length,
            });
        case 'ADD_POST':
            return {
                ...state,
                rows: [
                    action.post,
                    ...state.rows,
                ]
            }
        default:
            return state;
    }
};

const postComment = (state, action) => {
    switch(action.type){
        case 'ADD_COMMENT':
            return [...state, action.comment]
        default:
            return state;
    }
}

export const comments = (state={}, action) => {
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
};