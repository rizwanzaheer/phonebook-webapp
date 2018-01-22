import { connect } from 'react-redux';
// import { changeUsername } from './actions';
import AddContactPage from './AddContactPage';

const mapActionToProps = {};

function mapStateToProps(state) {
  console.log('state is: ', state);
  return {
    testuser: 'Rizwan Zaheer',
  };
}
export default connect(mapStateToProps, mapActionToProps)(AddContactPage);
