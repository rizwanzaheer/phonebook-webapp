/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import { connect } from 'react-redux';
import { changeUsername } from './actions';
import HomePage from './HomePage';

const mapActionToProps = {};

function mapStateToProps(state) {
  console.log('state is: ', state);
  return {
    testuser: state.home.username,
  };
}
export default connect(mapStateToProps, mapActionToProps)(HomePage);
