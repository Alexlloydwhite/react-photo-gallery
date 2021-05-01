import './GalleryItem.css';
import { useState } from 'react';
import axios from 'axios';

function GalleryItem(props) {
    // image is displayed default to TRUE
    const [toggled, setToggled] = useState(true);

    const toggleImage = () => {
        setToggled(!toggled);
        console.log('clicked!');
    }

    const addLike = (event) => {
        let id = event.currentTarget.dataset.id;
        console.log(id);

    axios({
        method: 'PUT',
        url: `/gallery/${id}`
    })
        .then(response => {
            console.log(response);
            props.getGalleryObject();
            
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="galleryItem">
            {/* if image is toggled, display image */}
            {toggled && <img src={props.path}
                onClick={toggleImage}
                width="200" height="200" />}
            {/* if image is clicked, display description */}
            {!toggled && <p id="galleryItemDescription" onClick={toggleImage}>{props.description}</p>}
            <p>{props.likes} people love this! </p>
            <button data-id={props.id} onClick={addLike}>Love It!</button>
        </div>
    )
}

export default GalleryItem;