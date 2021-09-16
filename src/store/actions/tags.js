import * as actionTypes from "./types";
import httpService from "../../services/httpService";
import config from "../../config";
import { openDrawer } from './';
const {
    server: { RMI }
} = config;

export const fetchTagStart = () => {
    return {
        type: actionTypes.FETCH_TAG_START
    };
};

export const fetchTagSuccess = tags => {
    return {
        type: actionTypes.FETCH_TAG_SUCCESS,
        payload: tags
    };
};

export const fetchTagFail = error => {
    return {
        type: actionTypes.FETCH_TAG_FAIL,
        payload: error
    };
};

export const updateTags = tags => {
    return {
        type: actionTypes.UPDATE_TAGS,
        payload: tags
    };
};

export const removeTags = (isRemoveAll, payload) => async (dispatch, getState) => {
    // const EndPoint = isRemoveAll ? RMI.DeleteSelectedTag : RMI.DeleteTag;
    // const prevTags = getState().tagsData.tags;        
    // dispatch(fetchTagStart());
    // try {
    //     const {
    //     } = await httpService.delete(EndPoint, {
    //         headers: {
    //             Authorization: "Bearer "+localStorage.token
    //         },
    //         data: payload
    //     });
    //     // dispatch(toggleToaster({
    //     //     name: 'success',
    //     //     show: 'true',
    //     //     msg: message
    //     // }));
    //     dispatch(fetchTagSuccess());
    //     const updatedTags = isRemoveAll ? [] : prevTags.filter(t => t.tag_name !== payload.tag_name);
    //     dispatch(updateTags(updatedTags));
    // } catch (e) {
    //     dispatch(fetchTagFail(e));
    //     if(e.response && e.response.status === 401){
    //         localStorage.setItem("automsg",true);
    //         window.location.pathname = '/logout';
    //     }
    //     else{
    //         //dispatch(toggleToaster({name: 'error',show: 'true',msg: e.response ? e.response.data.message : e.message}));
    //     } 
    // }
};

export const addBulkTags = (payload) => async (dispatch, getState) => {
    dispatch(fetchTagStart());
    httpService.post(RMI.AddTag, payload,{
        headers: {
          Authorization: "Bearer "+localStorage.token
        }
      }).then(response => {
        if (response.status === 200) {
        //   dispatch(toggleToaster({
        //     name: 'success',
        //     show: 'true',
        //     msg: response.data.message || ''
        //   }));
          dispatch(fetchTagSuccess());
          dispatch(updateTags([]));
          dispatch(openDrawer({ key: "addBulkTag", value: false }));
        }
      }).catch(error => {
        dispatch(fetchTagFail(error));
        if(error.response && error.response.status === 401){
            localStorage.setItem("automsg",true);
            window.location.pathname = '/logout';
        }
        else{
            // dispatch(toggleToaster({name: 'error',show: 'true',msg: error.response ? error.response.data.message : error.message}));
        } 
      })
};