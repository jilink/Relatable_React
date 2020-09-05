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
