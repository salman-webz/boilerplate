import * as actionTypes from "./types";


export const setCurrentPage = (page) => {
    
    return {
        type: actionTypes.SELECTED_PAGE,
        payload: page
    }
}

export const limitPerPage = (limit) => {
    
    return {
        type: actionTypes.LIMIT_PER_PAGE,
        payload: limit
    }
}

export const setPageCount = (count) => {
    return {
        type: actionTypes.SET_PAGE_COUNT,
        payload: count
    }
}

export const setPaginationInitialState = () => {
    return {
        type: actionTypes.SET_PAGINATION_INITIAL_STATE
    }
}
