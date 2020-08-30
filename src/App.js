import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link,
    Redirect
} from "react-router-dom";
import Home from './Home';

function App() {
      return (
              <Router>
                  <div>
                      <Navbar bg="light" variant="light">
                          <Navbar.Brand href="/en">Relatable</Navbar.Brand>
                          <Nav className="ml-auto">
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                          </Nav>
                    </Navbar>

                  {/* A <Switch> looks through its children <Route>s and
                              renders the first one that matches the current URL. */}
                  <Switch>
                    <Route path="/">
                      <Redirect to="/en" />
                    </Route>
                    <Route path="/about">
                      <Home />
                    </Route>
                    <Route path="/users">
                      <Home />
                    </Route>
                    <Route path="/en">
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </Router>
            );
}

export default App;
