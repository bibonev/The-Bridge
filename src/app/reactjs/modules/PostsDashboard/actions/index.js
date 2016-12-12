export function showPostsResult(jsonResult) {
    return {
        type: "SHOW_POSTS",
        posts: jsonResult
    };
}

export function showCommentsResult(jsonResult, id) {
    return {
        type: "SHOW_COMMENTS",
        comments: jsonResult,
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

export function showOrganisationsCurrentUser(jsonResult){
    return {
        type: "SHOW_ORGANISATIONS_USER",
        organisations: jsonResult
    }
}

export function updateCurrentAuthorId(author_id){
    return {
        type: "UPDATE_COMMENT_AUTHOR_ID",
        author_id
    }
}

export function bookmarkOrganisationResult(jsonResult){
    return {
        type: "BOOKMARK_ORGANISATION",
        bookmarks:jsonResult
    }
}

export function savePendingsAndRelationsResult(pending, relations){
    return {
        type: "REQUEST_STATUS",
        pending_requests: pending,
        relations
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

export function loadPosts() {
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/posts/`;
        $.get(url, data => {
            dispatch(showPostsResult(data));
            dispatch(loadOrganisationsCurrentUser());
            dispatch(loadPendingsAndRelationsCurrUser());
            let url_get = `http://localhost:${port}/api/v1/organisations/currentUserBookmarks/`
                $.get(url_get, data_get => {
                    dispatch(bookmarkOrganisationResult(data_get));
                });
        });
    }
}

export function loadComments(post_id){
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/comments/?post=${post_id}`
        $.get(url, data => {
            dispatch(showCommentsResult(data, post_id));
        });
    };
}

export function addCommentToPost(post_id, author_id, comment){
    function getCookie(name){
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function csrfSafeMethod(method){
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    return (dispatch, getState) => {
        let url='';

        if(author_id == -1){
            url = `http://localhost:${port}/api/v1/comments/create/?type=user&post_id=${post_id}`
        }else{
            url = `http://localhost:${port}/api/v1/comments/create/?type=organisation&org_id=${author_id}&post_id=${post_id}`
        }
        
        let type = 'POST'
        
        $.ajax({
            type,
            url,
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            data: comment,
            success: (data) => {
                let comment_id = data.id;
                let url_get = `http://localhost:${port}/api/v1/comments/${comment_id}`
                $.get(url_get, data_get => {
                    dispatch(addCommentResult(data_get, post_id));
                });
            },
            error: (data) => {
                console.log(data);
            }
        });
    };
}

export function currentAuthorId(author_id){
    return (dispatch, getState) => {
        dispatch(updateCurrentAuthorId(author_id));
    }
}


export function bookmarkOrganisation(org_id){
    function getCookie(name){
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function csrfSafeMethod(method){
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    return (dispatch, getState) => {
        let url=`http://localhost:${port}/api/v1/organisations/${org_id}/edit_bookmark/`;
        let type = 'PUT'
        
        $.ajax({
            type,
            url,
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            data: {},
            success: (data) => {
                let url_get = `http://localhost:${port}/api/v1/organisations/currentUserBookmarks/`
                $.get(url_get, data_get => {
                    dispatch(bookmarkOrganisationResult(data_get));
                });
            },
            error: (data) => {
                console.log(data);
            }
        });
    };
}

export function loadPendingsAndRelationsCurrUser(){
    return (dispatch, getState) => {
        let url_pending = `http://localhost:${port}/api/v1/pending_requests/currentUser/`
        $.get(url_pending, data_pending => {
            let url_relation = `http://localhost:${port}/api/v1/relations/currentUser/`
            $.get(url_relation, data_relation => {
                dispatch(savePendingsAndRelationsResult(data_pending, data_relation));
            });
        });
    }
}

