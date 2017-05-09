import { ROUTE, HIDE_NAV } from './constants';

export const changeRoute = (route) => {
  return {
    type: ROUTE,
    route
  };
};

export const hideNavBar = (hideNav) => {
  return {
    type: HIDE_NAV,
    hideNav
  };
};
