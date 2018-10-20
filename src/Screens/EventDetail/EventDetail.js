import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Button } from '@material-ui/core';
import '../../App.css';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventKey: '',
            eventObj: {},
            bookSeats: [],
            soldAllTickets: []
        }

    }
    componentWillMount() {
        const { currentuserUID, eventsArray, eventKey } = this.props
        let that = this;
        eventsArray.map(item => {
            if (item.eventKey === eventKey) {
                return that.setState({ eventObj: item.eventDetail })
            }
        })
    }

    render() {
        const { eventObj, soldAllTickets, eventKey } = this.state;
        const { user } = this.props;
        let role = user.role;
        return (
            <div className="detail">
                <Navbar />
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
                            role === 'Attendee' ?
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

function mapStateToProps(state) {
    return ({
        currentuserUID: state.root.currentuserUID,
        eventsArray: state.root.events,
        eventKey: state.root.eventKey,
        user: state.root.user,
    })
}

export default connect(mapStateToProps, null)(EventDetail);
