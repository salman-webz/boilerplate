import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";

const INITIAL_STATE = {
  tags: [],
  loading: false,
  error: null,
};

const tagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TAG_START:
      return updateObject(state, { error: null, loading: true });

    case actionTypes.FETCH_TAG_SUCCESS:
      return updateObject(state, { error: null, loading: false });

    case actionTypes.FETCH_TAG_FAIL:
      return updateObject(state, { error: action.payload, loading: false });

    case actionTypes.UPDATE_TAGS:
      return updateObject(state, { tags: action.payload });

    default:
      return state;
  }
};

export default tagReducer;
