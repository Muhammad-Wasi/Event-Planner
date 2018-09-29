import React, { Component } from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon } from '@material-ui/core';
import '../../App.css';
// import firebase from 'firebase';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { changeState } from '../../Store/Action/action';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDataObj : {}
        }

    }
    componentWillMount() {
        const userDataObj = JSON.parse(localStorage.getItem("UserDataObj"));
        this.setState({ userDataObj });
        console.log("userDataObj", userDataObj);
        // this.props.changeStateToReducer(userDataObj);
           !userDataObj.userUID && this.props.history.push('/')
    }

    logout() {
        localStorage.removeItem('UserDataObj')
        this.props.history.push('/')
    }

    render() {
        const { userDataObj } = this.state;
        return (
            <div style={{ textAlign: "center" }}>
                {
                    userDataObj.photo &&
                        <div style={{ float: 'left', margin: '7px' }}>
                            <img alt="User Profile Picture..." src={userDataObj.photo} style={{ width: '60px', height: '60px', borderRadius: '60px' }} />
                        </div>

                }
                <span style={{ color: "darkcyan", textAlign: "center", fontSize: '26px', fontWeight: 'bold', marginTop: '15px' }}>Hello Home</span>
                <Button style={{ backgroundColor: 'rgb(238, 149, 149)', float: "right", margin: '7px' }} color={"secondary"} onClick={this.logout.bind(this)} >LogOut</Button>
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
