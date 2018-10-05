import React, { Component } from 'react';
import swal from 'sweetalert2';
import '../../../App.css';
import { IconButton } from '@material-ui/core';
import MediaCard from '../EventCards/EventCards';
import firebase from 'firebase';

class OrgHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addForm: true,
            list: []
        }

        this.addForm = this.addForm.bind(this);
    }

    componentWillMount() {
        swal.showLoading()
    }

    addForm() {
        this.props.addform()
    }

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
            swal({
                timer: 10,
                showConfirmButton: false
            })
        })
    }

    render() {
        const { addForm, list } = this.state;
        console.log('List**', list)
        return (
            <div className="OrgHome">
                <div className="OrgHeader">
                    <div>

                    </div>
                    <div>
                        <h2>All Events</h2>
                    </div>
                    <div>
                        <IconButton title="Add Event Form" onClick={this.addForm} style={{ backgroundColor: 'lightblue', float: 'right', margin: '7px', width: '50px', height: '50px', fontSize: '25px', fontWeight: 'bold' }} >+</IconButton>
                    </div>
                </div>
                <div className="CardDiv">
                    {list.length ?
                        list.map((item, index) => {
                            return <MediaCard eventObj={item} />
                        })
                        :
                        null
                    }

                </div>

            </div>
        )
    }
}

export default OrgHome;