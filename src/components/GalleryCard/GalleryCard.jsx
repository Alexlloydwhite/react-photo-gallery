// import './GalleryItem.css';
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
            <Card elevation={1}>
                <CardContent>
                    <Typography color="Primary">
                        {image.likes} people love this!
                    </Typography>
                    <CardMedia>
                        <img
                            src={image.path}
                            height="200"
                            width="200"
                        />
                    </CardMedia>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton>
                        <DeleteForeverIcon
                            data-id={image.id}
                            onClick={deleteImage}
                        />
                    </IconButton>
                    <IconButton>
                        <FavoriteIcon
                            data-id={image.id}
                            onClick={addLike}
                        />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                    >
                        <ExpandMoreIcon />
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