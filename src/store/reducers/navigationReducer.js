import * as actionTypes from "../actions/types";
import { updateObject } from "../../utils/utility";
import { ReactComponent as DashBoardIcon } from "../../assets/svgs/dashboardIcon.svg";
import { ReactComponent as PackageIcon } from "../../assets/svgs/packageIcon.svg";
import { ReactComponent as ImportIcon } from "../../assets/svgs/importIcon.svg";
import { ReactComponent as BulkTagsIcon } from "../../assets/svgs/bulkTagsIcon.svg";
import { ReactComponent as UserManagementIcon } from "../../assets/svgs/userMangementIcon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svgs/logoutIcon.svg";

const INITIAL_STATE = {
  selected: {},
  items: [
    {
      key: 1,
      path: "/",
      icon: DashBoardIcon
    },
    {
      key: 2,
      path: "/packages",
      icon: PackageIcon
    },
    {
      key: 3,
      path: "/import",
      icon: ImportIcon,
    },
    {
      key: 4,
      path: "/bulk_tags",
      icon: BulkTagsIcon,
    },
    {
      key: 5,
      path: "/users",
      icon: UserManagementIcon,
      divider: 'mt-150',
    },
    {
      key: 6,
      path: "/logout",
      icon: LogoutIcon
    }
  ]
};

// INITIAL_STATE.selected = INITIAL_STATE.items[0];

const navigationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SELECT_NAVIGATION_ITEM:
      return updateObject(state, { selected: action.payload });

    default:
      return state;
  }
};

export default navigationReducer;
