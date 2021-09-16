import jwt_decode from "jwt-decode";
import * as actionTypes from "./types";
import history from "../../utils/history";
import httpService from "../../services/httpService";
import config from "../../config";
const {
  server: { RMI }
} = config;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user) => {
  // history.push('/test');
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token,
      user
    }
  };
};

export const authFail = (error, toaster) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error,
      toaster
    }
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");

    history.push('/welcome');
    console.log(`pushed`,  history.push('/welcome'));
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  // console.log(new Date(expirationTime), expirationTime);
  return dispatch => {
    setTimeout(() => {
      // dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const updateUser = (payload) => {
  return {
    type: actionTypes.AUTH_USER_UPDATE,
    payload
  };
};

export const login = (username, password) => async dispatch => {
  dispatch(authStart());
  try {
    const {
      data: { token }
    } = await httpService.post(RMI.Login, { username, password });
    const user = jwt_decode(token);
    const { user_id } = user;
    // console.log(jwt_decode(token));
    // const expirationDate = new Date(user.exp * 1000);
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.removeItem("automsg");
    dispatch(authSuccess(token, user));
    history.push("/");
    dispatch(checkAuthTimeout(user.exp * 1000));
    if(!localStorage.getItem(user_id)){
      localStorage.setItem(user_id,[]);
    }
  } catch (e) {
    dispatch(authFail(e.response ? e.response.data.message : e.message));
  }
};

export const authCheckState = () => {
  return dispatch => {
    const user = localStorage.user ? JSON.parse(localStorage.user) : {};
    if (!localStorage.token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.exp * 1000);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user.token, user));
        dispatch(checkAuthTimeout(expirationDate.getTime() / 1000));
      }
    }
  };
};

export const addPanel = (regexName,selectedCategory, comments) => async dispatch => {
  console.log('selectedCategory',selectedCategory);
  // dispatch(authStart());
  try {
    const {
      data: { token }
    } = await httpService.post(RMI.addPanel, { regexName,selectedCategory, comments });
    const user = jwt_decode(token);
    const { user_id } = user;
    // console.log(jwt_decode(token));
    // const expirationDate = new Date(user.exp * 1000);
    localStorage.setItem("addPanel", token);
    localStorage.setItem("addPanel", JSON.stringify(user));
    localStorage.removeItem("automsg");
    dispatch(authSuccess(token, selectedCategory));
    history.push("/");
    dispatch(checkAuthTimeout(user.exp * 1000));
    if(!localStorage.getItem(user_id)){
      localStorage.setItem(user_id,[]);
    }
  } catch (e) {
    dispatch(authFail(e.response ? e.response.data.message : e.message));
  }
};