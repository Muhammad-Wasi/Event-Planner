import ActionTypes from '../Constant/constant';
import firebase from 'firebase';
import swal from 'sweetalert2';
import History from '../../History'


export function onAuthAction() {
    return dispatch => {
        swal.showLoading();
        firebase.auth().onAuthStateChanged(function (user) {
            const db = firebase.database();
            if (user) {
                var uid = user.uid;
                dispatch({ type: ActionTypes.CURRENTUSERUID, payload: uid })

                // console.log('uid', uid)
                db.ref(`users/${uid}/`).once('value', snap => {
                    let userData = snap.val()
                    // console.log('snap', userData)
                    if (!userData) {
                        History.push('/role');
                        swal({
                            showConfirmButton: false,
                            timer: 100,
                        })
                        const userObj = {
                            email: user.email,
                            name: user.displayName,
                            photo: user.photoURL,

                        }
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: userObj })
                    }
                    else {
                        if (!userData.role) {
                            History.push('/role');
                            swal({
                                showConfirmButton: false,
                                timer: 100,
                            })
                            const userObj = {
                                email: user.email,
                                name: user.displayName,
                                photo: user.photoURL
                            }
                            dispatch({ type: ActionTypes.CURRENTUSER, payload: userObj })

                        }
                        else {
                            let eventArray = []
                            db.ref('events/').on('child_added', snapshot => {
                                const dataObj = {
                                    eventKey: snapshot.key,
                                    eventDetail: snapshot.val()
                                }
                                eventArray.push(dataObj);

                                // console.log('eventArray****', eventArray, eventArray.length)
                                dispatch({ type: ActionTypes.EVENTS, payload: eventArray })
                            })
                            dispatch({ type: ActionTypes.CURRENTUSER, payload: userData })
                            swal({
                                showConfirmButton: false,
                                timer: 100,
                            })
                            setTimeout(() => {
                                History.push('/home')
                            }, 100)
                            let going = [];
                            let notgoing = [];
                            firebase.database().ref('userTimeline/' + uid + '/').on('child_added', snapshot => {
                                if (snapshot.val() === 'Going') {
                                    going.push(snapshot.key)
                                    // console.log('going', going)
                                    dispatch({ type: ActionTypes.GOINGKEY, payload: going })
                                }
                                else if (snapshot.val() === 'NotGoing') {
                                    notgoing.push(snapshot.key)
                                    // console.log('notgoing', notgoing)
                                    dispatch({ type: ActionTypes.NOTGOINGKEY, payload: notgoing })
                                }
                            })
                        }
                    }
                })
                // ...
            } else {
                // User is signed out.
                // console.log('SignOut****')
                swal({
                    showConfirmButton: false,
                    timer: 100,
                })
                History.push('/')
                // ...
            }
        });
    }
}

export function signupAction(userDetails) {

    return dispatch => {
        const db = firebase.database();
        firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
            .then(() => {
                let currentUserUid = firebase.auth().currentUser.uid;
                // console.log('currentUserUid', currentUserUid);
                delete userDetails.password;
                db.ref(`users/${currentUserUid}/`).set(userDetails)
                userDetails.userUID = currentUserUid;
                // console.log('userDetails***', userDetails);
                dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })
                swal({
                    title: "success",
                    text: "Signup Successful",
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setTimeout(() => {
                    History.push('/home')
                }, 1500)

            })
            .catch(function (error) {
                swal({
                    title: "error",
                    text: error.message,
                    type: 'error'
                })
                // console.log('Error in signup')
            });
    }
}



export function signinAction(useremailpassword) {

    return dispatch => {
        const db = firebase.database();
        firebase.auth().signInWithEmailAndPassword(useremailpassword.email, useremailpassword.password)
            .then(() => {
                const userUID = firebase.auth().currentUser.uid;
                db.ref(`users/${userUID}/`).once("value", data => {
                    const userDetails = data.val();
                    userDetails.userUID = data.key;
                    // console.log('userDetails***', userDetails)
                    dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })
                })
                    .then(() => {
                        swal({
                            title: "success",
                            text: "Login Successful",
                            type: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                        setTimeout(() => {
                            History.push('/home')
                        }, 1500);
                    })

            })
            .catch(error => {
                var credential = firebase.auth.EmailAuthProvider.credential(useremailpassword.email, useremailpassword.password);
                firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
                    .then(function (usercred) {
                        var user = usercred.user;
                        db.ref(`users/${user.uid}/`).once('value', snap => {
                            // console.log('snap', snap.val())
                            dispatch({ type: ActionTypes.CURRENTUSER, payload: snap.val() })
                            swal({
                                showConfirmButton: false,
                                timer: 100,
                            })
                            setTimeout(() => {
                                History.push('/home')
                            }, 100)
                        })
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
                            History.push('/home')
                        }, 1500);
                    }, function (error) {
                        // console.log("Account linking error", error);
                        // Get reference to the currently signed-in user
                        var prevUser = firebase.auth.currentUser;
                        // Sign in user with another account
                        firebase.auth().signInWithCredential(credential).then(function (user) {
                            // console.log("Sign In Success", user);
                            swal({
                                title: "success",
                                text: "Login Successful",
                                type: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                            setTimeout(() => {
                                History.push('/home')
                            }, 1500);
                            // After data is migrated delete the duplicate user

                            return user.delete().then(function () {

                                // Link the OAuth Credential to original account

                                return prevUser.linkWithCredential(credential)
                            })
                                .then(function () {
                                    // Sign in with the newly linked credential
                                    return firebase.auth.signInWithCredential(credential);
                                });
                        }).catch(function (error) {
                            // console.log("signInWithCredential In Error", error);

                            if (error.message === "The password is invalid or the user does not have a password.") {
                                swal({
                                    title: "error",
                                    text: error.message,
                                    type: 'error'
                                })
                            }

                        })
                    })
                    .catch(function (error) {
                        // console.log("Sign In Error", error);
                        swal({
                            title: "error",
                            text: error.message,
                            type: 'error'
                        })

                    });
            });
    }
}



export function facebooksigninAction() {
    return dispatch => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                firebase.auth().currentUser.linkWithPopup(fbProvider)
                    .then(function (result) {

                        // Accounts successfully linked.
                        var credential = result.credential;

                        var token = result.credential.accessToken;
                        // console.log('token', token);
                        var user = result.user;
                        localStorage.setItem('UserUID', user.uid);
                        // Get reference to the currently signed-in user
                        var prevUser = firebase.auth().currentUser;
                        // Sign in user with another account
                        firebase.auth().signInWithCredential(credential).then(function (user) {
                            // console.log("Sign In Success", user);
                            var currentUser = user;
                            // console.log('CurrentUser', currentUser)
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
                            // console.log("Sign In Error", error);
                            swal({
                                title: "error",
                                text: error.message,
                                type: 'error'
                            })

                        });
                    })
                    .catch(function (error) {
                        var user = result.user;
                        const userDetails = {
                            name: user.displayName,
                            email: user.email,
                            photo: user.photoURL
                        }
                        // console.log('UserUID', userDetails)
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })
                        // localStorage.setItem('SignupData', JSON.stringify(userDataObj));
                        firebase.database().ref(`users/`).once('value', (snapshot) => {
                            // console.log('snapshot.key', snapshot.key)
                            // console.log('snapshot.val', snapshot.val()[user.uid])

                            console.log('snapShot.val', Object.keys(snapshot.val()));
                            if (!snapshot.val() || !snapshot.val()[user.uid]) {
                                swal({
                                    timer: 10,
                                    showConfirmButton: false
                                })
                                History.push('/role');
                            }
                            else if (!snapshot.val()[user.uid]) {
                                // console.log('Nahi Hai****')
                                swal({
                                    timer: 10,
                                    showConfirmButton: false
                                })
                                History.push('/role');
                            }
                            else {
                                // console.log('Hai****')
                                const userDetails = snapshot.val()[user.uid];
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })

                                // localStorage.setItem('User', true);
                                History.push('/home')

                                swal({
                                    title: "success",
                                    text: "Login Successful",
                                    type: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                            }
                        })

                    });

            })
            .catch(function (error) {
                // console.log("Sign In Error", error);
                swal({
                    title: "error",
                    text: error.message,
                    type: 'error'
                })
            });



    }
}

export function googlesigninAction() {
    return dispatch => {

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                var token = result.credential.accessToken;
                console.log('token', token);
                var user = result.user;
                // console.log('user.uid', user.uid)
                const userDetails = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }
                dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })
                firebase.database().ref(`users/`).once('value', (snapshot) => {
                    // console.log('snapshot.key', snapshot.key)
                    // console.log('snapShot.val', snapshot.val());
                    if (!snapshot.val() || !snapshot.val()[user.uid]) {
                        // console.log('Nahi Hai****')
                        swal({
                            timer: 10,
                            showConfirmButton: false
                        })
                        History.push('/role');
                    }
                    else {
                        // console.log('Hai****')

                        const userDetails = snapshot.val()[user.uid];
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })

                        History.push('/home')

                        swal({
                            title: "success",
                            text: "Login Successful",
                            type: 'success',
                            showConfirmButton: false,
                            timer: 1500,
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
                // console.log('error', error)
            });
    }
}


export function roleAction(userDetails) {
    return dispatch => {
        // console.log('user', userDetails)
        const db = firebase.database();
        const uid = firebase.auth().currentUser.uid;
        db.ref(`users/${uid}/`).set(userDetails);
        dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })
        History.push('/home')
    }
}


export function eventdetailAction(eventKey) {
    return dispatch => {
        // console.log('eventKey', eventKey)
        dispatch({ type: ActionTypes.EVENTKEY, payload: eventKey })

    }
}


export function going(goingArr) {
    return dispatch => {
        // console.log('goingArr', goingArr)
        dispatch({ type: ActionTypes.GOINGKEY, payload: goingArr })

    }
}

export function notgoing(notgoingArr) {
    return dispatch => {
        // console.log('notgoingArr', notgoingArr)
        dispatch({ type: ActionTypes.NOTGOINGKEY, payload: notgoingArr })
    }
}

export function changeCondition(condition) {
    return dispatch => {
        dispatch({ type: ActionTypes.CHANGES, payload: condition })
    }
}