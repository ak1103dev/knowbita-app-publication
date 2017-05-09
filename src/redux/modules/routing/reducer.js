import { ROUTE, HIDE_NAV } from './constants';

const initialState = {
  id: 'landing',
  title: '',
  index: 0,
  hideNav: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ROUTE:
      return {
        ...state,
        id: action.route.id,
        title: action.route.title,
        index: action.route.index
      };
    case HIDE_NAV:
      return {
        ...state,
        hideNav: action.hideNav
      };
    default:
      return state;
  }
}
