/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createReducer from './reducers';


export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    routerMiddleware(history),
    thunk,
    logger,
  ];

  const store = createStore(
    createReducer(),
    applyMiddleware(...middlewares)
  );
  // Extensions
  store.injectedReducers = {}; // Reducer registry

  return store;
}
