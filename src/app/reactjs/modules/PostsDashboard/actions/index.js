export function showPostsResult(jsonResult) {
    return {
        type: "SHOW_POSTS",
        posts: jsonResult
    };
}

export function LoadPosts() {
    return (dispatch, getState) => {
        dispatch(loadPosts());
    };
}

export function loadPosts() {
    return (dispatch, getState) => {
        let state = getState();
        let url = `http://localhost:8000/api/v1/posts/?format=json`;
        $.get(url, data => {
            dispatch(showPostsResult(data));
        });
    }
}