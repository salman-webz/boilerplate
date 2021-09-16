import * as actionTypes from "./types";

export const toast = (type,msg) => {
    return {
      type: actionTypes.TOASTER_TOGGLE,
      payload: {
        name: type,
        msg: msg,
        active: true
      }
    };
};

export default toast;
