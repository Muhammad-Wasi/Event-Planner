import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon, MenuItem } from '@material-ui/core';
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
        const userDataObj = JSON.parse(localStorage.getItem('SignupData'));
        this.setState({ userDataObj })
        const user = localStorage.getItem('User');
        // this.props.changeStateToReducer(userDataObj);
        !user && this.props.history.push('/')
    }

    componentDidMount() {
        // const userDataObj = JSON.parse(localStorage.getItem('SignupData'));
        // this.setState({ userDataObj })
        const userUID = localStorage.getItem('UserUID')
        console.log('userUID', userUID)
        var select = localStorage.getItem("selected");
        console.log('select', select, !!select)
        if (select) {
            this.setState({ selected: select })
        }
        else {
            firebase.database().ref('Users/' + userUID + '/').on('child_added', (snapshot) => {
                console.log('snapshot.key', snapshot.key);
                console.log('snapshot.val()', snapshot.val())
                const userDataObj = localStorage.setItem('SignupData', JSON.stringify(snapshot.val()));
                this.setState({ userDataObj })
                localStorage.setItem("selected", snapshot.val().selected)
                this.setState({ selected: snapshot.val().selected })
            })
        }
    }
    logout() {
        localStorage.clear();
        this.props.history.push('/')
    }

    addform = () => {
        this.props.history.push('/eventForm');
    }

    render() {
        const { userDataObj, selected } = this.state;
        console.log(userDataObj)
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
                <div>
                    {selected === 'Organiser' &&
                        <OrgHome addform={this.addform} />
                    }
                    {selected === "Attendee" &&
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
