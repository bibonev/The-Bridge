
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


const ORGANISATIONS_INITIAL = {
    rows: [],
    count: 0,
    page: 1,
    search: getParameterByName('search'),
    organisations: {},
}
export const organisations = (state=ORGANISATIONS_INITIAL, action) => {
    let idx = 0;
    switch (action.type) {
        case 'SHOW_ORGANISATIONS':
            console.log("Action", action);
            return Object.assign({}, state, {
                rows: action.organisations,
                count: action.organisations.length,
            });
            break;
        case 'CHANGE_PAGE':
            return Object.assign({}, state, {
                page: action.page
            });
            break;
        case 'CHANGE_SEARCH':
            return Object.assign({}, state, {
                search: action.search
            });
            break;
    }
    return state;
}

