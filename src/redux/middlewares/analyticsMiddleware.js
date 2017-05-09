import { analytics as sessionAnalytics } from '../modules/session/actions';
import { analytics as searchAnalytics } from '../modules/search/actions';
import { analytics as videoAnalytics } from '../modules/video/actions';
import merge from 'lodash/merge';

import ApiClient from '../../utils/apiClient';
const client = new ApiClient();

const events = [
  sessionAnalytics,
  searchAnalytics,
  videoAnalytics
].reduce((prev, curr) => merge(prev, curr), {});

export default () => next => action => {
  // const eventCreator = events['session/LOGIN_FULFILLED'];
  console.log(action);
  const eventCreator = events[action.type];
  if (!eventCreator) return next(action);
  const event = eventCreator(action);
  if (!event) return next(action);
  client.post('/logs', {
    namespace: event.namespace,
    title: event.title,
    data: event
  });
  return next(action);
};
