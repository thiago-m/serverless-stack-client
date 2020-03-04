import React from 'react';
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import './App.css';

import Routes from "./Routes" 

function App() {
  return (
    <div className="App container">
      <Navbar fluid clloapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
