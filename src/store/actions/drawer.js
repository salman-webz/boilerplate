import * as actionTypes from "./types";

export const closeAllDrawer = () => {
    return {
        type: actionTypes.CLOSE_ALL_DRAWER
    }
}

export const openDrawer = (open) => {
    
    return {
        type: actionTypes.OPEN_DRAWER,
        payload: open
    }
}
