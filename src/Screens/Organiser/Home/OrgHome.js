import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../../App.css';
import firebase from 'firebase';
import { light } from '@material-ui/core/styles/createPalette';

class OrgHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addForm: true
        }

        this.addForm = this.addForm.bind(this);
    }

    addForm() {
        this.props.addform()
    }

    render() {
        const { addForm } = this.state;
        return (
            <div className="OrgHome">
                <IconButton title="Add Event Form" onClick={this.addForm} style={{ backgroundColor: 'lightblue', float: 'right', margin: '7px', width: '50px', height: '50px', fontSize: '25px', fontWeight: 'bold' }} >+</IconButton>
                {/* <IconButton onClick={this.cancle} style={{ backgroundColor: 'lightblue', float: 'right', margin: '7px', width: '60px', height: '60px', fontSize: '30px', fontWeight: 'bold' }} >x</IconButton> */}
                <h1 className="OrgHeading">Add Event</h1>
            </div>
        )
    }
}

export default OrgHome;