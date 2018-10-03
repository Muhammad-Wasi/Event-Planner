import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../../App.css';
import firebase from 'firebase';
import { light } from '@material-ui/core/styles/createPalette';

class AttHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div className="AttHome">
                <span className="AttHeading">AttHome</span>
            </div>
        )
    }
}

export default AttHome;