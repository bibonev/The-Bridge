export function showRequestsResult(pending, relations) {
    return {
        type: "SHOW_REQUESTS",
        pending_requests: pending,
        relations
    };
}

export function showOrganisationsCurrentUser(jsonResult){
    return {
        type: "ORGANISATION_CHOICE",
        organisations: jsonResult
    }
}

export function loadRequests(org_id) {
    return (dispatch, getState) => {
        let url = `http://localhost:8000/api/v1/pending_requests/?org_id=${org_id}`;
        $.get(url, data_pending => {
            let url_relation = `http://localhost:8000/api/v1/relations/?org_id=${org_id}`;
            $.get(url_relation, data_relation => {
                dispatch(showRequestsResult(data_pending, data_relation));
                dispatch(loadOrganisationsCurrentUser());
            });
        });
    }
}

export function loadOrganisationsCurrentUser(){
    return (dispatch, getState) => {
        let url = `http://localhost:8000/api/v1/organisations/currentUser/`;
        $.get(url, data => {
            dispatch(showOrganisationsCurrentUser(data));
        });
    }
}

export function requestResult(org_id, pending_request_id, result){
    return (dispatch, getState) => {
        let url = `http://localhost:8000/api/v1/pending_requests/result/?org_id=${org_id}&pending_request_id=${pending_request_id}&result=${result}`;
        $.get(url, data_pending => {
            let url_relation = `http://localhost:8000/api/v1/relations/?org_id=${org_id}`;
            $.get(url_relation, data_relation => {
                dispatch(showRequestsResult(data_pending, data_relation));
            });
        });
    }
}

