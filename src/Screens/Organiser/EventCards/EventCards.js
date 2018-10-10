import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../../App.css';
import zIndex from '@material-ui/core/styles/zIndex';

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
            userRoll: '',
            eventKey: props.eventObj.eventKey,
            going: [],
            notgoing: [],
            soldAllTickets: [],
            bookSeats: []
        }
        this.detail = this.detail.bind(this);
        this.going = this.going.bind(this);
        this.notGoing = this.notGoing.bind(this);
        this.removegoing = this.removegoing.bind(this);
        this.removenotGoing = this.removenotGoing.bind(this);



    }

    going(key) {
        const { userUID } = this.state;
        console.log('going***', key)
        firebase.database().ref('UserTimeline/' + userUID + '/' + key + '/').set('Going')
    }


    notGoing(key) {
        const { userUID } = this.state;
        console.log('notGoing***', key)
        firebase.database().ref('UserTimeline/' + userUID + '/' + key + '/').set('NotGoing')
    }

    removegoing(key) {
        const { userUID, going } = this.state;
        firebase.database().ref('UserTimeline/' + userUID + '/' + key + '/').remove()
        const index = going.indexOf(key)
        going.splice(index, 1)
        this.setState({ going })
    }

    removenotGoing(key) {
        const { userUID, notgoing } = this.state;
        firebase.database().ref('UserTimeline/' + userUID + '/' + key + '/').remove()
        const index = notgoing.indexOf(key)
        notgoing.splice(index, 1)
        this.setState({ notgoing })
    }

    detail(id) {
        localStorage.setItem('CardID', id)
    }

    componentWillMount() {
        const userUID = localStorage.getItem('UserUID');
        const userRoll = localStorage.getItem('selected');
        this.setState({ userRoll, userUID })
    }

    componentDidMount() {
        const { userUID, going, notgoing, eventKey, bookSeats, soldAllTickets } = this.state;
        firebase.database().ref('UserTimeline/' + userUID + '/').on('child_added', snapshot => {
            console.log('SNapshot', snapshot)
            console.log('Val***', snapshot.val())
            console.log('Key***', snapshot.key)
            if (snapshot.val() === 'Going') {
                going.push(snapshot.key)
                this.setState({ going })
            }
            else if (snapshot.val() === 'NotGoing') {
                notgoing.push(snapshot.key)
                this.setState({ notgoing })
            }
        })


        firebase.database().ref('Events/' + eventKey + '/').on('value', snapshot => {
            if (snapshot.val().BookedSeats) {
                const findBookedSeatsArr = Object.values(snapshot.val().BookedSeats);
                bookSeats.splice(0);
                this.setState({ bookSeats })
                for (var key in findBookedSeatsArr) {
                    const val = Object.values(Object.values(findBookedSeatsArr[key]))
                    for (var i = 0; i < val.length; i++) {
                        console.log('VAl***', val[i])
                        bookSeats.push(...val[i])
                    }
                }
            }

            const firstNum = Number(snapshot.val().startNum);
            const lastNum = Number(snapshot.val().endNum);
            console.log('******', lastNum - firstNum + 1, bookSeats, bookSeats.length)
            if (lastNum - firstNum + 1 == bookSeats.length) {
                console.log('bookSeats***', eventKey)
                soldAllTickets.push(eventKey);
                this.setState({ soldAllTickets })
            }
        })



    }
    render() {
        console.log('MediaCard***', this.props.eventObj)
        const { userRoll, going, notgoing, soldAllTickets } = this.state;
        const { eventObj } = this.props;
        const eventKey = eventObj.eventKey;
        const obj = eventObj.eventDetail
        console.log('Going', going);
        console.log('NotGoing', notgoing);
        return (
            <div className="Cards">
                <Card className={'CardBorder MediaCard-card-79'}>
                    <CardActionArea id={eventKey}>
                        <CardMedia
                            className={'MediaCard-media-80'}
                            style={{ height: '0px' }}
                            // image={obj.photo}
                            title="Event Picture"
                        />
                        <div style={{ position: "relative" }}>
                            <img title="Event Picture" src={obj.photo} style={{ width: '100%', height: '70%' }} />
                            <div style={{ position: "absolute", top: '8px', left: '10px', color: 'white', fontSize: '16px' }}>
                                {
                                    obj.selected === 'Paid' ?
                                        <span><b>Ticket:</b> Rs{obj.price}</span>
                                        :
                                        <span><b>Ticket:</b> Free</span>
                                }
                            </div>
                        </div>
                        <CardContent>
                            <Typography style={{ textAlign: 'center' }} gutterBottom variant="headline" component="h2">
                                {obj.name}
                            </Typography>
                            <Typography component="p">
                                <div style={{ width: '55%', float: "left", height: '100px', overflow: 'hidden' }}>
                                    {obj.details}
                                </div>
                                <div style={{ width: '45%', float: "left" }}>
                                    {
                                        userRoll === "Attendee" ?
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

                                            :
                                            null
                                    }
                                </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ margin: '0px auto' }}>
                        {
                            userRoll === "Attendee" ?
                                <span>
                                    {
                                        soldAllTickets.indexOf(eventKey) !== -1 ?
                                            <Button variant="outlined" disabled>Sold</Button>
                                            :
                                            <Link to={'/buytickets'}>
                                                <Button variant="outlined" id={eventKey} size="small" color="primary" onClick={() => { localStorage.setItem('CardID', eventKey) }}>
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
                        {/* {
                            obj.selected === 'Paid' ?
                                <span>Rs{obj.price}/Ticket</span>
                                :
                                <span>Free</span>
                        } */}
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default withStyles(styles)(MediaCard);