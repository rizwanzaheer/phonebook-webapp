/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import globalReducer from 'containers/App/reducer';
import HomePageReducer from 'containers/HomePage/reducer';


/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    // route: routeReducer,
    global: globalReducer,
    home: HomePageReducer,
    ...injectedReducers,
  });
}
