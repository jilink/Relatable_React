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
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
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
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default MainRoute;
