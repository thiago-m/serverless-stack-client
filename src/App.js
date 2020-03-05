import React, {useState, useEffect} from 'react';
import { Link, withRouter } from "react-router-dom"
import {LinkContainer} from "react-router-bootstrap"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { Auth } from "aws-amplify";
import './App.css';

import Routes from "./Routes" 

function App(props) {

  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad()
  }, [])

  const onLoad = async () => {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    } catch(e) {
      if(e !== 'No current user') {
        alert(e)
      }
    }
    setIsAuthenticating(false)
  }

  const handleLogout = async () => {
    await Auth.signOut()
    userHasAuthenticated(false)
    props.history.push('/login')
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/settings">
                  <NavItem>Settings</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
