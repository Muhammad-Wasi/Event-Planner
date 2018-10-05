import React, { Component } from 'react';
import { AppBar, Button } from '@material-ui/core';
import swal from 'sweetalert2';
import '../../App.css';
import firebase from 'firebase';


class Roll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            userData: {}
        }
    }

    componentWillMount() {
        const userData = JSON.parse(localStorage.getItem('SignupData'));
        console.log(userData)
        this.setState({ userData })
    }
    submitRoll() {
        const { selected, userData } = this.state;
        console.log('selected***', selected)
        if (selected) {
            userData.selected = selected;
            console.log('userData***', userData)
            firebase.database().ref("Users/" + userData.userUID + '/').push(userData)
                .then((success) => {
                    swal({
                        title: "success",
                        text: "Successful",
                        type: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setTimeout(() => {
                        localStorage.setItem('User', true);
                        this.props.history.push('/home')
                    }, 1500)

                })

        }
        else {
            swal({
                title: "error",
                text: "Select Roll",
                type: 'error'
            })
        }
    }
    render() {
        const { selected, userData } = this.state;
        console.log('selected***', selected)
        return (
            <div>
                <AppBar position={"static"} style={{ backgroundColor: 'rgb(34, 157, 179)' }} className="AppBar">
                    Roll
            </AppBar>
                <div className="Authentication" style={{ marginTop: '5%' }}>
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
                    <br />
                    <Button style={{ color: 'rgb(34, 157, 179)' }} onClick={this.submitRoll.bind(this)}>Submit</Button>
                </div>
            </div>
        )
    }
}

export default Roll;