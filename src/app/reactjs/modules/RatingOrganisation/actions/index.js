export function updateRatingResult(org_id, rating) {
    return {
        type: "UPDATE_RATING",
        org_id,
        rating
    };
}

export function updateRating(org_id, rating) {
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
        let url = `http://localhost:8000/api/v1/organsiations/${org_id}/reviews/create/`
        let type = 'POST'

        $.ajax({
            type,
            url,
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            data: post,
            success: (data) => {
                //dispatch(updateRatingResult(org_id, rating))
                console.log(JSON.stringify(data))
            },
            error: (data) => {
                console.log(data);
            }
        });
    }
}

