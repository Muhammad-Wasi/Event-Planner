import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../../App.css';
import firebase from 'firebase';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { element, array } from 'prop-types';

class BuyTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventKey: '',
            eventData: {},
            list: [],
            selectList: [],
            bookSeats: [],
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
        const user = localStorage.getItem('User');
        const signupData = localStorage.getItem('SignupData');
        const selected = localStorage.getItem('selected');
        const cardID = localStorage.getItem('CardID');

        console.log('user', user)
        // this.props.changeStateToReducer(userDataObj);
        !user && !signupData && !selected && !cardID && this.props.history.push('/')
    }

    componentDidMount() {
        const { list, bookSeats } = this.state;
        const eventKey = localStorage.getItem('CardID');
        this.setState({ eventKey });
        console.log('eventKey***', eventKey)
        firebase.database().ref('Events/' + eventKey + '/').on('value', snapshot => {
            console.log('Value', snapshot.val())
            if (snapshot.val().BookedSeats) {
                const findBookedSeatsArr = Object.values(snapshot.val().BookedSeats);
                console.log('findBookedSeatsArr', findBookedSeatsArr, findBookedSeatsArr.length)
                bookSeats.splice(0);
                this.setState({ bookSeats })
                for (var key in findBookedSeatsArr) {
                    const val = Object.values(Object.values(findBookedSeatsArr[key]))
                    console.log('Val**', val, val.length, bookSeats.length)
                    for (var i = 0; i < val.length; i++) {
                        console.log('VAl***', val[i])
                        bookSeats.push(...val[i])
                    }
                }
            }
            this.setState({ eventData: snapshot.val() })


            const firstNum = Number(snapshot.val().startNum);
            const lastNum = Number(snapshot.val().endNum);
            this.setState({ firstNum, lastNum })
            if (snapshot.val().startNum) {
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
        })
        if (!list.length) {
            swal.showLoading()
        }
        // console.log('eventData.startNum', eventData.startNum)
    }

    select(index, element) {
        const { selectList } = this.state;
        console.log('index***', index)
        console.log('element***', element)
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
        const { selectList, eventKey } = this.state;
        const userUID = localStorage.getItem('UserUID');
        if (selectList.length) {
            // const bookList = [...bookSeats, ...selectList]
            // console.log('bookSeats***', bookSeats)
            firebase.database().ref('Events/' + eventKey + '/BookedSeats/' + userUID + '/').push(selectList)
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
        console.log("************", bookSeats)
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
                                                        <Button variant="outlined" style={{ margin: '5px', color: '#a6e22e' }} size="small" onClick={() => this.select(index, item)}>{item}</Button>
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
                        {list.length && list.length != lastNum - firstNum + 1 ?
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

export default BuyTickets;