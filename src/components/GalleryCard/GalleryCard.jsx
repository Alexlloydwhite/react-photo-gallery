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

const useStyles = makeStyles({

})

function GalleryItem({ image, getGalleryObject }) {

    const classes = useStyles();

    // image is displayed default to TRUE
    const [toggled, setToggled] = useState(true);

    const toggleImage = () => {
        setToggled(!toggled);
        console.log('clicked!');
    }

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
            <Card>
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
                        <DeleteForeverIcon />
                    </IconButton>
                </CardActions>
            </Card>

        </div>
    )
}

export default GalleryItem;

// {/* if image is toggled, display image */}
// {toggled && <img src={image.path}
// onClick={toggleImage}
// width="200" height="200" />}
// {/* if image is clicked, display description */}
// {!toggled && <p id="galleryItemDescription" onClick={toggleImage}>{image.description}</p>}


// <p>{image.likes} people love this! </p>
// <button data-id={image.id} onClick={addLike}>Love It!</button>
// <button data-id={image.id} onClick={deleteImage}>Delete</button>