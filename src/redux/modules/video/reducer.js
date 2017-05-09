import {
  LOAD_VIDEOS,
  LOAD_VIDEO,
  LOAD_VIDEO_LIST,
  LOAD_VIDEO_HISTORY,
  RECORD_VIDEO
} from './constants';

const initialState = {
  loading: false,
  videos: [],
  videoList: [],
  videoHistory: [],
  video: {
    name: '',
    description: '',
    image: '',
    instructor: {
      name: '',
      image: ''
    },
    uri: '',
    tags: [],
    created_at: '',
    num_views: NaN,
    time_duration: ''
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_VIDEOS.pending:
      return {
        ...state,
        loading: true
      };
    case LOAD_VIDEOS.success:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, ...action.payload]
      };
    case LOAD_VIDEO.success:
      return {
        ...state,
        video: action.payload
      };
    case LOAD_VIDEO_LIST.success:
      return {
        ...state,
        videoList: action.payload
      };
    case LOAD_VIDEO_HISTORY.pending:
      return {
        ...state,
        loading: true
      };
    case LOAD_VIDEO_HISTORY.success:
      return {
        ...state,
        videoHistory: action.payload,
        loading: false
      };
    case RECORD_VIDEO.pending:
      return {
        ...state,
        recording: true,
        error: false
      };
    case RECORD_VIDEO.success:
      return {
        ...state,
        recording: false,
        error: false
      };
    case RECORD_VIDEO.error:
      return {
        ...state,
        recording: false,
        error: true,
        errorMessage: action.payload.response.message || 'Something error'
      };
    default:
      return state;
  }
}
