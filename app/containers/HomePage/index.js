/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import { connect } from 'react-redux';
import { changeUsername, deleteRecord, editRecord, getContacts } from './actions';
import HomePage from './HomePage';

const mapActionToProps = {
  deleteRecord,
  editRecord,
  getContacts,
};

function mapStateToProps(state) {
  return {
    testuser: state.home.username,
    contacts: state.home.contacts,
  };
}
export default connect(mapStateToProps, mapActionToProps)(
  HomePage
);
