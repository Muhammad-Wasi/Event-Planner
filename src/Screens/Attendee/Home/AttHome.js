import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Select, MenuItem } from '@material-ui/core';
import '../../../App.css';
import swal from 'sweetalert2';
import MediaCard from '../../Organiser/EventCards/EventCards';
import firebase from 'firebase';

class AttHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            select: '',
            timeline: [],
        }

        this.handle = this.handle.bind(this);
    }

    componentWillMount() {
        swal.showLoading()
    }

    componentDidMount() {
        const { list } = this.state;
        const userUID = localStorage.getItem('UserUID')
        this.setState({ userUID })
        firebase.database().ref('Events/').on('child_added', snapshot => {
            console.log('OrgHome****', snapshot.key);
            console.log('OrgHome****', snapshot.val());
            const eventObj = {
                eventKey: snapshot.key,
                eventDetail: snapshot.val()
            }
            list.push(eventObj);
            this.setState({ list })
            swal({
                timer: 10,
                showConfirmButton: false
            })
        })
    }

    handle(e) {
        const { timeline, select, userUID, list } = this.state;
        console.log('Select Value**', e.target.value)
        this.setState({ select: e.target.value })
        timeline.splice(0)
        this.setState({ timeline })

        firebase.database().ref('UserTimeline/' + userUID + '/').on('child_added', snapshot => {
            console.log('SNapshot', snapshot)
            console.log('Val***', snapshot.val())
            console.log('Key***', snapshot.key)
            list.map(item => {
                // console.log('select***', e.target.value)
                if (snapshot.val() === e.target.value && item.eventKey === snapshot.key) {
                    console.log(snapshot.val(), item)
                    timeline.push(item)
                    this.setState({ timeline })
                }

            })
        })
    }


    render() {
        const { list, select, timeline } = this.state;
        console.log('timeline**', timeline)
        return (
            <div className="AttHome">


                <div className="EventName">
                    <div style={{ width: '20%', paddingLeft: '10px' }}>
                        {
                            select ?
                                <Link to={'/home'}>
                                    <Button variant="outlined" size="small" color="primary">
                                        <b>Home</b>
                                    </Button>
                                </Link>
                                :
                                null
                        }
                    </div>
                    <div style={{ width: '60%', textAlign: 'center' }}>
                        <h2 style={{ color: "rgb(34, 157, 179)" }}>
                            All Events
                        </h2>
                    </div>
                    <div style={{ width: '20%', textAlign: 'end', paddingRight: '10px' }}>
                        <Select
                            value={select}
                            onChange={this.handle}
                            displayEmpty
                            name="age"
                            style={{ margin: '25px 5px', width: '70px' }}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='Going'>Going</MenuItem>
                            <MenuItem value='NotGoing'>Not Going</MenuItem>
                        </Select>
                    </div>
                </div>

                {
                    select ?
                        <div className="CardDiv">
                            {timeline.length ?
                                timeline.map((item, index) => {
                                    return <MediaCard eventObj={item} />
                                })
                                :
                                null
                            }
                        </div>
                        :
                        <div className="CardDiv">
                            {list.length ?
                                list.map((item, index) => {
                                    return <MediaCard eventObj={item} />
                                })
                                :
                                null
                            }
                        </div>
                }


            </div >
        )
    }
}

export default AttHome;