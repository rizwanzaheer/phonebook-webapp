import React from 'react';
import HeaderLink from './HeaderLink';
import NavBar from './NavBar';

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar>
          <HeaderLink to="/">
            Home
          </HeaderLink>
          <HeaderLink to="/addcontact">
            Add Contact
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
