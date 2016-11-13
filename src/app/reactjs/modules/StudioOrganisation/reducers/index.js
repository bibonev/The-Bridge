const STUDIO_INITIAL = {
    pending_requests: [],
    relations: [],
    org_u_rows: [],
};


export const studio = (state=STUDIO_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_REQUESTS':
            return Object.assign({}, state, {
                pending_requests: action.pending_requests,
                relations: action.relations,
            });
        case 'ORGANISATION_CHOICE':
            return Object.assign({}, state, {
                org_u_rows: action.organisations,
            });
        default:
            return state;
    }
};