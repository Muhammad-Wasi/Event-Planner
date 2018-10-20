import React, { Component } from 'react';
import { signinAction, facebooksigninAction, googlesigninAction } from '../../Store/Action/action';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { AppBar, Button } from '@material-ui/core';
import swal from 'sweetalert2';
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

    email(e) {
        this.setState({ email: e.target.value })
    }

    password(e) {
        this.setState({ password: e.target.value })
    }

    login() {
        const { email, password } = this.state;
        if (email && password) {
            swal.showLoading();
            const useremailpassword = { email, password }
            this.props.signinwithEmailPassword(useremailpassword)
        }
        else {
            swal({
                title: "error",
                text: "Something went wrong",
                type: 'error'
            })
        }
    }

    signup() {
        this.props.history.push('/signup')
    }

    facebook() {
        swal.showLoading();
        this.props.signinwithFacebook()
    }
    google() {
        swal.showLoading();
        this.props.signinwithGoogle();
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <AppBar position={"static"} style={{ backgroundColor: 'rgb(34, 157, 179)' }} className="AppBar">
                    Login
                </AppBar>
                <div className="Authentication">
                    <label>Email</label>
                    <br />
                    <input type="text" value={email} onChange={(e) => this.email(e)} />
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="password" value={password} onChange={(e) => this.password(e)} />
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

function mapStateToProp(state) {
    return ({
        userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        signinwithEmailPassword: (userDetails) => {
            dispatch(signinAction(userDetails));
        },
        signinwithFacebook: () => {
            dispatch(facebooksigninAction());
        },
        signinwithGoogle: () => {
            dispatch(googlesigninAction());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);



