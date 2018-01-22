/**
 *
 * SigninPage
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Signin from 'components/Signin';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectSigninPage from './selectors';
import Styles from './SigninPage.scss';

export class SigninPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={Styles.signinpageWrapper}>
        <Helmet>
          <title>SigninPage</title>
          <meta name="description" content="Description of SigninPage" />
        </Helmet>
        <div className="row">
          <div className="col-12">
            <Signin />
          </div>
        </div>
      </div>
    );
  }
}

SigninPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signinpage: makeSelectSigninPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signinPage', reducer });
const withSaga = injectSaga({ key: 'signinPage', saga });

export default compose(withReducer, withSaga, withConnect)(SigninPage);
