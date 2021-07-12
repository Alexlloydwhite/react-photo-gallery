import { useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';

// custom styles 
const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    media: {
        height: 300,
        width: 300,
    }
}))

function GalleryItem({ image, getGalleryObject }) {
    // hook to use custom styles to manipulate theme
    const classes = useStyles();

    // press button, show description!
    const [expanded, setExpanded] = useState(false)
    // click handler to toggle description, default is false so on click sets to true
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // router to add like
    const addLike = (event) => {
        // grab ID of click and store in variable
        let id = event.currentTarget.dataset.id;
        console.log('Clicked like:', id);
        // PUT router to adjust like count on server
        axios({
            method: 'PUT',
            url: `/gallery/${id}`
        })
            .then(response => {
                console.log('response from server (add like)', response);
                // refresh state
                getGalleryObject();

            })
            .catch(error => {
                console.log('error on add like request:', error);
            })
    }
    // router to delete an image card
    const deleteImage = (event) => {
        // grab ID of click and store in variable 
        let id = event.currentTarget.dataset.id;
        console.log('clicked delete:', id);
        // DELETE router to delete from DB
        axios({
            method: 'DELETE',
            url: `/gallery/${id}`
        })
            .then(response => {
                console.log('response from server (delete item)', response);
                // refresh state
                getGalleryObject();
            })
            .catch(error => {
                console.log('error on delete image request:', error);
            })
    }

    return (
        <div>
            <Card elevation={2}>
                {/* Top of card, shows image */}
                <CardContent>
                    <img
                        className={classes.media}
                        src={image.path}
                    />
                </CardContent>
                {/*  bottom of card, icons to like, delete, or toggle description */}
                <CardActions disableSpacing>
                    {/* delete icon */}
                    <IconButton
                        data-id={image.id}
                        onClick={deleteImage}
                    >
                        <DeleteForeverIcon color="primary"/>
                    </IconButton>
                    {/* like icon */}
                    <IconButton
                        className={classes.icon}
                        data-id={image.id}
                        onClick={addLike}
                    >
                        <FavoriteIcon color="secondary"/>
                    </IconButton>
                    {/* shows like count */}
                    <Typography color="textPrimary" gutterBottom> 
                        {image.likes} people love this!
                    </Typography>
                    {/* toggle description icon */}
                    <IconButton
                        // toggle state for description view 
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                    >
                        <ExpandMoreIcon color="primary"/>
                    </IconButton>
                </CardActions>
                {/* image description info goes here */}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {image.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>

        </div>
    )
}

export default GalleryItem;