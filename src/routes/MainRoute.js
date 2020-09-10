import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from '../Home';
import Create from '../pages/Create';
import Browse from '../pages/Browse';
import MainNavbar from '../components/MainNavbar';

function MainRoute() {
    return (
        <Router>
            <div>
                <MainNavbar></MainNavbar>

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/create">
                        <Create />
                    </Route>
                    <Route path="/browse">
                        <Browse />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default MainRoute;