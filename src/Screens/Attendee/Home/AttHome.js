import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Select, MenuItem } from '@material-ui/core';
import '../../../App.css';
import MediaCard from '../../Organiser/EventCards/EventCards';

class AttHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            select: '',
            timeline: [],
            going: [],
            notgoing: []
        }

        this.handle = this.handle.bind(this);
        this.card = this.card.bind(this)
    }


    componentDidMount() {
        this.setState({
            userUID: this.props.currentuserUID,
            list: this.props.eventsArray,
            going: this.props.goingArray,
            notgoing: this.props.notgoingArray
        })
    }

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            this.setState({
                userUID: nextProps.currentuserUID,
                list: nextProps.eventsArray,
                going: nextProps.goingArray,
                notgoing: nextProps.notgoingArray
            })
        }, 1)
    }

    handle(e) {
        const { timeline, select, userUID, list, going, notgoing } = this.state;
        this.setState({ select: e.target.value })
        timeline.splice(0)
        this.setState({ timeline })

        list.map(item => {
            if (e.target.value === "Going" && going.indexOf(item.eventKey) != -1) {
                timeline.push(item)
                this.setState({ timeline })
            }
            else if (e.target.value === "NotGoing" && notgoing.indexOf(item.eventKey) != -1) {
                timeline.push(item)
                this.setState({ timeline })
            }
        })
    }

    card(key) {
        const { list, timeline, select } = this.state;
        const { goingArray, notgoingArray } = this.props;
        timeline.splice(0)
        this.setState({ timeline })

        list.map(item => {
            if (select === "Going" && goingArray.indexOf(item.eventKey) != -1) {
                timeline.push(item)
                this.setState({ timeline })
            }
            else if (select === "NotGoing" && notgoingArray.indexOf(item.eventKey) != -1) {
                timeline.push(item)
                this.setState({ timeline })
            }
        })

    }

    render() {
        const { list, select, timeline } = this.state;
        console.log('List*******', list, list.length)
        return (
            <div className="AttHome" >


                <div className="EventName">
                    <div style={{ width: '20%', paddingLeft: '10px' }}>

                    </div>
                    <div style={{ width: '60%', textAlign: 'center' }}>
                        <h2 style={{ color: "rgb(34, 157, 179)" }}>
                            All Events
                        </h2>
                    </div>
                    <div style={{ width: '20%', textAlign: 'end', paddingRight: '10px' }}>
                        <Select
                            value={select}
                            onChange={this.handle}
                            displayEmpty
                            name="age"
                            style={{ margin: '25px 5px', width: '100px' }}
                        >
                            <MenuItem value=''>
                                <em>All Events</em>
                            </MenuItem>
                            <MenuItem value='Going'>Going</MenuItem>
                            <MenuItem value='NotGoing'>Not Going</MenuItem>
                        </Select>
                    </div>
                </div>

                {
                    select ?
                        <div className="CardDiv" >
                            {
                                timeline.length ?
                                    timeline.map((item, index) => {
                                        return <MediaCard eventObj={item} card={(key) => this.card(key)} />
                                    })
                                    :
                                    <h1>No Data Found</h1>
                            }
                        </div>
                        :
                        <div className="CardDiv">
                            {list.length ?
                                list.map((item, index) => {
                                    return <MediaCard eventObj={item} card={(key) => this.card(key)} />
                                })
                                :
                                <h1>No Data Found</h1>
                            }
                        </div>
                }
            </div >
        )
    }
}


function mapStateToProps(state) {
    return ({
        currentuserUID: state.root.currentuserUID,
        eventsArray: state.root.events,
        goingArray: state.root.going,
        notgoingArray: state.root.notgoing,
    })
}

export default connect(mapStateToProps, null)(AttHome);
