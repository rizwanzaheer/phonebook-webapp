import React from 'react';
import HeaderLink from './HeaderLink';
import NavBar from './NavBar';

class Header extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Phonebook App</h3>
      </div>
    );
  }
}

export default Header;
