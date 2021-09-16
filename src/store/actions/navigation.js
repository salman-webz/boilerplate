import * as actionTypes from "./types";
import { openDrawer } from "./drawer";

export const selectNavigation = item => {
  return {
    type: actionTypes.SELECT_NAVIGATION_ITEM,
    payload: item
  };
};

export const navigationChange = item => (dispatch, getState) => {
  dispatch(selectNavigation(item));
  if (getState().drawer.open) dispatch(openDrawer(false));
};
