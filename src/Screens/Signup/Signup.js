import React, { Component } from 'react';
import { signupAction } from '../../Store/Action/action';
import { connect } from 'react-redux';
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
            role: '',
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
        const { name, email, password, confrimPassword, role, photo } = this.state;
        console.log(email, password, confrimPassword);
        if (name && email && password && confrimPassword && role) {
            if (password === confrimPassword) {
                swal.showLoading();
                const userDetails = { name, email, password, role };
                this.props.signupwithEmailPassword(userDetails);
            }
            else {
                if (password !== confrimPassword) {
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

    render() {
        const { name, email, password, confrimPassword, role } = this.state;
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
                    <input type="password" value={password} onChange={(e) => this.password(e)} />
                    <br />
                    <label>ConfrimPassword</label>
                    <br />
                    <input type="password" value={confrimPassword} onChange={(e) => this.confrimPassword(e)} />
                    <br />
                    <label className="Radio">
                        <input type="radio" name="panel" value="Organiser" checked={role === 'Organiser'} onChange={(e) => this.setState({ role: e.target.value })} />
                        Organiser
                    </label>
                    <label className="Radio">
                        <input type="radio" name="panel" value="Attendee" checked={role === 'Attendee'} onChange={(e) => this.setState({ role: e.target.value })} />
                        Attendee
                    </label>
                    <br />
                    <Button style={{ color: 'rgb(34, 157, 179)' }} onClick={this.signup.bind(this)}>Sign up</Button>
                    <br />
                    <span style={{ color: 'rgb(1, 26, 26)', fontWeight: 'bold' }}>Already signup? <Link style={{ color: 'rgb(34, 157, 179)', fontWeight: 'bold' }} to="/">Login</Link></span>
                </div>
            </div>

        )
    }

}

function mapDispatchToProp(dispatch) {
    return ({
        signupwithEmailPassword: (userDetails) => {
            dispatch(signupAction(userDetails));
        }
    })
}

export default connect(null, mapDispatchToProp)(Signup);



