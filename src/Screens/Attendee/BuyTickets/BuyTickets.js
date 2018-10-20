import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import '../../../App.css';
import firebase from 'firebase';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';

class BuyTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventKey: '',
            eventData: {},
            list: [],
            eventsArray: [],
            userUID: '',
            selectList: [],
            bookSeats: [],
            yourSeats: [],
            firstNum: '',
            lastNum: ''
        }

        this.select = this.select.bind(this);
        this.submit = this.submit.bind(this);
    }

    logout() {
        localStorage.clear();
        this.props.history.push('/')
    }

    componentWillMount() {
        const { currentuserUID, eventsArray, eventKey } = this.props
        this.setState({
            userUID: currentuserUID,
            eventsArray: eventsArray,
            eventKey: eventKey
        })
    }
    componentDidMount() {
        const { list, bookSeats, eventKey, eventsArray, yourSeats } = this.state;
        let that = this;
        eventsArray.map(item => {
            if (item.eventKey === eventKey) {
                const eventData = item.eventDetail;
                firebase.database().ref(`events/${eventKey}/`).on('value', snapshot => {
                    if (snapshot.val().bookedSeats) {
                        const findBookedSeatsArr = Object.values(snapshot.val().bookedSeats);
                        bookSeats.splice(0);
                        this.setState({ bookSeats })
                        for (var key in findBookedSeatsArr) {
                            const val = Object.values(Object.values(findBookedSeatsArr[key]))
                            for (var i = 0; i < val.length; i++) {
                                bookSeats.push(...val[i])
                                that.setState({ bookSeats })
                            }
                        }
                    }
                })
                this.setState({ eventData: eventData })


                const firstNum = Number(eventData.startNum);
                const lastNum = Number(eventData.endNum);
                this.setState({ firstNum, lastNum })
                if (eventData.startNum) {
                    for (var i = firstNum; i <= lastNum; i++) {
                        if (list.length != (lastNum - firstNum) + 1) {
                            list.push(i)
                            this.setState({ list })
                        }
                    }
                }
                swal({
                    timer: 100,
                    showConfirmButton: false
                })
            }
        })
        if (!list.length) {
            swal.showLoading()
        }
    }

    select(index, element) {
        const { selectList } = this.state;
        const selectIndex = selectList.indexOf(element);
        if (selectList.length < 10) {
            if (selectIndex !== -1) {
                selectList.splice(selectIndex, 1);
                this.setState({ selectList })
            }
            else {
                selectList.push(element);
                this.setState({ selectList })
            }
        }
        else {
            if (selectIndex !== -1) {
                selectList.splice(selectIndex, 1);
                this.setState({ selectList })
            }
            else {
                swal({
                    titleText: 'Select Maximum 10 Tickets'
                })
            }
        }
    }

    submit() {
        const { selectList, eventKey, userUID, bookSeats } = this.state;
        if (selectList.length) {
            const bookList = [...bookSeats, ...selectList]
            firebase.database().ref('events/' + eventKey + '/bookedSeats/' + userUID + '/').push(selectList)
            this.setState({ selectList: [] })

        }
        else {
            swal({
                type: 'error',
                titleText: 'There was no ticket selected'
            })
        }
    }


    render() {
        const { eventData, list, selectList, bookSeats, firstNum, lastNum } = this.state;
        return (
            <div>
                <Navbar />
                <div className="EventName">
                    <div style={{ width: '20%', paddingLeft: '10px' }}>
                        <Link to={'/home'}>
                            <Button variant="outlined" size="small" color="primary">
                                <b>Home</b>
                            </Button>
                        </Link>
                    </div>
                    <div style={{ width: '60%', textAlign: 'center' }}>
                        <h2 style={{ color: "rgb(34, 157, 179)" }}>
                            {eventData.name}
                        </h2>
                    </div>
                    <div style={{ width: '20%', textAlign: 'end', paddingRight: '10px' }}>

                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <img src={eventData.photo} style={{ width: '80%', height: '15%', margin: '10px auto' }} />
                    <div style={{ width: '80%', margin: '0px auto' }}>
                        {list.length ?
                            <h2 style={{ color: '#1e8fa4' }}>Select Seat Number</h2>
                            :
                            null
                        }
                        {list.length ?
                            list.map((item, index) => {
                                return <span>
                                    {
                                        bookSeats.indexOf(item) !== -1 ?
                                            <Button variant="outlined" style={{ margin: '5px' }} size="small" disabled >{item}</Button>
                                            :
                                            <span>
                                                {
                                                    selectList.indexOf(item) !== -1 ?
                                                        <span>
                                                            <Button variant="outlined" style={{ margin: '5px', color: '#a6e22e' }} size="small" onClick={() => this.select(index, item)}>{item}</Button>
                                                        </span>
                                                        :
                                                        <Button variant="outlined" style={{ margin: '5px' }} size="small" color={"primary"} onClick={() => this.select(index, item)}>{item}</Button>
                                                }
                                            </span>
                                    }
                                </span>
                            })
                            :
                            null
                        }
                        <br />
                        {list.length && bookSeats.length !== ((lastNum - firstNum) + 1) ?
                            <Button variant="outlined" style={{ margin: '15px', color: '#a6e22e' }} size="large" onClick={this.submit}>Buy</Button>
                            :
                            <Button variant="outlined" style={{ margin: '15px' }} disabled>Buy</Button>
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
    })
}

export default connect(mapStateToProps, null)(BuyTickets);
