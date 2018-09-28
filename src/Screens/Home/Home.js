import React, { Component } from 'react';
import { AppBar, Button } from '@material-ui/core';
import '../../App.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        const UserDataObj = localStorage.getItem("UserDataObj");
        if (!UserDataObj) {
            this.props.history.push('/')
        }
    }

    logout(){
        localStorage.removeItem('UserDataObj')
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Button style = {{backgroundColor: 'rgb(238, 149, 149)', float: "right", marginRight: '15px'}} color={"secondary"} onClick={this.logout.bind(this)} >LogOut</Button>
                <h1 style = {{color: "darkcyan", textAlign: "center"}}>Hello Home</h1>
            </div>
        )
    }

}

export default Home;