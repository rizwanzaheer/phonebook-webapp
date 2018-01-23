/**
*
* DeleteButton
*
*/

import React from 'react';
// import styled from 'styled-components';
import Styles from './style.scss';

class DeleteButton extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  clickHanlder = (e) => {
    this.props.onClick();
    console.log('deletebutton click handler', e.target.id);
  };
  render() {
    const { id } = this.props;
    console.log('id is :', id);
    return (
      <i
        className={`fa fa-trash-o ${Styles.customStyle}`}
        aria-hidden="true"
        onClick={this.clickHanlder}
        id={id}
      />
    );
  }
}

DeleteButton.propTypes = {};

export default DeleteButton;
