import React, { Component } from 'react';
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
            userRoll: ''
        }

        this.detail = this.detail.bind(this);
    }

    componentWillMount() {
        const userRoll = localStorage.getItem('selected');
        this.setState({ userRoll })
    }

    detail(key) {
        console.log('ID**', key)
        localStorage.setItem('CardID', key)

    }

    render() {
        console.log('MediaCard***', this.props.eventObj)
        const { userRoll } = this.state;
        const { eventObj } = this.props;
        const eventKey = eventObj.eventKey;
        const obj = eventObj.eventDetail
        return (
            <div className="Cards">
                <Card className={'CardBorder MediaCard-card-79'}>
                    <CardActionArea id={eventKey} onClick={e => this.detail(eventKey)}>
                        <CardMedia
                            className={'MediaCard-media-80'}

                            title="Event Picture"
                        />
                        <div >
                            <img title="Event Picture" src={obj.photo} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {obj.name}
                            </Typography>
                            <Typography component="p">
                                {obj.details}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {
                            userRoll === "Attendee" ?
                                <Button id={eventKey} size="small" color="primary">
                                    Buy
                                </Button>
                                :
                                null
                        }
                        <Link to={'/eventdetail'}>
                            <Button id={eventKey} onClick={e => this.detail(eventKey)} size="small" color="primary">
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