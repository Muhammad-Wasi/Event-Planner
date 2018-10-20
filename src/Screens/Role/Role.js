import React, { Component } from 'react';
import { roleAction } from '../../Store/Action/action';
import { connect } from 'react-redux';
import { AppBar, Button } from '@material-ui/core';
import swal from 'sweetalert2';
import '../../App.css';
import firebase from 'firebase';


class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
        }
    }

    submitRoll() {
        const { role } = this.state;
        const { user } = this.props;
        console.log('user***', user)
        if (role) {
            user.role = role;
            this.props.sendingRole(user)
        }
        else {
            swal({
                title: "error",
                text: "Select Roll",
                type: 'error'
            })
        }
    }
    render() {
        const { role } = this.state;
        return (
            <div>
                <AppBar position={"static"} style={{ backgroundColor: 'rgb(34, 157, 179)' }} className="AppBar">
                    Roll
            </AppBar>
                <div className="Authentication" style={{ marginTop: '5%' }}>
                    <br />
                    <label className="Radio">
                        <input type="radio" name="panel" value="Organiser" checked={role === 'Organiser'} onChange={(e) => this.setState({ role: e.target.value })} />
                        Organiser
                    </label>
                    <label className="Radio">
                        <input type="radio" name="panel" value="Attendee" checked={role === 'Attendee'} onChange={(e) => this.setState({ role: e.target.value })} />
                        Attendee
                    </label>
                    <br />
                    <br />
                    <Button style={{ color: 'rgb(34, 157, 179)' }} onClick={this.submitRoll.bind(this)}>Submit</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        user: state.root.user
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        sendingRole: (userDetails) => {
            dispatch(roleAction(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Role);



