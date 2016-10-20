export function showSuggestions(suggestions) {
    return {
        type: "SHOW_SUGGESTIONS",
        suggestions: suggestions
    };
}

export function clearSuggestions() {
    return {
        type: "CLEAR_SUGGESTIONS",
    };
}

export function loadSuggestions(search) {
    return (dispatch, getState) => {
        let url = `http://localhost:8000/api/v1/organisations/?search=`;
        if(search && search != "") {
            url+=`${search}`;
            
            $.get(url, data => {
                let suggestions = [];
                data.forEach(function(element) {
                    suggestions.push(element);
                }, this);
                dispatch(showSuggestions(suggestions));
            });
        } else {
            dispatch(clearSuggestions());
        }
    }
}