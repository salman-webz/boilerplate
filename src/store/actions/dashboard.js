import * as actionTypes from "./types";
import httpService from "../../services/httpService";
import config from "../../config";
import { openDrawer } from "../actions/index";

const {
    server: { RMI }
  } = config;

export const updateCompareTags = (tags) => {
    return {
        type: actionTypes.UPDATE_COMPARE_TAGS,
        payload: tags
    }
}

export const updateComparison = (tags) => {
  return {
      type: actionTypes.UPDATE_COMPARISON,
      payload: tags
  }
}

export const updateRedirectionArray = (pkgs) => {
  return {
      type: actionTypes.UPDATE_REDIRECTION_ARRAY,
      payload: pkgs
  }
}

export const dashboardInitialState = () => {
  return {
      type: actionTypes.DASHBOARD_INITIAL_STATE,
  }
}


export const getTopTags = (setTopTags) => async (dispatch,getState) => {
    const { selected } = getState().dropdown.topTagsDropDown;
    httpService.get(`${RMI.TopTags}?limit=${selected}`,{
      headers: {
        Authorization: "Bearer "+localStorage.token
      }
    }).then(response => {
      if (response.status === 200) {
        setTopTags({data: response.data.top_tags, loader: false});
      }
    }).catch(error => {
      if(error.response && error.response.status === 401){
        localStorage.setItem("automsg",true);
        window.location.pathname = '/logout';
      }
    })
  };

  export const getTotalPackages = (setTotalPackages) => async (dispatch) => {
    httpService.get(`${RMI.TotalPackages}`,{
      headers: {
        Authorization: "Bearer "+localStorage.token
      }
    }).then(response => {
      if (response.status === 200) {
        setTotalPackages({value: response.data.total_pkg_count, loader: false});
      }
    }).catch(error => {
      if(error.response && error.response.status === 401){
        localStorage.setItem("automsg",true);
        window.location.pathname = '/logout';
      }
    })
  };

  export const getTotalTags = (setTotalTags) => async (dispatch) => {
    httpService.get(`${RMI.TotalTags}`,{
      headers: {
        Authorization: "Bearer "+localStorage.token
      }
    }).then(response => {
      if (response.status === 200) {
        setTotalTags({value: response.data.total_tags_count, loader: false});
      }
    }).catch(error => {
      if(error.response && error.response.status === 401){
        localStorage.setItem("automsg",true);
        window.location.pathname = '/logout';
      }
    })
  };

  export const getTagsComparison = (setPanelLoader, setCompareLoading) => async (dispatch, getState) => {
    const { tags } = getState().dashboard;
    let url = '';
    if(tags.length === 2){
      url = `${RMI.CompareTags}?tagA=${tags[0].tag_name}&tagB=${tags[1].tag_name}`;
    }
    else if(tags.length === 3){
      url = `${RMI.CompareTags}?tagA=${tags[0].tag_name}&tagB=${tags[1].tag_name}&tagC=${tags[2].tag_name}`;
    }
    else{
      url = `${RMI.CompareTags}?tagA=${tags[0].tag_name}&tagB=${tags[1].tag_name}&tagC=${tags[2].tag_name}&tagD=${tags[3].tag_name}`
    }
    httpService.get(url,{
      headers: {
        Authorization: "Bearer "+localStorage.token
      }
    }).then(response => {
      if (response.status === 200) {
        dispatch(openDrawer({ key: "showCompareTag", value: false }));
        setPanelLoader(false);
        dispatch(updateComparison(response.data.tags_comparison));
        if(setCompareLoading){
          setCompareLoading(false);
        }
      }
    }).catch(error => {
      if(error.response && error.response.status === 401){
        localStorage.setItem("automsg",true);
        window.location.pathname = '/logout';
      }
    })
  };

  export const getComparisonResults = (pkgs) => async (dispatch) => {
    
    httpService.post(RMI.ComparisonResult,{"pkgIds": pkgs},{
      headers: {
        Authorization: "Bearer "+localStorage.token
      }
    }).then(response => {
      if (response.status === 200) {
        //setTotalTags({value: response.data.total_tags_count, loader: false});
      }
    }).catch(error => {
      // if(error.response && error.response.status === 401){
      //   localStorage.setItem("automsg",true);
      //   window.location.pathname = '/logout';
      // }
    })
  };