import './GalleryItem.css';
import { useState } from 'react';

function GalleryItem(props) {
    // image is displayed default to TRUE
    const [toggled, setToggled] = useState(true);

    const toggleImage = () => {
        setToggled(!toggled);
        console.log('clicked!');
    }
    return (
        <div class="galleryItem">
            {/* if image is toggled, display image */}
            {toggled && <img src={props.path} 
                onClick={toggleImage}
                width="200" height="200" />}
            {/* if image is clicked, display description */}
            {!toggled && <p id="galleryItemDescription" onClick={toggleImage}>{props.description}</p>}
            <p>{props.likes} people love this!</p>
            <button type="button">Love It!</button>
        </div>
    )
}

export default GalleryItem;