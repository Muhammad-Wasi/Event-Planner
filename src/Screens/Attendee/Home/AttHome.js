import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../../App.css';
import swal from 'sweetalert2';
import MediaCard from '../../Organiser/EventCards/EventCards';
import firebase from 'firebase';
import { light } from '@material-ui/core/styles/createPalette';

class AttHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

    }

    // componentDidMount() {
    // const { list } = this.state;
    // firebase.database().ref('Events/').on('child_added', snapshot => {
    //     console.log('OrgHome****', snapshot.key);
    //     console.log('OrgHome****', snapshot.val());
    //     const eventObj = {
    //         eventKey: snapshot.key,
    //         eventDetail: snapshot.val()
    //     }
    //     list.push(eventObj);
    //     this.setState({ list })
    // })
    // }
    componentDidMount() {
        const { list } = this.state;
        firebase.database().ref('Events/').on('child_added', snapshot => {
            console.log('OrgHome****', snapshot.key);
            console.log('OrgHome****', snapshot.val());
            const eventObj = {
                eventKey: snapshot.key,
                eventDetail: snapshot.val()
            }
            list.push(eventObj);
            this.setState({ list })
        })
        list.length &&
            swal({
                timer: 10,
                showConfirmButton: false
            })
    }

    render() {
        const { list } = this.state;
        console.log('List**', list)
        console.log('Hello****')
        return (
            <div className="AttHome">
                <div className="CardDiv">
                    {list.length &&
                        list.map((item, index) => {
                            return <MediaCard eventObj={item} />
                        })
                    }
                    {/* <MediaCard /> */}

                </div>
            </div>
        )
    }
}

export default AttHome;