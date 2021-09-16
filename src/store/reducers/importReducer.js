import * as actionTypes from "../actions/types";
import { updateObject } from '../../utils/utility';

const INITIAL_STATE = {
    selectedFile: null,
    selectedFileName: null,
    percentage: 0,
    error: false,
    status: null
};

const importReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.UPDATE_FILEINFO:
            return updateObject(state, { selectedFileName: action.payload.name, selectedFile: action.payload.file });

        case actionTypes.UPDATE_PROCESS:
            return updateObject(state, { percentage: action.payload.percentage, status: action.payload.status });

        case actionTypes.TOGGLE_ERROR:
            return updateObject(state, { error: action.payload });

        case actionTypes.SET_IMPORT_INITIAL_STATE:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default importReducer;