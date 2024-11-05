// ./src/components/Layout/Navigation.js

import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

//redux
import { connect } from 'react-redux';
import { getUser, setUserID } from '../../actions/userInfo';

//styling
import { Nav, Navbar, Button, Image } from 'react-bootstrap';

//other
import { CONFIG } from '../../config';

const mapStateToProps = (state) => {
  return {
    userID: state.userInfo.userID,
  };
};

const Header = (props) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const user = null;
  console.log('authstate', isAuthenticated);

  useEffect(() => {
    props.dispatch(getUser(isAuthenticated, user));
  }, [isAuthenticated]);

  return (
    <Navbar
      className="navbar-dark bg-dark"
      expand="lg"
      style={{ fontSize: '22px' }}
    >
      <LinkContainer to="/">
        <Navbar.Brand style={{ fontSize: '22px' }}>
          <Image
            className="mr-2 left"
            src={require('../../assets/images/logo/NavbarLogo.png')}
            width="30"
            height="30"
          />
          {CONFIG.whoAmI}
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Quizzes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/findings">
            <Nav.Link>Findings</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav className="ml-auto">
          {/* Show login or logout button based off current auth status */}
          {!isAuthenticated ? (
            <Button variant="outline-light" onClick={() => loginWithRedirect()}>
              Log In
            </Button>
          ) : (
            <Button
              variant="outline-light"
              onClick={() =>
                logout({
                  returnTo: window.location.origin, // Redirect back to home after logout
                })
              }
            >
              Log Out
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(mapStateToProps)(Header);
