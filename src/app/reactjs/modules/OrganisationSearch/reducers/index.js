
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const ORGANISATIONS_INITIAL = {
    rows: [],
    count: 0,
    page: 1,
    ratings: [],
    search: getParameterByName('search'),
    organisations: {},
};

export const organisations = (state=ORGANISATIONS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_ORGANISATIONS':
            return Object.assign({}, state, {
                rows: action.organisations,
                count: action.organisations.length,
            });
        case 'CHANGE_PAGE':
            return Object.assign({}, state, {
                page: action.page
            });
        case 'CHANGE_SEARCH':
            return Object.assign({}, state, {
                search: action.search,
                ratings: action.ratings
            });
        default:
            return state;
    }
};

export const ui = (state={}, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });
        default:
            return state;
    }
}
