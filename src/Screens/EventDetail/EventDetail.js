import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../App.css';
import firebase from 'firebase';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventKey: '',
            eventObj: {}
        }

    }
    componentWillMount() {
        const eventKey = localStorage.getItem('CardID');
        this.setState({ eventKey })
        swal.showLoading();
    }
    componentDidMount() {
        const { eventKey } = this.state;
        console.log('eventKey****', eventKey)
        firebase.database().ref('Events/' + eventKey + '/').once('value', snapshot => {
            console.log('snapshot.val()', snapshot.val())
            this.setState({ eventObj: snapshot.val() })
            swal({
                timer: 10,
                showConfirmButton: false
            })
        })
    }
    logout() {
        localStorage.removeItem('User');
        this.props.history.push('/')
    }

    render() {
        const { eventObj } = this.state;
        return (
            <div className="detail">
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
                            {eventObj.name}
                        </h2>
                    </div>
                    <div style={{ width: '20%', textAlign: 'end', paddingRight: '10px' }}>
                        <Link to={'/buytickets'}>
                            <Button size="small" color="primary">
                                <b>
                                    Buy
                            </b>
                            </Button>
                        </Link>

                    </div>
                </div>
                <div className="OtherDetails">
                    <div className="EventDetailDiv">
                        <h4>Start Time</h4>
                        <p>{eventObj.startTime}</p>
                        <h4>End Time</h4>
                        <p>{eventObj.endTime}</p>
                        <h4>Address</h4>
                        <p>{eventObj.address}</p>
                        <h4>Location</h4>
                        <p>{eventObj.location}</p>
                    </div>
                    <div className="EventDetailDiv2">
                        <img src={eventObj.photo} alt="Event Picture" style={{ width: '100%', height: '100%', border: '1px solid darkgrey', borderRadius: '5px' }} />
                    </div>
                    <div className="EventDetailDiv">
                        <h4>Stting Arrangement</h4>
                        <p>{eventObj.sittingDetails}</p>
                        <h4>Detail</h4>
                        <p>{eventObj.details}</p>
                        <h4>Ticket</h4>
                        <p>{eventObj.selected}</p>
                        {eventObj.selected === "Paid" ?
                            <span>
                                <h4>Price</h4>
                                <p>{eventObj.price}</p>
                            </span>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default EventDetail;