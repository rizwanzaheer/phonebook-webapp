import { createSelector } from 'reselect';

/**
 * Direct selector to the signinPage state domain
 */
const selectSigninPageDomain = (state) => state.get('signinPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SigninPage
 */

const makeSelectSigninPage = () => createSelector(
  selectSigninPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSigninPage;
export {
  selectSigninPageDomain,
};
