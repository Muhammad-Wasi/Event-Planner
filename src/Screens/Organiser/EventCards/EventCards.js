import React, { Component } from 'react';
import { connect } from 'react-redux';
import { eventdetailAction, going, notgoing, changeCondition } from '../../../Store/Action/action';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../../App.css';

const styles = {
    card: {
        maxWidth: 335,
    },
    media: {
        height: 135,
    },
};

class MediaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            eventKey: props.eventObj.eventKey,
            going: [],
            notgoing: [],
            soldAllTickets: [],
            bookSeats: [],
            userUID: props.currentuserUID,
            condition: props.condition
        }
        this.detail = this.detail.bind(this);
        this.going = this.going.bind(this);
        this.notGoing = this.notGoing.bind(this);
        this.removegoing = this.removegoing.bind(this);
        this.removenotGoing = this.removenotGoing.bind(this);

    }

    going(key) {
        const { userUID, condition } = this.state;
        firebase.database().ref('userTimeline/' + userUID + '/' + key + '/').set('Going')
        this.props.changeCondition(!condition)
    }


    notGoing(key) {
        const { userUID, condition } = this.state;
        firebase.database().ref('userTimeline/' + userUID + '/' + key + '/').set('NotGoing')
        this.props.changeCondition(!condition)
    }

    removegoing(key) {
        const { userUID, going, condition } = this.state;
        firebase.database().ref('userTimeline/' + userUID + '/' + key + '/').remove()
        const index = going.indexOf(key)
        going.splice(index, 1)
        this.props.goingEvents(going)
        this.setState({ going })
        this.props.card(key)
        this.props.changeCondition(!condition)
    }

    removenotGoing(key) {
        const { userUID, notgoing, condition } = this.state;
        firebase.database().ref('userTimeline/' + userUID + '/' + key + '/').remove()
        const index = notgoing.indexOf(key)
        notgoing.splice(index, 1)

        this.props.notgoingEvents(notgoing)
        this.setState({ notgoing })
        this.props.card(key)
        this.props.changeCondition(!condition)
    }

    detail(id) {
        this.props.detailEventKey(id)
    }

    componentWillReceiveProps(props) {
        this.setState({
            going: props.goingArray,
            notgoing: props.notgoingArray,
            condition: props.condition
        })
    }

    componentDidMount() {
        const { userUID, eventKey, bookSeats, soldAllTickets } = this.state;
        const { goingArray, notgoingArray } = this.props;
        let that = this;
        this.setState({
            going: goingArray,
            notgoing: notgoingArray
        })
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

            const firstNum = Number(snapshot.val().startNum);
            const lastNum = Number(snapshot.val().endNum);
            if (lastNum - firstNum + 1 == bookSeats.length) {
                soldAllTickets.push(eventKey);
                this.setState({ soldAllTickets })
            }
        })

    }
    render() {
        const { going, notgoing, soldAllTickets } = this.state;
        const { eventObj, user } = this.props;
        let role = user.role;
        const eventKey = eventObj.eventKey;
        const obj = eventObj.eventDetail
        return (
            <div className="Cards">
                <Card className={'CardBorder MediaCard-card-79'}>
                    <CardActionArea id={eventKey}>
                        <CardMedia
                            className={'MediaCard-media-80'}
                            style={{ height: '0px' }}
                            image='null'
                            title="Event Picture"
                        />
                        <div style={{ position: "relative" }}>
                            <img title="Event Picture" src={obj.photo} style={{ width: '100%', height: '160px' }} />
                            <div style={{ position: "absolute", top: '8px', left: '10px', color: 'white', fontSize: '16px' }}>
                                {
                                    obj.selected === 'Paid' ?
                                        <span><b>Ticket:</b> Rs{obj.price}</span>
                                        :
                                        <span><b>Ticket:</b> Free</span>
                                }
                            </div>
                        </div>
                        <CardContent style={{paddingLeft: '20px', paddingRight: '20px', height: '165px'}}>
                            <Typography style={{ textAlign: 'center', margin: '0px auto' }} gutterBottom variant="headline" component="h2">
                                {obj.name}
                            </Typography>
                            {
                                role === "Attendee" ?
                                    <Typography component="p">
                                        <div style={{ width: '55%', float: "left", height: '100px', overflow: 'hidden' }}>
                                            {obj.details}
                                        </div>
                                        <div style={{ width: '45%', float: "left" }}>
                                            <span style={{ float: 'right' }}>
                                                {
                                                    going.indexOf(eventKey) === -1 && notgoing.indexOf(eventKey) === -1 ?
                                                        <span>
                                                            <Button style={{ margin: '5px' }} size="small" variant="outlined" color={"primary"} onClick={() => this.notGoing(eventKey)}>Not Going</Button>
                                                            <br />
                                                            <Button style={{ marginLeft: '18px' }} size="small" variant="outlined" color={"primary"} onClick={() => this.going(eventKey)}>Going</Button>
                                                        </span>
                                                        :
                                                        <span>
                                                            {
                                                                notgoing.indexOf(eventKey) !== -1 ?
                                                                    <Button size="small" variant="outlined" color={"secondary"} onClick={() => this.removenotGoing(eventKey)}>Not Going</Button>
                                                                    :
                                                                    <Button size="small" variant="outlined" style={{ color: '#a6e22e' }} onClick={() => this.removegoing(eventKey)}>Going</Button>
                                                            }
                                                        </span>
                                                }
                                            </span>
                                        </div>
                                    </Typography>
                                    :
                                    < Typography style={{ width: '100%', height: '100px', overflow: 'hidden' }} component="p">
                                        {obj.details}
                                    </Typography>

                            }
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ margin: '0px auto' }}>
                        {
                            role === "Attendee" ?
                                <span>
                                    {
                                        soldAllTickets.indexOf(eventKey) !== -1 ?
                                            <Button variant="outlined" disabled>Sold</Button>
                                            :
                                            <Link to={'/buytickets'}>
                                                <Button variant="outlined" id={eventKey} size="small" color="primary" onClick={e => this.detail(eventKey)}>
                                                    Buy
                                                </Button>
                                            </Link>
                                    }
                                </span>
                                :
                                null
                        }
                        <Link to={'/eventdetail'}>
                            <Button variant="outlined" id={eventKey} onClick={e => this.detail(eventKey)} size="small" color="primary">
                                Learn More
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </div >

        );
    }
}

function mapStateToProps(state) {
    return ({
        currentuserUID: state.root.currentuserUID,
        goingArray: state.root.going,
        notgoingArray: state.root.notgoing,
        user: state.root.user,
        condition: state.root.condition,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        detailEventKey: (eventkey) => {
            dispatch(eventdetailAction(eventkey));
        },
        goingEvents: (goingArr) => {
            dispatch(going(goingArr));
        },
        notgoingEvents: (notgoingArr) => {
            dispatch(notgoing(notgoingArr));
        },
        changeCondition: (condition) => {
            dispatch(changeCondition(condition));
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MediaCard));
