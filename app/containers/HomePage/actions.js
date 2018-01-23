/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import axios from 'axios';
import {
  CHANGE_USERNAME,
  DELETERECORD,
  EDITRECORD,
  GET_CONTACTS,
  ROOT_URL,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return { type: CHANGE_USERNAME, name };
}
 
function getContactsSuccess(data) {
  return { type: GET_CONTACTS, payload: data.users };
}

export function getContacts() {
  console.log('get contacts action! ');
  return (dispatch) => {
    try {
      axios
        .post(`${ROOT_URL}/searchrecords`, {})
        .then((data) => {
          dispatch(getContactsSuccess(data.data));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
}

export function editRecord(id) {
  console.log('edit record id is: ', id);
  return { type: EDITRECORD, payload: 'Rizwan Zaheer in editRecord' };
}

function deleteSuccess(data) {
  return { type: DELETERECORD, payload: data.data.users };
}

export function deleteRecord(id) {
  return (dispatch) => {
    try {
      axios
        .post(`${ROOT_URL}/deleteRecord`, { id })
        .then((data) => {
          dispatch(deleteSuccess(data));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
}
