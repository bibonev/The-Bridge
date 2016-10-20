
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const SUGGESTIONS_INITIAL = {
    suggestions: []
};

export const organisations = (state=SUGGESTIONS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_SUGGESTIONS':
            return Object.assign({}, state, {
                suggestions: action.suggestions,
            });
        case 'CLEAR_SUGGESTIONS':
            return Object.assign({}, state, {
                suggestions: [],
            });
        default:
            return state;
    }
};

