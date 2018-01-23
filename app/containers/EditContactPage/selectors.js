import { createSelector } from 'reselect';

/**
 * Direct selector to the editContactPage state domain
 */
const selectEditContactPageDomain = (state) => state.get('editContactPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditContactPage
 */

const makeSelectEditContactPage = () => createSelector(
  selectEditContactPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectEditContactPage;
export {
  selectEditContactPageDomain,
};
