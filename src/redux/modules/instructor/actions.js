import {
  LOAD_INSTRUCTORS,
  LOAD_INSTRUCTOR_ABOUT,
  LOAD_INSTRUCTOR_VIDEOS,
  LOAD_INSTRUCTOR_COURSES
} from './constants';

import ApiClient from '../../../utils/apiClient';
const client = new ApiClient();

export const loadInstructors = (page) => {
  return {
    type: LOAD_INSTRUCTORS.o,
    payload: client.get('/instructors', { skip: page * 10, limit: 10 })
  };
};

export const loadInstructorAbout = (id) => {
  return {
    type: LOAD_INSTRUCTOR_ABOUT.o,
    payload: client.get(`/instructors/${id}/about`)
  };
};

export const loadInstructorVideos = ({ id, page }) => {
  return {
    type: LOAD_INSTRUCTOR_VIDEOS.o,
    payload: client.get(`/instructors/${id}/videos`, { skip: page * 10, limit: 10 }),
    meta: { page }
  };
};

export const loadInstructorCourses = ({ id, page }) => {
  return {
    type: LOAD_INSTRUCTOR_COURSES.o,
    payload: client.get(`/instructors/${id}/courses`, { skip: page * 10, limit: 10 }),
    meta: { page }
  };
};
