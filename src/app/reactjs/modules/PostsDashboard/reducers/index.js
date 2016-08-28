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