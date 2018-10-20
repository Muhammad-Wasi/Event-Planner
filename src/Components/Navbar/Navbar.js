import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon, MenuItem } from '@material-ui/core';
import History from '../../History'

class Navbar extends Component {
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

    logout() {
        localStorage.clear();
        History.push('/')
    }

    render() {
        const { userDataObj } = this.state;
        return (
            <div>
                <AppBar position="static" className="HomeBar" style={{ backgroundColor: "rgb(34, 157, 179)", height: '80px' }}>
                    <div className="MainDiv">
                        <div className="image">
                            {userDataObj && userDataObj.photo ?
                                <img alt="User Profile Picture..." src={userDataObj.photo} style={{ width: '60px', height: '60px', borderRadius: '60px' }} />
                                :
                                <img alt="User Profile Picture..." src="https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif" style={{ width: '60px', height: '60px', borderRadius: '60px' }} />
                            }

                        </div>
                        <div className="Heading">
                            <span>Event</span>
                        </div>
                        <div className="Button">
                            <Button color={"secondary"} style={{ backgroundColor: 'white', width: '80px', float: "right", marginRight: '7px' }} onClick={this.logout.bind(this)} >LogOut</Button>
                        </div>
                    </div>
                </AppBar>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.root.user,
    })
}

export default connect(mapStateToProps, null)(Navbar);