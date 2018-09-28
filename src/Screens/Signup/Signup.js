import React, { Component } from 'react';
import { AppBar, Button } from '@material-ui/core';
import '../../App.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confrimPassword: ''
        }
        this.name = this.name.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.confrimPassword = this.confrimPassword.bind(this);
    }

    name(e) {
        this.setState({ name: e.target.value })
    }

    email(e) {
        this.setState({ email: e.target.value })
    }

    password(e) {
        this.setState({ password: e.target.value })
    }

    confrimPassword(e) {
        this.setState({ confrimPassword: e.target.value })
    }

    signup() {
        const { name, email, password, confrimPassword } = this.state;
        console.log(email, password, confrimPassword);
        if (name && email && password && confrimPassword) {
            if (password === confrimPassword && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        this.props.history.push('/')

                    })
                    .catch(function (error) {
                        console.log('Error in signup')
                    });
            }
            else {
                if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    alert('Wrong Email Address');
                }
                else if (password !== confrimPassword) {
                    alert('Password Did not Match');
                }
            }
        }
        else {
            alert('Something Went Wrong');
        }
    }
    render() {
        const { name, email, password, confrimPassword } = this.state;
        return (
            <div>
                <AppBar position={"static"} style={{ backgroundColor: 'rgb(34, 157, 179)' }} className="AppBar">
                    Signup
                </AppBar>
                <div className="Authentication">
                    <label>Username</label>
                    <br />
                    <input type="text" value={name} onChange={(e) => this.name(e)} />
                    <br />
                    <label>Email</label>
                    <br />
                    <input type="text" value={email} onChange={(e) => this.email(e)} />
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="text" value={password} onChange={(e) => this.password(e)} />
                    <br />
                    <label>ConfrimPassword</label>
                    <br />
                    <input type="text" value={confrimPassword} onChange={(e) => this.confrimPassword(e)} />
                    <br />
                    <Button style={{ color: 'rgb(34, 157, 179)' }} onClick={this.signup.bind(this)}>Sign up</Button>
                    <br />
                    <span style={{ color: 'rgb(1, 26, 26)', fontWeight: 'bold' }}>Already signup? <Link style={{ color: 'rgb(34, 157, 179)', fontWeight: 'bold' }} to="/">Login</Link></span>
                    <br />
                    {/* <Button style={{ color: 'rgb(6, 63, 63)' }} onClick={this.login.bind(this)}>Login</Button> */}

                </div>
            </div>

        )
    }

}

export default Signup;