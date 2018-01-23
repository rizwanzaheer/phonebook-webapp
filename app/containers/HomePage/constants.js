/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const DELETERECORD = 'DELETERECORD';
export const EDITRECORD = 'EDITRECORD';
export const GET_CONTACTS = 'GET_CONTACTS';
export const ROOT_URL = 'http://localhost:3001/api/search';

export const RECORDS = [
  {
    fname: 'Rizwan',
    lname: 'Zaheer',
    dob: '30/09/1993',
    phone: '03135561765',
    _id: '1',
  },
  {
    fname: 'Taqi',
    lname: 'Mustafa',
    dob: '26/01/1992',
    phone: '03318991236',
    _id: '2',
  },
  {
    fname: 'Waseem',
    lname: 'Ahmed',
    dob: '30/09/1991',
    phone: '03135561232',
    _id: '3',
  },
  {
    fname: 'Abdullah',
    lname: 'Ahmed',
    dob: '30/09/1990',
    phone: '031354645645',
    _id: '4',
  },
  {
    fname: 'Ibraheem',
    lname: 'Somro',
    dob: '30/09/1995',
    phone: '03135234235',
    _id: '5',
  },
];
