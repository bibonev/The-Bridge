const STUDIO_INITIAL = {
    requests: [],
    org_u_rows: [],
};


export const studio = (state=STUDIO_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_REQUESTS':
            return Object.assign({}, state, {
                requests: action.requests,
            });
        case 'ORGANISATION_CHOICE':
            return Object.assign({}, state, {
                org_u_rows: action.organisations,
            });
        default:
            return state;
    }
};