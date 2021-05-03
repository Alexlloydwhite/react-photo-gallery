import react, { useState } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

// custom styles
const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

function GalleryItemForm({ getGalleryObject }) {
    // hook to use custom styles
    const classes = useStyles();
    // state for path input
    const [path, setPath] = useState('');
    // state for description input
    const [description, setDescription] = useState('');
    // state for path input error
    const [pathError, setPathError] = useState(false);
    // state for description input error
    const [descriptionError, setDescriptionError] = useState(false);

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
        // by default, the inputs are set to no error
        // this the DOM to only throw error for non complete
        // input on click submit
        setPathError(false);
        setDescriptionError(false);
        // if path input is empty, toggle error
        if (path == '') {
            setPathError(true);
        }
        // if description input is empty, toggle error
        if (description == '') {
            setDescriptionError(true);
        }
        // do not allow user to submit form to server until all inputs are completed.
        if (path && description) {
            addGalleryImage();
        }
    } // end handleSubmit

    return (
        // this container holds the input form
        <Container>
            <Typography
                variant="h4"
                color="textSecondary"
                gutterBottom
            >
                Add a New Image to Gallery!
        </Typography>

            <form noValidate autoComplete="off">
                {/* input for image url */}
                <TextField
                    className={classes.field}
                    onChange={(event) => setPath(event.target.value)}
                    value={path}
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    required
                    error={pathError}
                />
                {/* input for image description */}
                <TextField
                    className={classes.field}
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    required
                    error={descriptionError}
                />
                {/* button to submit form */}
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    color="primary"
                    variant="contained"
                    startIcon={<SendIcon />}
                >
                    Submit
            </Button>
            </form>
        </Container>
    )
}

export default GalleryItemForm;