// import './GalleryItem.css';
import { useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'

function GalleryItem({image, getGalleryObject}) {
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
            {/* if image is toggled, display image */}
            {toggled && <img src={image.path}
                onClick={toggleImage}
                width="200" height="200" />}
            {/* if image is clicked, display description */}
            {!toggled && <p id="galleryItemDescription" onClick={toggleImage}>{image.description}</p>}
            <p>{image.likes} people love this! </p>
            <button data-id={image.id} onClick={addLike}>Love It!</button>
            <button data-id={image.id} onClick={deleteImage}>Delete</button>
        </div>
    )
}

export default GalleryItem;