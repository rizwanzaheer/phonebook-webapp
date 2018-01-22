
import { fromJS } from 'immutable';
import signinPageReducer from '../reducer';

describe('signinPageReducer', () => {
  it('returns the initial state', () => {
    expect(signinPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
