import React, { Component, Children } from 'react';
import firebase from 'firebase';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { AppBar, Button } from '@material-ui/core';
import swal from 'sweetalert2';
import '../../App.css';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { changeState } from '../../Store/Action/action';

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
        const user = localStorage.getItem('User');
        user && this.props.history.push('/home')
    }

    email(e) {
        this.setState({ email: e.target.value })
    }

    password(e) {
        this.setState({ password: e.target.value })
    }

    login() {
        const { email, password } = this.state;
        let that = this;

        if (email && password) {
            swal.showLoading();
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    const userUID = firebase.auth().currentUser.uid;
                    localStorage.setItem('UserUID', userUID);
                    firebase.database().ref('Users/' + userUID + '/').on("child_added", data => {
                        console.log('DataKey', data.key)
                        console.log('DataVal', data.val())
                        const dataObj = data.val()
                        const userDataObj = {
                            name: dataObj.name,
                            email: dataObj.email,
                            userUID: userUID,
                            selected: dataObj.selected
                        }
                        console.log('UserUID', userUID)
                        localStorage.setItem('SignupData', JSON.stringify(userDataObj));

                    })
                        .then(() => {
                            localStorage.setItem('User', true)
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
                        })

                    // this.props.changeStateToReducer(userDataObj);
                    // console.log('Success', success)
                })
                .catch(error => {
                    // console.log('Error in login', error.message);
                    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
                    // console.log('credential', credential)
                    firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
                        .then(function (usercred) {
                            var user = usercred.user;
                            localStorage.setItem('UserUID', user.uid);
                            // console.log("Account linking success", user);
                            localStorage.setItem('User', true)
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
                        }, function (error) {
                            console.log("Account linking error", error);
                            // Get reference to the currently signed-in user
                            var prevUser = firebase.auth.currentUser;
                            // Sign in user with another account
                            firebase.auth().signInWithCredential(credential).then(function (user) {
                                console.log("Sign In Success", user);
                                // var currentUser = user;
                                localStorage.setItem('User', true);
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
                                // After data is migrated delete the duplicate user

                                // return user.delete().then(function () {

                                // Link the OAuth Credential to original account

                                return prevUser.linkWithCredential(credential)
                                    // })
                                    .then(function () {
                                        // Sign in with the newly linked credential
                                        return firebase.auth.signInWithCredential(credential);
                                    });
                            }).catch(function (error) {
                                console.log("Sign In Error", error);
                                // swal({
                                //     title: "error",
                                //     text: error.message,
                                //     type: 'error'
                                // })

                            })
                        })
                        .catch(function (error) {
                            console.log("Sign In Error", error);
                            swal({
                                title: "error",
                                text: error.message,
                                type: 'error'
                            })

                        });
                });
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
        console.log("Facebook");
        swal.showLoading();
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        let that = this;
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                firebase.auth().currentUser.linkWithPopup(fbProvider)
                    .then(function (result) {

                        // Accounts successfully linked.
                        var credential = result.credential;

                        var token = result.credential.accessToken;
                        console.log('token', token);
                        var user = result.user;
                        localStorage.setItem('UserUID', user.uid);
                        // Get reference to the currently signed-in user
                        var prevUser = firebase.auth().currentUser;
                        // Sign in user with another account
                        firebase.auth().signInWithCredential(credential).then(function (user) {
                            console.log("Sign In Success", user);
                            var currentUser = user;
                            // Merge prevUser and currentUser data stored in Firebase.
                            // Note: How you handle this is specific to your application

                            // After data is migrated delete the duplicate user

                            // return user.delete().then(function () {

                            // Link the OAuth Credential to original account
                            return prevUser.linkWithCredential(credential)
                                // })
                                .then(function () {
                                    // Sign in with the newly linked credential
                                    return firebase.auth().signInWithCredential(credential);
                                });
                        }).catch(function (error) {
                            console.log("Sign In Error", error);
                            swal({
                                title: "error",
                                text: error.message,
                                type: 'error'
                            })

                        });
                    })
                    .catch(function (error) {
                        var user = result.user;
                        const userDataObj = {
                            name: user.displayName,
                            email: user.email,
                            userUID: user.uid,
                            photo: user.photoURL
                        }
                        console.log('UserUID', user.uid)
                        localStorage.setItem('SignupData', JSON.stringify(userDataObj));

                        firebase.database().ref('Users/').once('value', (snapshot) => {
                            console.log('snapshot.key', snapshot.key)
                            console.log('snapShot.val', snapshot.val());
                            if (snapshot.val() == null) {
                                swal({
                                    timer: 10,
                                    showConfirmButton: false
                                })
                                that.props.history.push('/roll');

                            }
                            else if (!snapshot.val()[user.uid]) {
                                console.log('Nahi Hai****')
                                swal({
                                    timer: 10,
                                    showConfirmButton: false
                                })
                                that.props.history.push('/roll');
                            }
                            else {
                                console.log('Hai****')
                                localStorage.setItem('User', true);
                                swal({
                                    title: "success",
                                    text: "Login Successful",
                                    type: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                                firebase.database().ref('Users/' + user.uid + '/').on('child_added', snaVal => {
                                    localStorage.setItem('selected', snaVal.val().selected);
                                    setTimeout(() => {
                                        that.props.history.push('/home')
                                    }, 1500)
                                    console.log('user', user)
                                })
                            }
                        })

                    });

            })
            .catch(function (error) {
                console.log("Sign In Error", error);
                swal({
                    title: "error",
                    text: error.message,
                    type: 'error'
                })
            });
    }
    google() {
        console.log("Google");
        swal.showLoading();
        var provider = new firebase.auth.GoogleAuthProvider();
        let that = this;
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                var token = result.credential.accessToken;
                // console.log('token', token);
                var user = result.user;
                console.log('user.uid', user.uid)
                const userDataObj = {
                    name: user.displayName,
                    email: user.email,
                    userUID: user.uid,
                    photo: user.photoURL
                }
                localStorage.setItem('SignupData', JSON.stringify(userDataObj));
                firebase.database().ref('Users/').once('value', (snapshot) => {
                    console.log('snapshot.key', snapshot.key)
                    console.log('snapShot.val', snapshot.val());
                    if (!snapshot.val()[user.uid]) {
                        console.log('Nahi Hai****')
                        swal({
                            timer: 10,
                            showConfirmButton: false
                        })
                        that.props.history.push('/roll');
                    }
                    else {
                        console.log('Hai****')
                        localStorage.setItem('User', true);
                        swal({
                            title: "success",
                            text: "Login Successful",
                            type: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                        firebase.database().ref('Users/' + user.uid + '/').on('child_added', snaVal => {
                            localStorage.setItem('selected', snaVal.val().selected);
                            setTimeout(() => {
                                that.props.history.push('/home')
                            }, 1500)
                            console.log('user', user)
                        })
                    }
                })
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

export default Login;
