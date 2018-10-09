import React, { Component } from 'react';
import '../../../App.css';
import swal from 'sweetalert2';
import MediaCard from '../../Organiser/EventCards/EventCards';
import firebase from 'firebase';

class AttHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            interested: []
        }
    }

    componentWillMount() {
        swal.showLoading()
    }

    componentDidMount() {
        const { list, interested } = this.state;
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

        const userUID = localStorage.getItem('UserUID');
        firebase.database().ref('UserTimeline/' + userUID + '/Interested/').on('child_added', snapKey => {
            console.log('InterestedKeys****', snapKey.key)
            interested.push(snapKey.key)
            this.setState({ interested })
        })
    }

    render() {
        const { list, interested } = this.state;
        console.log('List**', list)
        console.log('Hello****')
        return (
            <div className="AttHome">
                <div className="CardDiv">
                    {list.length ?
                        list.map((item, index) => {
                            return <MediaCard interested={interested} eventObj={item} />
                        })
                        :
                        null
                    }

                </div>
            </div>
        )
    }
}

export default AttHome;