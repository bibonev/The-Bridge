export function showPostsResult(jsonResult) {
    return {
        type: "SHOW_POSTS",
        posts: jsonResult
    };
}

export function showCommentsResult(comments, id) {
    return {
        type: "SHOW_COMMENTS",
        comments,
        id
    };
}

export function addCommentResult(comment, id) {
    return {
        type: "ADD_COMMENT",
        comment,
        id
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

export function loadComments(comments, id){
    return (dispatch, getState) => {
        dispatch(showCommentsResult(comments, id));
    };
}

export function addCommentToPost(comment, id) {
    return (dispatch, getState) => {
        dispatch(addCommentResult(comment, id));
    };
}