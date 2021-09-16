import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";

const INITIAL_STATE = {
  tags: [],
  comparison: [],
  redirection: {
    data: [], 
    shouldRedirect: false
  }
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case actionTypes.UPDATE_COMPARE_TAGS:
      return updateObject(state, { tags: action.payload });

    case actionTypes.UPDATE_COMPARISON:
      return updateObject(state, { comparison: action.payload });

    case actionTypes.UPDATE_REDIRECTION_ARRAY:
      return updateObject(state, { redirection: action.payload });

    case actionTypes.DASHBOARD_INITIAL_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};



export default dashboardReducer;