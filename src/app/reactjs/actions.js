import { history } from  './store'
import { formatUrl } from './util/formatters'

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
    }
}

export function changeSearchAndLoadOrganisations(search) {
    return (dispatch, getState) => {
        dispatch(changeSearch(search))
        history.push( {
            search: formatUrl(getState().organisations)
        } )
        dispatch(loadOrganisations())
    }
}

export function loadOrganisations() {
    return (dispatch, getState) => {
        let state = getState();
        let { search } = state.organisations
        let url = `http://localhost:8000/api/v1/organisations/?search=`;
        if(search) {
            url+=`${search}`
        }

        // const data = [
        //     {title: "Microsoft", description: "asd", locations: "London"},
        //     {title: "Apple", description: "bgd", locations: "Birmingham"},
        // ];

        // dispatch(showOrganisationsResult(data));
        
        $.get(url, data => {
            setTimeout(() => {
                dispatch(showOrganisationsResult(data));
            }, 1000);
        });
    }
}