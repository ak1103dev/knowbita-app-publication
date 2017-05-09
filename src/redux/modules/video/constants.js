import generateType from '../../../utils/actionTypes';

export const NAME = 'video';

export const LOAD_VIDEOS = generateType(NAME, 'LOAD_VIDEOS');
export const LOAD_VIDEO = generateType(NAME, 'LOAD_VIDEO');
export const LOAD_VIDEO_LIST = generateType(NAME, 'LOAD_VIDEO_LIST');
export const RECORD_VIDEO = generateType(NAME, 'RECORD_VIDEO');
export const UPLOAD_VIDEO = generateType(NAME, 'UPLOAD_VIDEO');
export const LOAD_VIDEO_HISTORY = generateType(NAME, 'LOAD_VIDEO_HISTORY');
export const UPDATE_VIDEO = generateType(NAME, 'UPDATE_VIDEO');
