/**
 *
 * EditContactPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export class EditContactPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>EditContactPage</title>
          <meta name="description" content="Description of EditContactPage" />
        </Helmet>
        <h1>Edit contact page</h1>
      </div>
    );
  }
}

EditContactPage.propTypes = {};
export default EditContactPage;
