import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../../App.css';
import firebase from 'firebase';
import { light } from '@material-ui/core/styles/createPalette';


class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {

            selected: 'Paid'
        }
    }

    render() {
        const { selected } = this.state;
        return (
            <div>
                <AppBar position="static" className="HomeBar" style={{ backgroundColor: "rgb(34, 157, 179)", height: '80px', textAlign: 'center' }}>
                    <h1>Event form</h1>
                </AppBar>
                <div className="Authentication" style={{ textAlign: "center" }}>
                    <br />
                    <label>Event Name</label>
                    <br />
                    <input type="text" />
                    <br />
                    <label>Event Details</label>
                    <br />
                    <textarea />
                    <br />
                    <input type="file" style={{paddingLeft: '0px', height: '27px'}} />
                    <br />
                    <label>Location</label>
                    <br />
                    <input type="text" />
                    <br />
                    <label>Address</label>
                    <br />
                    <input type="text" />
                    <br />
                    <label>Start Time</label>
                    <br />
                    <input />
                    <br />
                    <label>End Time</label>
                    <br />
                    <input />
                    <br />
                    <label>Sitting Arrangement Details</label>
                    <br />
                    <textarea type="text" />
                    <br />
                    <label>Number Of Seats</label>
                    <br />
                    <input type="number" />
                    <br />
                    <label className="Radio">
                        <input type="radio" name="panel" value="Free" checked={selected === 'Free'} onChange={(e) => this.setState({ selected: e.target.value })} />
                        Free
                    </label>
                    <label className="Radio">
                        <input type="radio" name="panel" value="Paid" checked={selected === 'Paid'} onChange={(e) => this.setState({ selected: e.target.value })} />
                        Paid
                    </label>
                    {selected === "Paid" &&
                        <span>
                            <br />
                            <label>Price Per Seat</label>
                            <br />
                            <input type="number" />
                        </span>
                    }
                    <br />
                    <Button style={{ color: 'rgb(34, 157, 179)' }}>Submit</Button>
                    <br />
                    <Button style={{ marginBottom: '20px' }} color={"secondary"} onClick={() => { this.props.history.push('/home') }}>Cancle</Button>
                </div>
            </div>
        )
    }
}

export default Event;