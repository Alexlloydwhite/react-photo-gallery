import react, { useState } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

function GalleryItemForm({ getGalleryObject }) {
    const classes = useStyles();
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');
    const [pathError, setPathError] = useState(false);
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
        setPathError(false);
        setDescriptionError(false);

        if (path == '') {
            setPathError(true);
        }
        if (description == '') {
            setDescriptionError(true);
        }

        if (path && description) {
            console.log(path, description);
        }

        // addGalleryImage();
    } // end handleSubmit

    return (
        <Container>
            <Typography
                variant="h4"
                color="textSecondary"
                gutterBottom
            >
                Add a New Image to Gallery!
        </Typography>

            <form noValidate autoComplete="off">
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

    // <form onSubmit={handleSubmit}>
    //     <input onChange={(event) => setPath(event.target.value)}
    //         value={path}
    //         placeholder="Image URL"
    //     />
    //     <input onChange={(event) => setDescription(event.target.value)}
    //         value={description}
    //         placeholder="Description"
    //     />
    //     <input id="save" type="submit" value="submit" />
    // </form>