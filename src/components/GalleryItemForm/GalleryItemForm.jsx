import react, { useState } from 'react';
import axios from 'axios';

function GalleryItemForm({ getGalleryObject }) {
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');

    const addGalleryImage = () => {
        // wrapping new image into object

        const imageToAdd = {
            path: path,
            description: description
        } // end imageToAdd

        // fact checking
        console.log('imageToAdd is:', imageToAdd);

        // post route for adding new item
        axios({
            method: 'POST',
            url: '/gallery',
            data: imageToAdd
        })
            .then(response => {
                console.log('response from server!', response);
                // refresh gallery
                getGalleryObject();
                // clear inputs
                setPath('');
                setDescription('');
            })
            .catch(error => {
                console.log('error sending new image to server!', error);
            })
    } // end addGalleryImage

    // function to call when submit button is pressed
    const handleSubmit = (event) => {
        event.preventDefault();
        addGalleryImage();
    } // end handleSubmit

return (
    <form onSubmit={handleSubmit}>
        <input onChange={(event) => setPath(event.target.value)}
            value={path}
            placeholder="Image URL"
        />
        <input onChange={(event) => setDescription(event.target.value)}
            value={description}
            placeholder="Description"
        />
        <input id="save" type="submit" value="submit" />
    </form>
)
}

export default GalleryItemForm;