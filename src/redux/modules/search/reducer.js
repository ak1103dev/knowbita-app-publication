import {
  SEARCH,
  SEARCH_MORE
} from './constants';

const initialState = {
  loading: false,
  loadingMore: false,
  courses: [],
  videos: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH.pending:
      return {
        ...state,
        loading: true
      };
    case SEARCH.success:
      return {
        ...state,
        loading: false,
        courses: action.payload.courses,
        videos: action.payload.videos
      };
    case SEARCH_MORE.pending:
      return {
        ...state,
        loadingMore: true
      };
    case SEARCH_MORE.success:
      return {
        ...state,
        loadingMore: false,
        courses: action.payload.courses,
        videos: [...state.videos, ...action.payload.videos]
      };
    default:
      return state;
  }
}
