import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../../App.css';
import firebase from 'firebase';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class BuyTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    logout() {
        localStorage.removeItem('User');
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <AppBar position="static" className="HomeBar" style={{ backgroundColor: "rgb(34, 157, 179)", height: '80px' }}>
                    <div className="MainDiv">
                        <div className="image">
                            {/* {userDataObj.photo ?
                                <img alt="User Profile Picture..." src={userDataObj.photo} style={{ width: '60px', height: '60px', borderRadius: '60px' }} />
                                : */}
                            <img alt="User Profile Picture..." src="https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif" style={{ width: '60px', height: '60px', borderRadius: '60px' }} />
                            {/* } */}
                        </div>
                        <div className="Heading">
                            <span>Event</span>
                        </div>
                        <div className="Button">
                            <Button color={"secondary"} style={{ backgroundColor: 'white', width: '80px', float: "right", marginRight: '7px' }} onClick={this.logout.bind(this)} >LogOut</Button>
                        </div>
                    </div>
                </AppBar>
                <div className="EventName">
                    <div style={{ width: '20%', paddingLeft: '10px' }}>
                        <Link to={'/home'}>
                            <Button size="small" color="primary">
                                <b>Back</b>
                            </Button>
                        </Link>
                    </div>
                    <div style={{ width: '60%', textAlign: 'center' }}>
                        <h2 style={{ color: "rgb(34, 157, 179)" }}>
                            {/* {eventObj.name} */}
                            Sitting Arrangement
                        </h2>
                    </div>
                    <div style={{ width: '20%', textAlign: 'end', paddingRight: '10px' }}>
                    </div>
                </div>
                <div>
                    <label>
                        <input type="checkbox" />
                        Front Seat
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" />
                        Middle Seat
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" />
                        Back Seat
                    </label>
                </div>
            </div>
        )
    }
}

export default BuyTickets;