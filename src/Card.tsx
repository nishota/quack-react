import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import { Timeline } from './model/timeline';

const styles = () =>({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 200,
        maxheight: 400
    },
}); 

interface Props{
    timeline: Timeline,
    classes: any
}

interface State{
    displayedDate: string | undefined,
}

class MediaCard extends React.Component<Props,State> {
    constructor(props: Props){
        super(props);
        this.state = {
            displayedDate: undefined,
        };
    }

    componentDidMount() {
        this.setState({displayedDate:this.getDateString(this.props.timeline.date)});
    }
    
    render(){
        const {classes, timeline}  = this.props;
        const {media_url, usr , text} = timeline;
        const {displayedDate} = this.state;
        const image = media_url.length > 0 ? 
        <CardMedia
            className={classes.media}
            image={media_url[0]}
            title={usr.id}/>:"";
      
        const usrname = usr.name.length > 10 ? usr.name.slice(10): usr.name;
        return (
        <Card className={classes.root}>
          <CardActionArea>
            {image}
            <CardContent>
              <Typography variant="body1" component="p">
                {text}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {displayedDate} / {usrname}(@{usr.id})
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

    }
    getDateString(date: Date): string {
        const _moment = moment(date);
        return _moment.format('YYYY-MM-DD H:mm:ss')
    }
}

export default withStyles(styles)(MediaCard);