import * as actionTypes from "../actions/types";
import { updateObject } from '../../utils/utility';

const INITIAL_STATE = {
  name: '',
  msg: '',
  active: ''
};

const toasterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TOASTER_TOGGLE:
      let { name, msg, active } = action.payload;
      active = !name && !msg ? false : true;
      name = !name ? state.name : name;
      msg = !msg ? state.msg : msg;
      return updateObject(state, { 
          name, 
          msg,
          active
        });

    default:
      return state;
  }
};

export default toasterReducer;