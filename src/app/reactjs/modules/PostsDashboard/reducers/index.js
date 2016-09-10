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

const ORGANISATIONS_USER_INITIAL = {
    org_u_rows: [],
    count: 0
};

export const organisations_user = (state=ORGANISATIONS_USER_INITIAL, action) => {
    switch (action.type){
        case "SHOW_ORGANISATIONS_USER":
            return Object.assign({}, state, {
                org_u_rows: action.organisations,
                count: action.organisations.length,
            });
        default:
            return state;
    }
}

export const comment_author_id = (state={ author_id: -1 }, action) => {
    switch(action.type){
        case "UPDATE_COMMENT_AUTHOR_ID":
            return Object.assign({}, state, {
                author_id: action.author_id,
            })
        default:
            return state;
    }
}