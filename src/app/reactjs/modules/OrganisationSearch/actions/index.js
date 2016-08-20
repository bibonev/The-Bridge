export function showOrganisationsResult(jsonResult) {
    return {
        type: "SHOW_ORGANISATIONS",
        organisations: jsonResult
    };
}

export function changeSearch(search) {
    return {
        type: 'CHANGE_SEARCH',
        search
    };
}

export function changeSearchAndLoadOrganisations(search) {
    return (dispatch, getState) => {
        dispatch(changeSearch(search));
        dispatch(loadOrganisations());
    };
}

export function loadOrganisations() {
    return (dispatch, getState) => {
        let state = getState();
        let { search } = state.organisations
        let url = `http://localhost:8000/api/v1/organisations/?search=`;
        if(search) {
            url+=`${search}`
        }
        
        $.get(url, data => {
            dispatch(showOrganisationsResult(data));
        });
    }
}