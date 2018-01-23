/**
*
* Button
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Styles from './style.scss';

class EditButton extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  clickHanlder = (e) => {
    this.props.onClick();
    console.log('deletebutton click handler');
    console.log(this.props);
  };
  render() {
    const { id } = this.props;
    return (
      <i
        className={`fa fa-pencil-square-o ${Styles.customStyle}`}
        onClick={this.clickHanlder}
        aria-hidden="true"
        id={id}
      />
    );
  }
}

EditButton.propTypes = {
  id: PropTypes.string,
};

export default EditButton;
