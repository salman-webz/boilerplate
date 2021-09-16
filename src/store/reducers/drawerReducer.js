import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";

const INITIAL_STATE = {
 addEditRegex : false,
};

const drawerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.OPEN_DRAWER:
      return updateObject(state, { ...state, [action.payload.key]: action.payload.value });

    case actionTypes.CLOSE_ALL_DRAWER:
      return updateObject(state, { ...INITIAL_STATE })

    default:
      return state;
  }
};

export default drawerReducer;
