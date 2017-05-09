import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import analyticsMiddleware from './middlewares/analyticsMiddleware';

import {
  app,
  routing,
  instructor,
  course,
  video,
  search,
  session
} from './modules';

const middleware = applyMiddleware(promiseMiddleware(), analyticsMiddleware);

export default (data = {}) => {
  const rootReducer = combineReducers({
    [app.NAME]: app.reducer,
    [routing.NAME]: routing.reducer,
    [instructor.NAME]: instructor.reducer,
    [course.NAME]: course.reducer,
    [video.NAME]: video.reducer,
    [search.NAME]: search.reducer,
    [session.NAME]: session.reducer
  });

  return createStore(rootReducer, data, middleware);
};
