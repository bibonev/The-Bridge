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

export function updateCurrentOrganisationId(org_id){
    return {
        type: "UPDATE_ORGANISATION_ID",
        org_id
    }
}
export function updateCurrentRequestId(request_id){
    return {
        type: "UPDATE_REQUEST_ID",
        request_id
    }
}

const data1 = [
    {'id':'0', 'name': 'Simeon Kostadinov'},
    {'id':'1', 'name': 'Martin Kostadinov'},
]
const data2 = [
    {'id':'2', 'name': 'Boyan Bonev'},
    {'id':'3', 'name': 'Mitio Pishtova'},
]

export function loadRequests(org_id) {
    return (dispatch, getState) => {
            var d = {};
            if(org_id == 2){
                d = data1;
            }else{
                d = data2;
            }
            dispatch(showRequestsResult(d));
            dispatch(loadOrganisationsCurrentUser());
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
export function currentOrganisationId(org_id){
    return (dispatch, getState) => {
        dispatch(updateCurrentOrganisationId(org_id));
    }
}
export function currentRequestId(request_id){
    return (dispatch, getState) => {
        dispatch(updateCurrentRequestId(request_id));
    }
}


