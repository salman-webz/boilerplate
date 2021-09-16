import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";

const INITIAL_STATE = {
  currentPage: 1,
  limit: 10,
  limitRanges: [10,20,50,100],
  pageCount: 1
};

const userPReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_SELECTED_PAGE:
      return updateObject(state, { currentPage: action.payload });

    case actionTypes.LIMIT_USER_PER_PAGE:
       return updateObject(state, { limit: action.payload });

    case actionTypes.SET_USER_PAGE_COUNT:
      return updateObject(state, { pageCount: action.payload });

    // case actionTypes.SET_PAGINATION_INITIAL_STATE:
    //   return INITIAL_STATE;

    default:
      return state;
  }
};

export default userPReducer;
