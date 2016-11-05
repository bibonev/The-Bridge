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

export function changeSearch(search, ratings) {
    return {
        type: 'CHANGE_SEARCH',
        search,
        ratings
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
        let { search, ratings } = state.organisations;
        let organisations = [];

        //Search term
        let searchTerm = "";

        if(localStorage.getItem("searchTerm") != ""){
            searchTerm = localStorage.getItem("searchTerm");
        } else {
            searchTerm = search;
        }

        let url = `http://localhost:8000/api/v1/organisations/?search=`;
        if(searchTerm) {
            url += `${searchTerm}`;
        }

        //Ratings
        dispatch(loadingChanged(true));
        
        if (ratings.length > 0) {
            ratings.forEach(function(rating) {
                url += url + "&review1=" + `${rating.valueFrom}` + "&review2=" + `${rating.valueTo}`;
                $.get(url, data => {
                    organisations = organisations.concat(data);
                });
            }, this);
        } else {
            $.get(url, data => {
                console.log("da: ", data);
                organisations = data.slice();
                console.log("org0: ", organisations);
                dispatch(showOrganisationsResult(organisations));
            });
        }

        //Remove duplicates
        // for(let i = 0; i < organisations.length - 1; i++) {
        //     for(let j = i+1; j < organisations.length; j++) {
        //         if(organisations[i].id == organisations[j].id) {
        //             organisations.splice(i, 1);
        //         }
        //     } 
        // }
        organisations = Array.from(new Set(organisations));

        //dispatch(showOrganisationsResult(organisations));
        //  dispatch(loadingChanged(false));
        localStorage.setItem("searchTerm", "");
    }
}