import * as actionTypes from "../actions/types";
import { updateObject } from '../../utils/utility';

const INITIAL_STATE = {
  isSignedIn: null,
  token: null,
  user: null,
  loading: false,
  error: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });

    case actionTypes.AUTH_SUCCESS:
      const { token, user } = action.payload;
      return updateObject(state, {
        token,
        user,
        error: null,
        loading: false,
        isSignedIn: true
      });

    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.payload.error, loading: false, isSignedIn: false });

    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: null, user: null, isSignedIn: null });

    case actionTypes.AUTH_USER_UPDATE:
      return updateObject(state, { user: action.payload });      

    default:
      return state;
  }
};

export default reducer;