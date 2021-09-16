import * as actionTypes from "./types";


export const setUserCurrentPage = (page) => {
    
    return {
        type: actionTypes.USER_SELECTED_PAGE,
        payload: page
    }
}

export const limitUserPerPage = (limit) => {
    
    return {
        type: actionTypes.LIMIT_USER_PER_PAGE,
        payload: limit
    }
}

export const setUserPageCount = (count) => {
    return {
        type: actionTypes.SET_USER_PAGE_COUNT,
        payload: count
    }
}

// export const setPaginationInitialState = () => {
//     return {
//         type: actionTypes.SET_PAGINATION_INITIAL_STATE
//     }
// }
