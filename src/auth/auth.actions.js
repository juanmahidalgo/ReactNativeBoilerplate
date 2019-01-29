import { AsyncStorage } from 'react-native';

import { uniqBy } from 'lodash';
import { delay, configureLocale, saveLocale } from '../utils';

import {
  fetchAccessToken,
  fetchAuthUser,
  fetchAuthUserOrgs,
  fetchUserOrgs,
  fetchStarCount,
} from 'api';
import {
  LOGIN,
  LOGOUT,
  GET_AUTH_USER,
  GET_AUTH_ORGS,
  CHANGE_LOCALE,
  GET_AUTH_STAR_COUNT,
} from './auth.type';

export const auth = (code, state) => {
  return dispatch => {
    dispatch({ type: LOGIN.PENDING });

    return fetchAccessToken(code, state), 2000
      .then(data => {
        dispatch({
          type: LOGIN.SUCCESS,
          payload: data.access_token,
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN.ERROR,
          payload: error,
        });
      });
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: LOGOUT.PENDING });

    return AsyncStorage.clear()
      .then(() => {
        dispatch({
          type: LOGOUT.SUCCESS,
        });
      })
      .catch(error => {
        dispatch({
          type: LOGOUT.ERROR,
          payload: error,
        });
      });
  };
};

export const getUser = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_USER.PENDING });

    return fetchAuthUser(accessToken)
      .then(data => {
        dispatch({
          type: GET_AUTH_USER.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_AUTH_USER.ERROR,
          payload: error,
        });
      });
  };
};