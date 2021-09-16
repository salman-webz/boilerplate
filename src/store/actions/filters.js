import * as actionTypes from "./types";


export const setSearchFilters = (filters) => {
    
    return {
        type: actionTypes.SET_SEARCH_FILTERS,
        payload: filters
    }
}

export const setSearchClickState = (isClicked) => {
    return {
        type: actionTypes.SET_SEARCH_CLICK_STATE,
        payload: isClicked
    }
}

export const removeAllFilters = () => {
    return {
        type: actionTypes.REMOVE_ALL_FILTERS
    }
}