import { AsyncStorage } from 'react-native';

import {
  login as loginCall,
  register as registerCall,
} from '../api';
import {
  LOGIN,
  LOGOUT,
} from './auth.type';

export const login = (email, password) => {
  return dispatch => {
    dispatch({ type: LOGIN.PENDING });

    return loginCall(email, password)
      .then(data => {
        console.log('data: ', data);
        if (data.status === 404) {
          return dispatch({
            type: LOGIN.ERROR,
            payload: 'Usuarios / contraseña inválidos',
          });
        }

        return data.json()
          .then(resp => dispatch({
            type: LOGIN.SUCCESS,
            payload: resp.token,
          }));
      })
      .catch(error => {
        console.log('error: ', error);
        dispatch({
          type: LOGIN.ERROR,
          payload: 'No hay conexión con el servidor',
        });
      });
  };
};

export const register = (email, password) => {
  return dispatch => {
    dispatch({ type: LOGIN.PENDING });

    return registerCall(email, password)
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

// export const getUser = () => {
//   return (dispatch, getState) => {
//     const accessToken = getState().auth.accessToken;

//     dispatch({ type: GET_AUTH_USER.PENDING });

//     return fetchAuthUser(accessToken)
//       .then(data => {
//         dispatch({
//           type: GET_AUTH_USER.SUCCESS,
//           payload: data,
//         });
//       })
//       .catch(error => {
//         dispatch({
//           type: GET_AUTH_USER.ERROR,
//           payload: error,
//         });
//       });
//   };
// };