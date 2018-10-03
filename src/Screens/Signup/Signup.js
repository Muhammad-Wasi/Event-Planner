import React, { Component } from 'react';
import { AppBar, Button } from '@material-ui/core';
import swal from 'sweetalert2';
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
            confrimPassword: '',
            selected: '',
            photo: ''
        }
        this.name = this.name.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.confrimPassword = this.confrimPassword.bind(this);
    }

    componentWillMount() {
        const user = localStorage.getItem('User');
        user && this.props.history.push('/home')
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
        const db = firebase.database();
        const { name, email, password, confrimPassword, selected, photo } = this.state;
        console.log(email, password, confrimPassword);
        let that = this;
        if (name && email && password && confrimPassword && selected) {
            if (password === confrimPassword && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                swal.showLoading();
                const userInfo = { name, email, selected };
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        var userUID = firebase.auth().currentUser.uid
                        console.log('UserUID', userUID);
                        const userInfo = { name, email, selected };
                        db.ref("Users/" + userUID + '/').push(userInfo)
                        swal({
                            title: "success",
                            text: "Signup Successful",
                            type: 'success',
                            showConfirmButton: false,
                            timer: 1000,
                        })
                        setTimeout(() => {
                            this.props.history.push('/')
                        }, 1500)

                    })
                    .catch(function (error) {
                        swal({
                            title: "error",
                            text: error.message,
                            type: 'error'
                        })
                        console.log('Error in signup')
                    });
            }
            else {
                if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    swal({
                        title: "error",
                        text: 'Wrong Email Address',
                        type: 'error'
                    })
                }
                else if (password !== confrimPassword) {
                    swal({
                        title: "error",
                        text: 'Password Did not Match',
                        type: 'error'
                    })
                }
            }
        }
        else {
            swal({
                title: "error",
                text: 'Something Went Wrong',
                type: 'error'
            })
        }
    }



    // handleFileUpload = () => {
    //     let that = this;
    //     var preview = document.querySelector('img'); //selects the query named img
    //     var file = document.querySelector('input[type=file]').files[0]; //sames as here
    //     var reader = new FileReader();

    //     reader.onloadend = function () {
    //         let pic = { "url": "", val: "0" };
    //         pic.url = reader.result;
    //         console.log('pic.url', pic.url)
    //         // this.picArray.push(pic);
    //         that.setState({ photo: pic.url });
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file); //reads the data as a URL
    //     } else {
    //         preview.src = "";
    //     }
    // }




    render() {
        const { name, email, password, confrimPassword, selected, photo } = this.state;
        console.log('photo***', photo)
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
                    <label className="Radio">
                        <input type="radio" name="panel" value="Organiser" checked={selected === 'Organiser'} onChange={(e) => this.setState({ selected: e.target.value })} />
                        Organiser
                    </label>
                    <label className="Radio">
                        <input type="radio" name="panel" value="Attendee" checked={selected === 'Attendee'} onChange={(e) => this.setState({ selected: e.target.value })} />
                        Attendee
                    </label>
                    <br />
                    {/* <input type="file" onChange={this.handleFileUpload} />
                    <br /> */}
                    <Button style={{ color: 'rgb(34, 157, 179)' }} onClick={this.signup.bind(this)}>Sign up</Button>
                    <br />
                    <span style={{ color: 'rgb(1, 26, 26)', fontWeight: 'bold' }}>Already signup? <Link style={{ color: 'rgb(34, 157, 179)', fontWeight: 'bold' }} to="/">Login</Link></span>
                </div>
            </div>

        )
    }

}

export default Signup;