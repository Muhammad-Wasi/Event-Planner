import React, { Component } from 'react';
import firebase from 'firebase';
import { AppBar, Button } from '@material-ui/core';
import swal from 'sweetalert2';
import '../../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeState } from '../../Store/Action/action';

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
        const UserDataObj = JSON.parse(localStorage.getItem("UserDataObj"));
        !!UserDataObj && this.props.history.push('/home')
        // console.log(!!UserDataObj)
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
        let that = this;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                const userUID = firebase.auth().currentUser.uid;
                const userDataObj = {
                    email,
                    userUID
                }
                localStorage.setItem('UserDataObj', JSON.stringify(userDataObj));
                swal({
                    title: "success",
                    text: "Login Successful",
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setTimeout(() => {
                    that.props.history.push('/home')
                }, 1500);
                // this.props.changeStateToReducer(userDataObj);
                // console.log('Success', success)
            })
            .catch(function (error) {
                console.log('Error in login', error.message);
                swal({
                    title: "error",
                    text: error.message,
                    type: 'error'
                })
            });
    }

    signup() {
        this.props.history.push('/signup')
    }

    facebook() {
        console.log("Facebook");
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        let that = this;
        firebase.auth().signInWithPopup(fbProvider)
            .then((result)=> {
                var token = result.credential.accessToken;
                console.log('token', token);
                var user = result.user;
                const userDataObj = {
                    name: user.displayName,
                    email: user.email,
                    userUID: user.uid,
                    photo: user.photoURL
                }
                localStorage.setItem('UserDataObj', JSON.stringify(userDataObj));
                swal({
                    title: "success",
                    text: "Login Successful",
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setTimeout(()=>{
                    this.props.history.push('/home')
                },1500)
                console.log('user', user)
            }).catch(function (error) {
                var errorCode = error.code;
                console.log('errorCode', errorCode)
                var errorMessage = error.message;
                swal({
                    title: "error",
                    text: errorMessage,
                    type: 'error'
                })
                console.log('error', error)
            });
    }
    google() {
        console.log("Google");
        var provider = new firebase.auth.GoogleAuthProvider();
        let that = this;
        firebase.auth().signInWithPopup(provider)
            .then((result)=> {
                var token = result.credential.accessToken;
                // console.log('token', token);
                var user = result.user;
                const userDataObj = {
                    email: user.email,
                    userUID: user.uid
                }
                localStorage.setItem('UserDataObj', JSON.stringify(userDataObj));
                swal({
                    title: "success",
                    text: "Login Successful",
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setTimeout(()=>{
                    this.props.history.push('/home')
                },1500)
                console.log('user', user)
                // ...
            })
            .catch(function (error) {
                var errorMessage = error.message;
                swal({
                    title: "error",
                    text: errorMessage,
                    type: 'error'
                })
                console.log('error', error)
            });
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
// function mapDispatchToProps(dispatch) {
//     return ({
//         changeStateToReducer: (userDataObj) => {
//             dispatch(changeState(userDataObj));
//         }
//     })
// }

// export default connect(null, mapDispatchToProps)(Login);
