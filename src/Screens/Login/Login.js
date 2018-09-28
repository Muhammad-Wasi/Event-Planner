import React, { Component } from 'react';
import firebase from 'firebase';
import { AppBar, Button } from '@material-ui/core';
import '../../App.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
    }

    componentWillMount() {
        const UserDataObj = localStorage.getItem("UserDataObj");
        if (UserDataObj) {
            this.props.history.push('/home')
        }
    }

    email(e) {
        this.setState({ email: e.target.value })
    }

    password(e) {
        this.setState({ password: e.target.value })
    }

    login() {
        const { email, password } = this.state;
        console.log(email, password);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((success) => {
                const userUID = firebase.auth().currentUser.uid
                const userDataObj = {
                    userUID,
                    email
                }
                localStorage.setItem('UserDataObj', JSON.stringify(userDataObj));
                this.props.history.push('/home')
                console.log('Success', success)
            })
            .catch(function (error) {
                console.log('Error in login', error.message);
            });
    }

    signup() {
        this.props.history.push('/signup')
    }

    facebook() {
        console.log("Facebook");
        // this.props.history.push('/signup')
    }
    google() {
        console.log("Google");
        // this.props.history.push('/signup')
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <AppBar position={"static"} style={{ backgroundColor: 'rgb(34, 157, 179)' }} className="AppBar">
                    {/* <Typography variant="title" color="inherit" > */}
                    Login
                    {/* </Typography> */}
                    {/* <Button color="inherit">Signup</Button> */}
                </AppBar>
                <div className="Authentication">
                    <label>Email</label>
                    <br />
                    <input type="text" value={email} onChange={(e) => this.email(e)} />
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="text" value={password} onChange={(e) => this.password(e)} />
                    <br />
                    <Button color={"inherit"} style={{ color: 'rgb(34, 157, 179)' }} onClick={this.login.bind(this)}>Login</Button>
                    <br />
                    <Button color={"primary"} onClick={this.facebook.bind(this)}>Sign in with Facebook</Button>
                    <br />
                    <Button color={"secondary"} onClick={this.google.bind(this)}>Sign in with Google++</Button>
                    <br />
                    <span style={{ color: 'rgb(1, 26, 26)', fontWeight: 'bold' }}>I have'nt account? <Link style={{ color: 'rgb(34, 157, 179)', fontWeight: 'bold' }} to="/signup">Signup</Link></span>
                </div>
            </div>
        )
    }

}


export default Login;