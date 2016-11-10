export function showRequestsResult(jsonResult) {
    return {
        type: "SHOW_REQUESTS",
        requests: jsonResult
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
        $.get(url, data => {
            dispatch(showRequestsResult(data));
            dispatch(loadOrganisationsCurrentUser());
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


