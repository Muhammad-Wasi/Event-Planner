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
            eventObj: {},
            userRoll: '',
            bookSeats: [],
            soldAllTickets: []
        }

    }
    componentWillMount() {
        const eventKey = localStorage.getItem('CardID');
        const userRoll = localStorage.getItem('selected');
        this.setState({ eventKey, userRoll })
        swal.showLoading();
    }
    componentDidMount() {
        const { eventKey, bookSeats, soldAllTickets } = this.state;
        console.log('eventKey****', eventKey)
        firebase.database().ref('Events/' + eventKey + '/').once('value', snapshot => {
            console.log('snapshot.val()', snapshot.val())
            this.setState({ eventObj: snapshot.val() })
            swal({
                timer: 10,
                showConfirmButton: false
            })
            // })

            // firebase.database().ref('Events/' + eventKey + '/').on('value', snapshot => {
            if (snapshot.val().BookedSeats) {
                const findBookedSeatsArr = Object.values(snapshot.val().BookedSeats);
                bookSeats.splice(0);
                this.setState({ bookSeats })
                for (var key in findBookedSeatsArr) {
                    const val = Object.values(Object.values(findBookedSeatsArr[key]))
                    for (var i = 0; i < val.length; i++) {
                        console.log('VAl***', val[i])
                        bookSeats.push(...val[i])
                    }
                }
            }

            const firstNum = Number(snapshot.val().startNum);
            const lastNum = Number(snapshot.val().endNum);
            console.log('******', lastNum - firstNum + 1, bookSeats, bookSeats.length)
            if (lastNum - firstNum + 1 == bookSeats.length) {
                console.log('bookSeats***', eventKey)
                soldAllTickets.push(eventKey);
                this.setState({ soldAllTickets })
            }
        })

    }
    logout() {
        localStorage.clear();
        this.props.history.push('/')
    }

    render() {
        const { eventObj, userRoll, soldAllTickets, eventKey } = this.state;
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
                            <Button variant="outlined" size="small" color="primary">
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
                        {
                            userRoll === 'Attendee' ?
                                <span>
                                    {
                                        soldAllTickets.indexOf(eventKey) !== -1 ?
                                            <Button variant="outlined" disabled>Sold</Button>
                                            :
                                            <Link to={'/buytickets'}>
                                                <Button variant="outlined" id={eventKey} size="small" color="primary" onClick={() => { localStorage.setItem('CardID', eventKey) }}>
                                                    Buy
                                        </Button>
                                            </Link>
                                    }
                                </span>
                                :
                                null
                        }
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