import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import Home from '../Screens/Home/Home';
import Event from '../Screens/Organiser/EventForm/Event';
import Roll from '../Screens/Roll/Roll';
import EventDetail from '../Screens/EventDetail/EventDetail';
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
                    <Route path={'/eventForm'} component={Event} />
                    <Route path={'/roll'} component={Roll} />
                    <Route path={'/eventdetail'} component={EventDetail} />
                </div>
            </Router>
        )
    }
}

export default Routes;