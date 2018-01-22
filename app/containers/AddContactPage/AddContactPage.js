/**
 *
 * AddContactPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
export class AddContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.testuser);
    return (
      <div>
        <Helmet>
          <title>AddContactPage</title>
          <meta name="description" content="Description of AddContactPage" />
        </Helmet>
      </div>
    );
  }
}

AddContactPage.propTypes = {
  testuser: PropTypes.string,
};


export default AddContactPage;
