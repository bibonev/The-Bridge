export function loadingChanged(isLoading) {
    return {
        type: "IS_LOADING",
        isLoading
    }
}

export function showOrganisationsResult(jsonResult) {
    return {
        type: "SHOW_ORGANISATIONS",
        organisations: jsonResult
    };
}

export function changeSearch(search, ratings, location, category) {
    return {
        type: 'CHANGE_SEARCH',
        search,
        ratings,
        location,
        category
    };
}

export function changeSearchAndLoadOrganisations(search, ratings) {
    return (dispatch, getState) => {
        dispatch(changeSearch(search, ratings));
        dispatch(loadOrganisations());
    };
}

export function loadOrganisations() {
    return (dispatch, getState) => {
        let state = getState();
        let { search, ratings, location, category } = state.organisations;
        let organisations = [];

        //Search term
        let searchTerm = "";

        if(localStorage.getItem("searchTerm") != ""){
            searchTerm = localStorage.getItem("searchTerm");
        } else {
            searchTerm = search;
        }

        //Initial url
        let url = `http://localhost:8000/api/v1/organisations/?`;
        
        if(searchTerm) {
            url += "search=" + `${searchTerm}` + "&";
        }

        //Ratings
        console.log(ratings);
        if(ratings.length == 2 && !isNaN(ratings[0]) && !isNaN(ratings[1])) {
            url += "rating1=" + `${ratings[0]}` + "&rating2=" + `${ratings[1]}` + "&";
        }

        //Locations
        if(location !== undefined) {
            url += "locations=" + `${location}` + "&";
        }

        //Categories
        if(category !== undefined) {
            url += "category=" + `${category}`;
        }

        $.get(url, data => {
            dispatch(showOrganisationsResult(data));
            dispatch(loadingChanged(false));
        });
    }
}