import { AsyncStorage } from 'react-native';

import {
  LOGIN,
  LOGOUT,
  LOGOUT_ALL,
  GET_ME
} from './constants';

import ApiClient from '../../../utils/apiClient';
const client = new ApiClient();

export const analytics = {
  [LOGIN.success]: () => ({ namespace: 'Session', title: 'Logged In', loggedIn: true }),
  [LOGOUT.success]: () => ({ namespace: 'Session', title: 'Logged Out', loggedOut: true }),
  [LOGOUT_ALL.success]: () => ({ namespace: 'Session', title: 'Logged Out All', loggedOutAll: true })
};

export const login = ({ username, password }) => {
  return {
    type: LOGIN.o,
    payload: client.post(`/session/login`, { username, password })
    .then((res) => {
      AsyncStorage.setItem('access-token', res.accessToken);
      AsyncStorage.setItem('cookies', JSON.stringify(res.cookies));
      return res;
    })
  };
};

export const logout = () => {
  return {
    type: LOGOUT.o,
    payload: client.delete('/session/logout')
    .then(() => AsyncStorage.clear())
  };
};

export const logoutAll = () => {
  return {
    type: LOGOUT_ALL.o,
    payload: client.delete('/session/logout/all')
    .then(() => AsyncStorage.clear())
  };
};

export const getMe = () => {
  return {
    type: GET_ME.o,
    payload: client.get('/users/me')
  };
};
