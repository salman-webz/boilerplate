import * as actionTypes from "./types";

export const selectProfileDropDownOption = (item) => {

    return {
        type: actionTypes.SELECT_PROFILE_DROPDOWN_OPTION,
        payload: item
    }
}


export const toggleProfileDropdown = (isOpen) => {
    return {
        type: actionTypes.TOGGLE_PROFILE_DROPDOWN,
        payload: isOpen
    }
}

export const selectExportDropDownOption = (item) => {

    return {
        type: actionTypes.SELECT_EXPORT_DROPDOWN_OPTION,
        payload: item
    }
}

export const toggleExportDropdown = (isOpen) => {
    return {
        type: actionTypes.TOGGLE_EXPORT_DROPDOWN,
        payload: isOpen
    }
}

export const selectPackageDetailDropDownOption = (item) => {

    return {
        type: actionTypes.SELECT_PACKAGE_DETAIL_DROPDOWN_OPTION,
        payload: item
    }
}

export const togglePackageDetailDropdown = (isOpen) => {
    return {
        type: actionTypes.TOGGLE_PACKAGE_DETAIL_DROPDOWN,
        payload: isOpen
    }
}

export const toggleTopTagsDropdown = (isOpen) => {
    return {
        type: actionTypes.TOGGLE_TOP_TAGS_DROPDOWN,
        payload: isOpen
    }
}

export const selectTopTagsDropDownOption = (item) => {
    return {
        type: actionTypes.SELECT_TOP_TAGS_DROPDOWN_OPTION,
        payload: item
    }
}