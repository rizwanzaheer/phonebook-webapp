/**
 *
 * SigninPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import Signin from 'components/Signin';
import PropTypes from 'prop-types';

import reducer from './reducer';
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
};

export default SigninPage;
