import {
  LOAD_INSTRUCTORS,
  LOAD_INSTRUCTOR_ABOUT,
  LOAD_INSTRUCTOR_VIDEOS,
  LOAD_INSTRUCTOR_COURSES
} from './constants';

const initialState = {
  loading: false,
  instructors: [],
  instructor: {},
  videos: [],
  courses: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_INSTRUCTORS.pending:
      return {
        ...state,
        loading: true
      };
    case LOAD_INSTRUCTORS.success:
      return {
        ...state,
        loading: false,
        instructors: [...state.instructors, ...action.payload]
      };
    case LOAD_INSTRUCTOR_ABOUT.success:
      return {
        ...state,
        instructor: action.payload
      };
    case LOAD_INSTRUCTOR_VIDEOS.pending:
      return {
        ...state,
        loading: true
      };
    case LOAD_INSTRUCTOR_VIDEOS.success:
      return {
        ...state,
        loading: false,
        videos: action.meta.page === 0 ? action.payload : [...state.videos, ...action.payload]
      };
    case LOAD_INSTRUCTOR_COURSES.pending:
      return {
        ...state,
        loading: true
      };
    case LOAD_INSTRUCTOR_COURSES.success:
      return {
        ...state,
        courses: action.meta.page === 0 ? action.payload : [...state.courses, ...action.payload]
      };
    default:
      return state;
  }
}
