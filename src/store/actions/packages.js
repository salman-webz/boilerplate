import * as actionTypes from "./types";
import { getSearchFilterApiPayload, downloadFile } from "../../utils/utility";
import httpService from "../../services/httpService";
import config from "../../config";
import { setSearchClickState } from "./filters";
import { setPageCount, openDrawer , setPaginationInitialState } from './';
const {
  server: { RMI }
} = config;

export const onViewSelect = view => {
  return {
    type: actionTypes.PACKAGE_VIEW_SELECT,
    payload: view
  };
};

export const onPackageDetail = pkg => {
  return {
    type: actionTypes.SELECTED_PACKAGE_DETAIL,
    payload: pkg
  };
};

export const onSelectedPackageEditMode = mode => {
  return {
    type: actionTypes.SELCTED_PACKAGE_EDIT_MODE,
    payload: mode
  };
};

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_START
  };
};

export const fetchSuccess = packages => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    payload: packages
  };
};

export const fetchFail = error => {
  return {
    type: actionTypes.FETCH_FAIL,
    payload: error
  };
};

export const updatePackages = packages => {
  return {
    type: actionTypes.UPDATE_PACKAGES,
    payload: packages
  };
};

export const setInitialState = error => {
  return {
    type: actionTypes.SET_INITIAL_STATE,
    payload: error
  };
};

export const onPackageSelection = pkg => {
  return {
    type: actionTypes.PACKAGE_SELECTION,
    payload: pkg
  };
};

export const toggleExportAll = val => {
  return {
    type: actionTypes.TOGGLE_EXPORT_ALL,
    payload: val
  };
};

export const getPackages = ({ page, limit , isExportAllSelected}) => async (dispatch, getState) => {
  window.scrollTo(0,0);
  dispatch(fetchStart());
  const {
    tags: { malicious, users, startDate, endDate },
    minimumTagsToDisplay
  } = getState().filter;
  const { currentPage, limit} = getState().pagination;
  const { redirection } = getState().dashboard;
  let apiPayload = getSearchFilterApiPayload(
    malicious,
    users,
    startDate,
    endDate,
    minimumTagsToDisplay
  );

  let url = RMI.GetPackages;
  if(redirection.shouldRedirect){
    apiPayload = {pkgIds: redirection.data}
    url = RMI.ComparisonResult;
  }

  try {
    const {
      data: { package_details: packages, total_records_fetched: pageCount }
    } = await httpService.post(url, apiPayload, {
      headers: {
        Authorization: "Bearer "+localStorage.token
      },
      params: {
        limit: limit,
        page: currentPage
      }
    });
    dispatch(fetchSuccess());
    let pkgs = [...packages.map(p => ({ ...p, selected: true }))];  
    if(isExportAllSelected === true){
      dispatch(updatePackages(pkgs));
      dispatch(onPackageSelection(pkgs));
    }
    else{
      dispatch(updatePackages(packages));
    }
    dispatch(setPageCount(redirection.shouldRedirect ? redirection.data.length : pageCount));
    dispatch(setSearchClickState(true));
    
  } catch (error) {
      if(error.response && error.response.status === 401){
        localStorage.setItem("automsg",true);
        window.location.pathname = '/logout';
      }
    
    dispatch(fetchFail(error));
    dispatch(setSearchClickState(true));
    dispatch(updatePackages([]))
    dispatch(setPaginationInitialState());
  }
  
};

export const exportData = (payload, type, packages) => async dispatch => {
  dispatch(fetchStart());
  try {
    const { data } = await httpService.axios({
      url: type === 'exportjson' ? process.env.REACT_APP_BASE_URL + RMI.ExportData : process.env.REACT_APP_BASE_URL + RMI.ExportData+'?export=csv',
      method:'POST',
      responseType: "blob",
      data: payload,
      headers: {
        Authorization: "Bearer "+localStorage.token
      }
    });
    dispatch(fetchSuccess());
    downloadFile(data,'exported', `${type === 'exportjson' ? 'json' : 'csv'}`);
    dispatch(updatePackages([...packages.map(p => ({ ...p, selected: false }))]));
    dispatch(onPackageSelection([]));
    dispatch(toggleExportAll(false));

  } catch (error) {
    dispatch(fetchFail(error));
    if(error.response && error.response.status === 401){
      localStorage.setItem("automsg",true);
      window.location.pathname = '/logout';
    }
    else{
      //dispatch(toggleToaster({name: 'error',show: 'true',msg: error.response ? error.response.data.message : error.message}));
    } 
  }
};

export const addTags = (pkgs_to_tag, setPanelLoading, setList, list, tag) => async (dispatch, getState) => {
  const { currentPage, limit} = getState().pagination;
  httpService.post(RMI.AddTag, pkgs_to_tag, {
    headers: {
      Authorization: "Bearer "+localStorage.token
    }
  }).then(response => {
    if (response.status === 200) {
      //setIsExportAllSelected(false);
      dispatch(toggleExportAll(false));
      dispatch(openDrawer({ key: 'showAddTag', value: false }));
      setList([tag, ...list]); 
      dispatch(getPackages(currentPage,limit));
      //dispatch(toggleToaster({name: 'success',show: 'true',msg: response.data.message}));
      setPanelLoading(false);
    }
  }).catch(error => {
    setPanelLoading(false);
    if(error.response && error.response.status === 401){
      localStorage.setItem("automsg",true);
      window.location.pathname = '/logout';
    }
    else{
      //dispatch(toggleToaster({name: 'error',show: 'true',msg: error.response ? error.response.data.message : error.message}));
    } 
  })
};

export const deleteTag = (package_ids,tag_name, setPanelLoading, setList, list, tag) => async (dispatch, getState) => {
  const { currentPage, limit} = getState().pagination;
  httpService.delete(RMI.DeleteTag, {
    headers: {
      Authorization: "Bearer "+localStorage.token
    },
    data: {
      package_ids,
      tag_name
    }
  }).then(response => {
    if (response.status === 200) {
      //setIsExportAllSelected(false);
      dispatch(toggleExportAll(false));
      dispatch(openDrawer({ key: 'showAddTag', value: false }));
      setList([...list.filter(t => t !== tag)]);
      dispatch(getPackages(currentPage,limit));
      //dispatch(toggleToaster({name: 'success',show: 'true',msg: response.data.message || ''}));
      setPanelLoading(false);
    }
  }).catch(error => {
    setPanelLoading(false);
    if(error.response && error.response.status === 401){
      localStorage.setItem("automsg",true);
      window.location.pathname = '/logout';
    }
    else{
      //dispatch(toggleToaster({name: 'error',show: 'true',msg: error.response ? error.response.data.message : error.message}));
    } 
  })
};

export const getZoomImg = (id,setZoomImg) => async (dispatch) => {
  httpService.get(`${RMI.GetImage}?pkg_id=${id}`,{
    headers: {
      Authorization: "Bearer "+localStorage.token
    }
  }).then(response => {
    if (response.status === 200) {
      setZoomImg({
        src: response.data.img_bytes,
        loader: false,
        id: id,
        show: true
      })
    }
  }).catch(error => {
    if(error.response && error.response.status === 401){
      localStorage.setItem("automsg",true);
      window.location.pathname = '/logout';
    }
    setZoomImg({
      src: error.response.data.img_bytes,
      loader: false,
      id: id,
      show: true
    })
  })
};

export const extractData = (id,type,setPopupConfig) => async (dispatch) => {
  httpService.get(`${RMI.ExtractText}?pkg_id=${id}&text_type=${type}`,{
    headers: {
      Authorization: "Bearer "+localStorage.token
    }
  }).then(response => {
    if (response.status === 200) {
      setPopupConfig({show: true, type: type, data: JSON.stringify(response.data.result, null, 1), loader: false});
    }
  }).catch(error => {
    if(error.response && error.response.status === 401){
      localStorage.setItem("automsg",true);
      window.location.pathname = '/logout';
    }
    setPopupConfig({show: true, type: type, data: "No Record Found", loader: false});
  })
};
