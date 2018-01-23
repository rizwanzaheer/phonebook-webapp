
import { fromJS } from 'immutable';
import editContactPageReducer from '../reducer';

describe('editContactPageReducer', () => {
  it('returns the initial state', () => {
    expect(editContactPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
