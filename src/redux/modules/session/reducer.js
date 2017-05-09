import {
  LOGIN,
  LOGOUT,
  LOGOUT_ALL,
  GET_ME
} from './constants';

const initialState = {
  loggingIn: false,
  loggingOut: false,
  loading: false,
  user: {},
  error: false,
  errorMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN.pending:
      return {
        ...state,
        loggingIn: true,
        error: false,
        errorMessage: ''
      };
    case LOGIN.success:
      return {
        ...state,
        loggingIn: false,
        error: false,
        errorMessage: ''
      };
    case LOGIN.error:
      return {
        ...state,
        loggingIn: false,
        error: true,
        errorMessage: action.payload.response.message || `Can't access to server`
      };

    case LOGOUT.pending:
    case LOGOUT_ALL.pending:
      return {
        ...state,
        loggingOut: true,
        error: false,
        errorMessage: ''
      };
    case LOGOUT.success:
    case LOGOUT_ALL.success:
      return {
        ...state,
        loggingOut: false,
        error: false,
        errorMessage: ''
      };

    case GET_ME.pending:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
      };
    case GET_ME.success:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        user: action.payload
      };
    default:
      return state;
  }
}
