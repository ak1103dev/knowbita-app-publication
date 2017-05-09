import {
  LOAD_COURSES,
  LOAD_COURSE
} from './constants';

const initialState = {
  loading: false,
  courses: [],
  course: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_COURSES.pending:
      return {
        ...state,
        loading: true
      };
    case LOAD_COURSES.success:
      return {
        ...state,
        loading: false,
        courses: [...state.courses, ...action.payload]
      };
    case LOAD_COURSE.success:
      return {
        ...state,
        course: action.payload
      };
    default:
      return state;
  }
}
