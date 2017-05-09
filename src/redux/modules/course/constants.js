import generateType from '../../../utils/actionTypes';

export const NAME = 'course';

export const LOAD_COURSES = generateType(NAME, 'LOAD_COURSES');
export const LOAD_COURSE = generateType(NAME, 'LOAD_COURSE');
