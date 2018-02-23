/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import { connect } from 'react-redux';
import { deleteRecord, editRecord, getContacts } from './actions';
import HomePage from './HomePage';

const mapActionToProps = {
  deleteRecord,
  editRecord,
  getContacts,
};

function mapStateToProps(state) {
  return {
    contacts: state.home.contacts,
    rizwan: 'rizwan testing',
  };
}
export default connect(mapStateToProps, mapActionToProps)(
  HomePage
);
