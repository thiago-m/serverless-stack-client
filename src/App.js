import React, {useState} from 'react';
import { Link } from "react-router-dom"
import {LinkContainer} from "react-router-bootstrap"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import './App.css';

import Routes from "./Routes" 

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false)

  const handleLogout = () => {
    userHasAuthenticated(false)
  }

  return (
    <div className="App container">
      <Navbar fluid clloapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {
              isAuthenticated
                ? <NavItem onClick={handleLogout}>Logout</NavItem>
                : <>
                    <LinkContainer to="/signup">
                      <NavItem >Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
