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
            interested: props.interested,
            key: props.eventObj.eventKey,
            going: false
        }
        this.detail = this.detail.bind(this);
        this.interested = this.interested.bind(this);

    }

    interested(key) {
        console.log('ID***', key)
        const userUID = localStorage.getItem('UserUID');
        firebase.database().ref('UserTimeline/' + userUID + '/Interested/' + key + '/').push(true)
    }

    detail(id) {
        localStorage.setItem('CardID', id)
    }

    componentWillMount() {
        const userRoll = localStorage.getItem('selected');
        this.setState({ userRoll })
    }

    componentDidMount() {
        const { key, interested } = this.state;
        console.log("**************", interested)
        // interested.map((item) => {
        //     return console.log('Match*************', item)
        // })
    }
    render() {
        console.log('MediaCard***', this.props.eventObj)
        const { userRoll } = this.state;
        const { eventObj } = this.props;
        const eventKey = eventObj.eventKey;
        const obj = eventObj.eventDetail
        const { going } = this.state;
        return (
            <div className="Cards">
                <Card className={'CardBorder MediaCard-card-79'}>
                    <CardActionArea id={eventKey}>
                        <CardMedia
                            className={'MediaCard-media-80'}
                            style={{ height: '0px' }}
                            title="Event Picture"
                        />
                        <div >
                            <img title="Event Picture" src={obj.photo} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {obj.name}
                                {
                                    userRoll === "Attendee" ?
                                        <span style={{ float: 'right' }}>
                                            {/* {
                                                interested.map((item) => {
                                                    return <span> */}
                                            {/* {
                                                going ?
                                                    <span>Interested</span>
                                                    :
                                                    <svg onClick={() => this.interested(eventKey)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                            } */}
                                            {/* </span>
                                                })
                                            } */}
                                        </span>

                                        :
                                        null
                                }
                            </Typography>
                            <Typography component="p">
                                {obj.details}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {
                            userRoll === "Attendee" ?
                                <Link to={'/buytickets'}>
                                    <Button variant="outlined" id={eventKey} size="small" color="primary" onClick={() => {localStorage.setItem('CardID', eventKey)}}>
                                        Buy
                                                </Button>
                                </Link>
                                :
                                null
                        }
                        <Link to={'/eventdetail'}>
                            <Button variant="outlined" id={eventKey} onClick={e => this.detail(eventKey)} size="small" color="primary">
                                Learn More
                            </Button>
                        </Link>
                        {
                            obj.selected === 'Paid' ?
                                <span><b>Ticket:</b> Rs{obj.price}</span>
                                :
                                <span><b>Ticket:</b> Free</span>
                        }
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default withStyles(styles)(MediaCard);