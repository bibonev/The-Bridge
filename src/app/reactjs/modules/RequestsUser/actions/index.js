export function showRequestsResult(pending, relations) {
    return {
        type: "SHOW_REQUESTS",
        pending_requests: pending,
        relations
    };
}

export function loadRequests() {
    return (dispatch, getState) => {
        let url = `http://localhost:8000/api/v1/pending_requests/currentUser/`;
        $.get(url, data_pending => {
            let url_relation = `http://localhost:8000/api/v1/relations/currentUser/`;
            $.get(url_relation, data_relation => {
                dispatch(showRequestsResult(data_pending, data_relation));
            });
        });
    }
}

