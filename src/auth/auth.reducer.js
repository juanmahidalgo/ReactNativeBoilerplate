// import { getLocale } from 'utils';
import {
  LOGIN,
  LOGOUT,
} from './auth.type';

export const initialState = {
  isLoggingIn: false,
  isSigningOut: false,
  isAuthenticated: false,
  accessToken: null,
  user: {},
  error: '',
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN.PENDING:
      return {
        ...state,
        isLoggingIn: true,
        isAuthenticated: false,
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: action.payload,
      };
    case LOGIN.ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT.PENDING:
      return {
        ...state,
        isSigningOut: true,
      };
    case LOGOUT.SUCCESS:
      return {
        ...initialState,
        hasInitialUser: false,
      };
    case LOGOUT.ERROR:
      return {
        ...state,
        isSigningOut: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
