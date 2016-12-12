export function showReviewsResult(jsonResult) {
    return {
        type: "SHOW_REVIEWS",
        reviews: jsonResult
    };
}

export function addReviewResult(org_id, jsonResult) {
    return {
        type: "ADD_REVIEW",
        org_id,
        review: jsonResult
    };
}

export function loadReviews(org_id) {
    return (dispatch, getState) => {
        let url = `http://localhost:${port}/api/v1/organisations/${org_id}/reviews/`;
        $.get(url, data => {
            dispatch(showReviewsResult(data));
        });
    }
}

export function addReview(org_id, text, rating) {
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
        let url = `http://localhost:${port}/api/v1/organisations/${org_id}/reviews/create/`
        let type = 'POST'
        $.ajax({
            type,
            url,
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            data: {rating: rating, text:text},
            success: (data) => {
                let review_id = data.id;
                let url_get = `http://localhost:${port}/api/v1/organisations/reviews/${review_id}`
                $.get(url_get, data_get => {
                    dispatch(addReviewResult(org_id, data_get));
                });
            },
            error: (data) => {
                console.log(data);
            }
        });
    }
}

