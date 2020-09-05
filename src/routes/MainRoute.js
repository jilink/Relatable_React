import React from 'react';
import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link,
    Redirect
} from "react-router-dom";
import Home from '../Home';
import MainNavbar from '../components/MainNavbar';

function MainRoute() {
      return (
              <Router>
                  <div>
          <MainNavbar></MainNavbar>

                  {/* A <Switch> looks through its children <Route>s and
                              renders the first one that matches the current URL. */}
                  <Switch>
                    <Route exact path="/">
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

export default MainRoute;
