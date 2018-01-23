/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { CHANGE_USERNAME, DELETERECORD, GET_CONTACTS } from './constants';

// The initial state of the App
const initialState = {
  username: '',
  contacts: [],
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state;
    case DELETERECORD:
      console.log('action.payload data: ', action.payload);
      return {
        ...state,
        // contacts: [
        //   { fname: 'Rizwan Zaheer', lname: 'zaheer', dob: '12/12/2011', _id: '2342342342424' },
        // ],
        contacts: action.payload,
      };
    case GET_CONTACTS:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
}

export default homeReducer;
