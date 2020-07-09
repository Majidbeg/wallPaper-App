import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from '../../components/register/register'
import Login from '../../components/login/login'
import Home from '../../components/home/home'
import Favorite from '../../components/favorite/favourites'
import ErrorPage from '../../components/errorPage/errorPage';
import LandingPage from '../../components/landingPage/landingPage';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/favorite' component={Favorite} />
                <Route exact path='/register' component={Register} />
                <Route exact path='*' component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;   