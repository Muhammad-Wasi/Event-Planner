import React, { Component } from 'react';
// import { signinAction, facebooksigninAction, googlesigninAction } from '../../Store/Action/action';
import { connect } from 'react-redux';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon, MenuItem } from '@material-ui/core';
import '../../App.css';
import firebase from 'firebase';
import OrgHome from '../Organiser/Home/OrgHome';
import AttHome from '../Attendee/Home/AttHome';
import Role from '../Role/Role'
import swal from 'sweetalert2';
import { stat } from 'fs';
import Navbar from '../../Components/Navbar/Navbar';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDataObj: null
        }

    }

    componentWillReceiveProps(nextprops) {
        this.setState({ userDataObj: nextprops.user })
    }

    componentDidMount() {
        this.setState({ userDataObj: this.props.user })
    }

    addform = () => {
        this.props.history.push('/eventForm');
    }

    render() {
        const { userDataObj } = this.state;
        return (
            <div>
                <Navbar />
                <div>
                    {userDataObj && userDataObj.role === 'Organiser' &&
                        <OrgHome addform={this.addform} />
                    }
                    {userDataObj && userDataObj.role === "Attendee" &&
                        <AttHome />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.root.user,
    })
}

export default connect(mapStateToProps, null)(Home);
