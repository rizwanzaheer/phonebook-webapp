
import { connect } from 'react-redux';

import EditContactPage from './EditContactPage';

const mapActionToProps = {
};

function mapStateToProps(state) {
  return {
    testuser: state.home.username,
    contacts: state.home.contacts,
  };
}

export default connect(mapStateToProps, mapActionToProps)(EditContactPage);
