import GalleryCard from '../GalleryCard/GalleryCard'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'

// props are: galleryObject(stores data from DB), getGalleryObject (function to perform GET request for data)
function GalleryList({galleryObject, getGalleryObject}) {
    return (
        // container holds cards
        <Container>
            {/* spacing for cards to display correctly on different screens */}
            <Grid container spacing={3}> 
                {galleryObject.map(image=>
                    <Grid item key={image.id}
                        xs={12}
                        md={6}
                        lg={4}
                    >
                        {/* passing props to card! */}
                        <GalleryCard image={image} getGalleryObject={getGalleryObject}/>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
} // end Gallery List

export default GalleryList;