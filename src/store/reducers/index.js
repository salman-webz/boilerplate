import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import dropdownReducer from "./dropdownReducer";
import navigationReducer from "./navigationReducer";
import toasterReducer from "./toasterReducer";
import importReducer from "./importReducer";
import drawerReducer from "./drawerReducer";
import packageReducer from "./packageReducer";
import paginateReducer from "./paginateReducer";
import userPReducer from "./userPReducer";
import filterReducer from './filterReducer';
import userReducer from './userReducer';
import tagReducer from "./tagReducer";
import dashboardReducer from "./dashboardReducer";
import submitMenuScripts from "./submitMenuScripts";
import modalReducer from "./modalReducer";


export default combineReducers({
  auth: authReducer,
  import: importReducer,
  form: formReducer,
  dropdown: dropdownReducer,
  navigation: navigationReducer,
  toaster: toasterReducer,
  drawer: drawerReducer,
  package: packageReducer,
  pagination: paginateReducer,
  filter: filterReducer,
  userManagement: userReducer,
  userPagination: userPReducer,
  tagsData: tagReducer,
  dashboard: dashboardReducer,
  submitMenuScripts: submitMenuScripts,
  modals: modalReducer
});
