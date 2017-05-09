import {
  LOAD_VIDEOS,
  LOAD_VIDEO,
  LOAD_VIDEO_LIST,
  RECORD_VIDEO,
  UPLOAD_VIDEO,
  LOAD_VIDEO_HISTORY,
  UPDATE_VIDEO
} from './constants';

import ApiClient from '../../../utils/apiClient';
const client = new ApiClient();

export const analytics = {
  [LOAD_VIDEO.success]: action => ({
    namespace: 'History', title: 'See Video', video_id: action.meta.id
  }),
  [RECORD_VIDEO.success]: action => ({
    namespace: 'Recording Video',
    title: action.meta.cmd,
    cameraId: action.meta.cameraId,
    cmd: action.meta.cmd,
    roomNumber: action.meta.roomNumber
  })
};

export const loadVideos = (page) => {
  return {
    type: LOAD_VIDEOS.o,
    payload: client.get('/videos', { skip: page * 10, limit: 10 })
  };
};

export const loadVideo = (id) => {
  return {
    type: LOAD_VIDEO.o,
    payload: client.get(`/videos/${id}`),
    meta: { id }
  };
};

export const loadVideoList = (id) => {
  return {
    type: LOAD_VIDEO_LIST.o,
    payload: client.get(`/videos/${id}/list`)
  };
};

export const recordVideo = ({ cameraId, cmd, roomNumber }) => {
  return {
    type: RECORD_VIDEO.o,
    payload: client.post(`/videos/recording/${cameraId}`, {}, { cmd }),
    meta: { cameraId, cmd, roomNumber }
  };
};

export const uploadVideo = () => {
  return {
    type: UPLOAD_VIDEO.o,
    payload: client.post('/videos/upload')
  };
};

export const updateVideo = (data) => {
  return {
    type: UPDATE_VIDEO.o,
    payload: client.post('/videos/update', data)
  };
};

export const loadVideoHistory = () => {
  return {
    type: LOAD_VIDEO_HISTORY.o,
    payload: client.get('/videos/history', { skip: 0, limit: 10 })
  };
};
