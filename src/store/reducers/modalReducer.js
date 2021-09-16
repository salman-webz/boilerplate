import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";

const INITIAL_STATE = {
  deleteModal: false,
  abortModal: false,
  downloadModal: false
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      let { deleteModal, abortModal, downloadModal } = action.payload;
      return updateObject(state, { deleteModal: deleteModal || false, abortModal: abortModal || false, downloadModal: downloadModal || false });

    default:
      return state;
  }
};

export default modalReducer;
