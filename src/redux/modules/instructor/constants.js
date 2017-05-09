import generateType from '../../../utils/actionTypes';

export const NAME = 'instructor';

export const LOAD_INSTRUCTORS = generateType(NAME, 'LOAD_INSTRUCTORS');
export const LOAD_INSTRUCTOR_ABOUT = generateType(NAME, 'LOAD_INSTRUCTOR_ABOUT');
export const LOAD_INSTRUCTOR_VIDEOS = generateType(NAME, 'LOAD_INSTRUCTOR_VIDEOS');
export const LOAD_INSTRUCTOR_COURSES = generateType(NAME, 'LOAD_INSTRUCTOR_COURSES');
