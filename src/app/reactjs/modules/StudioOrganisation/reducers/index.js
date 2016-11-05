function getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == "" || isNaN(org_id)){
            org_id = curr_url.pop();
        }
        return org_id;
    }

const STUDIO_INITIAL = {
    requests: [],
    org_u_rows: [],
    curr_organisation_id: -1,
    curr_request_id: -1,
};


export const studio = (state=STUDIO_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_REQUESTS':
            return Object.assign({}, state, {
                requests: action.requests,
                curr_request_id:action.requests[0].id,
            });
        case 'ORGANISATION_CHOICE':
            return Object.assign({}, state, {
                curr_organisation_id:getCurrentOrganisationId(),
                org_u_rows: action.organisations,
            });
        case 'UPDATE_ORGANISATION_ID':
            return Object.assign({}, state, {
                curr_organisation_id:action.org_id,
            });
        case 'UPDATE_REQUEST_ID':
            return Object.assign({}, state, {
                curr_request_id:action.request_id,
            });
        default:
            return state;
    }
};