import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";
import { ReactComponent as UserIcon } from "../../assets/svgs/userIcon.svg";
import { ReactComponent as LockIcon } from "../../assets/svgs/lockIcon.svg";
import { ReactComponent as DownloadExportIcon } from "../../assets/svgs/downloadExportIcon.svg";


const INITIAL_STATE = {
  profileDropdown: {
    selected: {},
    open: false,
    data: [
      {
        key: 1,
        name: "My Profile",
        value: "showMyProfile",
        icon: UserIcon
      },
      {
        key: 2,
        name: "Change Password",
        value: "showChangePassword",
        icon: LockIcon
      }
    ]
  },
  exportDropdown: {
    selected: {},
    open: false,
    data: [
      {
        key: 1,
        name: "Export .JSON",
        value: "exportjson",
        icon: DownloadExportIcon
      },
      {
        key: 2,
        name: "Export .CSV",
        value: "exportcsv",
        icon: DownloadExportIcon,
      }
    ]
  },
  packageDetailDropdown: {
    selected: {},
    open: false,
    data: [
      {
        key: 1,
        name: "View HTML",
        value: "html",
        icon: "em"
      },
      {
        key: 2,
        name: "View Text",
        value: "text",
        icon: "em",
      },
      {
        key: 3,
        name: "View OCR Text",
        value: "ocr",
        icon: "em",
      },
      {
        key: 4,
        name: "View Meta",
        value: "meta",
        icon: "em",
      }
    ]
  },
  topTagsDropDown: {
    selected: 5,
    open: false,
    data: [
      {
        key: 1,
        name: "5",
        value: "5",
        icon: "em"
      },
      {
        key: 2,
        name: "10",
        value: "10",
        icon: "em",
      },
      {
        key: 3,
        name: "15",
        value: "15",
        icon: "em",
      },
      {
        key: 4,
        name: "20",
        value: "20",
        icon: "em",
      }
    ]
  }
};

const dropdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SELECT_PROFILE_DROPDOWN_OPTION:
      return updateObject(state, {
        profileDropdown: { ...state.profileDropdown, selected: action.payload }
      });

    case actionTypes.TOGGLE_PROFILE_DROPDOWN: {
      return updateObject(state, {
        profileDropdown: { ...state.profileDropdown, open: action.payload }
      });
    }

    case actionTypes.SELECT_EXPORT_DROPDOWN_OPTION:
      return updateObject(state, {
        exportDropdown: { ...state.exportDropdown, selected: action.payload }
    });

    case actionTypes.TOGGLE_EXPORT_DROPDOWN: {
      return updateObject(state, {
        exportDropdown: { ...state.exportDropdown, open: action.payload }
      });
    }

    case actionTypes.SELECT_PACKAGE_DETAIL_DROPDOWN_OPTION:
      return updateObject(state, {
        packageDetailDropdown: { ...state.packageDetailDropdown, selected: action.payload }
    });

    case actionTypes.TOGGLE_PACKAGE_DETAIL_DROPDOWN: {
      return updateObject(state, {
        packageDetailDropdown: { ...state.packageDetailDropdown, open: action.payload }
      });
    }

    case actionTypes.TOGGLE_TOP_TAGS_DROPDOWN: {
      return updateObject(state, {
        topTagsDropDown: { ...state.topTagsDropDown, open: action.payload }
      });
    }

    case actionTypes.SELECT_TOP_TAGS_DROPDOWN_OPTION:
      return updateObject(state, {
        topTagsDropDown: { ...state.topTagsDropDown, selected: action.payload }
    });

    default:
      return state;
  }
};

export default dropdownReducer;
