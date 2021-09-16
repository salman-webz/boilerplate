import * as actionTypes from "./types";

export const modal = (val) => {
    return {
        type: actionTypes.SHOW_MODAL,
        payload: val
    }
}