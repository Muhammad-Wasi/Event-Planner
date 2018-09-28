import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import Home from '../Screens/Home/Home';
import history from '../History';

class Routes extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Router history={history}>
                <div>
                    {this.props.children}
                    <Route exact path={"/"} component={Login} />
                    <Route path={"/signup"} component={Signup} />
                    <Route path={'/home'} component={Home} />
                </div>
            </Router>
        )
    }
}

export default Routes;