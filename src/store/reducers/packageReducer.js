import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";
import { ReactComponent as CardViewIcon } from "../../assets/svgs/cardViewIcon.svg";
import { ReactComponent as ListViewIcon } from "../../assets/svgs/listViewIcon.svg";

const INITIAL_STATE = {
  selectedView: "card",
  views: [
    { id: 1, name: "card", icon: CardViewIcon },
    { id: 2, name: "list", icon: ListViewIcon }
  ],
  packages: [],
  loading: false,
  error: null,
  selectedPackages: [],
  selectedPackageDetail: {},
  isExportAllSelected: false
};

const packageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PACKAGE_VIEW_SELECT:
      return updateObject(state, { selectedView: action.payload });

    case actionTypes.FETCH_START:
      return updateObject(state, { error: null, loading: true });

    case actionTypes.FETCH_SUCCESS:
      return updateObject(state, { error: null, loading: false });

    case actionTypes.FETCH_FAIL:
      return updateObject(state, { error: action.payload, loading: false });

    case actionTypes.UPDATE_PACKAGES:
      return updateObject(state, { packages: action.payload });

    case actionTypes.PACKAGE_SELECTION:
      return updateObject(state, { selectedPackages: action.payload });

    case actionTypes.SELECTED_PACKAGE_DETAIL:
      return updateObject(state, { selectedPackageDetail: action.payload });

    case actionTypes.TOGGLE_EXPORT_ALL:
      return updateObject(state, { isExportAllSelected: action.payload });

    case actionTypes.SELCTED_PACKAGE_EDIT_MODE:
      return updateObject(state, {
        selectedPackageDetail: {
          ...state.selectedPackageDetail,
          editMode: action.payload
        }
      });

    case actionTypes.SET_INITIAL_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default packageReducer;
