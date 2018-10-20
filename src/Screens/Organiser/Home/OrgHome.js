import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../App.css';
import { IconButton } from '@material-ui/core';
import MediaCard from '../EventCards/EventCards';

class OrgHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userUID: '',
            addForm: true,
            list: []
        }

        this.addForm = this.addForm.bind(this);
    }

    componentDidMount() {
        this.setState({ userUID: this.props.currentuserUID, list: this.props.eventsArray })
    }

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            this.setState({ userUID: nextProps.currentuserUID, list: nextProps.eventsArray })
        }, 1)

    }
    addForm() {
        this.props.addform()
    }

    render() {
        const { addForm, list, userUID } = this.state;
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
                            if (item.eventDetail.currentuserUID === userUID) {
                                return <MediaCard key={item.eventKey} eventObj={item} />
                            }
                        })
                        :
                        null
                    }

                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return ({
        currentuserUID: state.root.currentuserUID,
        eventsArray: state.root.events,

    })
}


export default connect(mapStateToProps, null)(OrgHome);
