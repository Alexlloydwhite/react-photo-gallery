import { useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';

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

    const classes = useStyles();

    // press button, show description!
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addLike = (event) => {
        let id = event.currentTarget.dataset.id;
        console.log('Clicked like:', id);

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

    const deleteImage = (event) => {
        let id = event.currentTarget.dataset.id;
        console.log('clicked delete:', id);

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
                <CardContent>
                    <img
                        className={classes.media}
                        src={image.path}
                    />
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        data-id={image.id}
                        onClick={deleteImage}
                    >
                        <DeleteForeverIcon color="primary"/>
                    </IconButton>
                    <IconButton
                        className={classes.icon}
                        data-id={image.id}
                        onClick={addLike}
                    >
                        <FavoriteIcon color="secondary"/>
                    </IconButton>
                    <Typography color="textPrimary" gutterBottom> 
                        {image.likes} people love this!
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                    >
                        <ExpandMoreIcon color="primary"/>
                    </IconButton>
                </CardActions>
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