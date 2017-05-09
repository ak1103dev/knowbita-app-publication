import generateType from '../../../utils/actionTypes';

export const NAME = 'session';

export const LOGIN = generateType(NAME, 'LOGIN');
export const LOGOUT = generateType(NAME, 'LOGOUT');
export const LOGOUT_ALL = generateType(NAME, 'LOGOUT_ALL');
export const GET_ME = generateType(NAME, 'GET_ME');
