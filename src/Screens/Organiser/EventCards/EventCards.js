import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { wrap } from 'module';
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

        this.detail = this.detail.bind(this);
    }
    // function MediaCard(props) {
    // console.log('Props*****', props);
    // const { classes } = props;

    detail(key) {
        console.log('ID**', key)
    }

    render() {
        console.log('MediaCard***', this.props.eventObj)
        const { eventObj } = this.props;
        const eventKey = eventObj.eventKey;
        const obj = eventObj.eventDetail
        return (
            <div className="Cards">
                <Card className={'MediaCard-card-79'}>
                    <CardActionArea id={eventKey} onClick={e => this.detail(eventKey)}>
                        <CardMedia
                            className={'MediaCard-media-80'}
                            image={obj.photo}
                            title="Event Picture"
                        />
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
                        <Button size="small" color="primary">
                            Share
                    </Button>
                        <Button size="small" color="primary">
                            Learn More
                    </Button>
                    </CardActions>
                </Card>
            </div>


            // <div className="Cards">
            //     <Card className={'MediaCard-card-79'}>
            //         <CardActionArea >
            //             <CardMedia
            //                 className={'MediaCard-media-80'}
            //                 title="Event Picture"
            //                 src="aadas.jpg"
            //             />
            //             <CardContent>
            //                 <Typography gutterBottom variant="headline" component="h2">
            //                     asdasdasdasd
            //                 </Typography>
            //                 <Typography component="p">
            //                     "a,sdhashfas dasdasda sddddddd ddddddd dddddddd ddddddddd ddddddddd ddddddddd ddddsdkh afldjsf sdbfmsdfb sd,mfv,as dhgf;sdhfg ;sdkjgf"
            //                      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging; across all continents except Antarctica  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
            //                 </Typography>
            //             </CardContent>
            //         </CardActionArea>
            //         <CardActions>
            //             <Button size="small" color="primary">
            //                 Share
            //         </Button>
            //             <Button size="small" color="primary">
            //                 Learn More
            //         </Button>
            //         </CardActions>
            //     </Card>
            // </div>

        );
    }
}
// MediaCard.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(MediaCard);

// export default MediaCard;