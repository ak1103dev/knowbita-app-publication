import {
  LOAD_COURSES,
  LOAD_COURSE
} from './constants';

import ApiClient from '../../../utils/apiClient';
const client = new ApiClient();

export const loadCourses = (page) => {
  return {
    type: LOAD_COURSES.o,
    payload: client.get('/courses', { skip: page * 10, limit: 10 })
  };
};

export const loadCourse = (id) => {
  return {
    type: LOAD_COURSE.o,
    payload: client.get(`/courses/${id}`)
  };
};
