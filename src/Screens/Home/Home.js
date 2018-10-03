import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../App.css';
import firebase from 'firebase';
import OrgHome from '../Organiser/Home/OrgHome';
import AttHome from '../Attendee/Home/AttHome';
import swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { changeState } from '../../Store/Action/action';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDataObj: {}
        }

    }
    componentWillMount() {
        const user = localStorage.getItem('User');
        // this.props.changeStateToReducer(userDataObj);
        !user && this.props.history.push('/')
        swal.showLoading();
    }

    componentDidMount() {
        var userUID = localStorage.getItem('UserUID');
        console.log('userUID', userUID)
        var select = localStorage.getItem("selected");
        console.log('select', select, !!select)
        if (select) {
            this.setState({ selected: select })
            swal({
                showConfirmButton: false,
                timer: 10
            })
        }
        else {
            firebase.database().ref('Users/' + userUID + '/').on('child_added', (snapshot) => {
                console.log('snapshot.key', snapshot.key);
                console.log('snapshot.val()', snapshot.val())
                localStorage.setItem("selected", snapshot.val().selected)
                this.setState({ selected: snapshot.val().selected })
                swal({
                    showConfirmButton: false,
                    timer: 100
                })
            })
        }
    }
    logout() {
        localStorage.removeItem('User');
        this.props.history.push('/')
    }

    addform = () => {
        this.props.history.push('/eventForm');
    }

    render() {
        const { userDataObj, selected } = this.state;
        return (
            <div>

                <AppBar position="static" className="HomeBar" style={{ backgroundColor: "rgb(34, 157, 179)", height: '80px' }}>
                    <div className="MainDiv">
                        {/* {userDataObj &&
                            userDataObj.photo && */}
                        <div className="image">
                            <img alt="User Profile Picture..." src={userDataObj.photo} style={{ width: '60px', height: '60px', borderRadius: '60px' }} />
                        </div>
                        {/* } */}
                        <div className="Heading">
                            <span>Event</span>
                            {/* {selected === 'Organiser' &&
                                <span>Hello Organiser</span>
                            }
                            {selected === "Attendee" &&
                                <span>Hello Attendee</span>
                            } */}
                        </div>
                        <div className="Button">
                            <Button color={"secondary"} style={{ backgroundColor: 'white', width: '80px', float: "right", marginRight: '7px' }} onClick={this.logout.bind(this)} >LogOut</Button>
                        </div>
                    </div>
                </AppBar>
                <div>
                    {/* {selected === 'Organiser' && */}
                    {/* // <h1>Hello Organiser</h1> */}
                    <OrgHome addform={this.addform} />
                    {/* } */}
                    {selected === "Attendee" &&
                        // <h1>Hello Attendee</h1>
                        <AttHome />
                    }
                </div>
            </div>
        )
    }

}
export default Home;

// function mapStateToProps(state) {
//     return ({
//         obj: console.log(state.rootReducer)
//     })
// }

// function mapDispatchToProps(dispatch) {
//     return ({
//         changeStateToReducer: (userDataObj) => {
//             dispatch(changeState(userDataObj));
//         }
//     })
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
