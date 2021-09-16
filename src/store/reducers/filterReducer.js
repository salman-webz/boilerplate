import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";

const INITIAL_STATE = {
  tags: {
    malicious: [],
    users: [],
    startDate: null,
    endDate: null
  },
  minimumTagsToDisplay: 3,
  isSearchClicked: false
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_FILTERS:
      return updateObject(state, {
        ...state.minimumTagsToDisplay,
        tags: action.payload
      });
  
    case actionTypes.SET_SEARCH_CLICK_STATE:
      return updateObject(state, { ...state, isSearchClicked: action.payload });

    case actionTypes.REMOVE_ALL_FILTERS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default filterReducer;
