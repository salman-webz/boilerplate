import * as actionTypes from "../actions/types";
import { updateObject } from '../../utils/utility';

const INITIAL_STATE = {
  selectedUser: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case actionTypes.UPDATE_SELECTED_USER:
      return updateObject(state, { selectedUser : action.payload.user });

    default:
      return state;
  }
};

export default userReducer;