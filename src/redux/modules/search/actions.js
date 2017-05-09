import {
  SEARCH,
  SEARCH_MORE
} from './constants';

import ApiClient from '../../../utils/apiClient';
const client = new ApiClient();

export const analytics = {
  [SEARCH.success]: action => ({ namespace: 'Info', title: 'Search', word: action.meta.word })
};

export const search = ({ word }) => {
  return {
    type: SEARCH.o,
    payload: client.get('/search', { word, skip: 0, limit: 10 }),
    meta: { word }
  };
};

export const searchMore = ({ word, page }) => {
  return {
    type: SEARCH_MORE.o,
    payload: client.get('/search', { word, skip: page * 10, limit: 10 })
  };
};
