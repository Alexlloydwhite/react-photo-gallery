import GalleryCard from '../GalleryCard/GalleryCard'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'

function GalleryList({galleryObject, getGalleryObject}) {
    return (
        <Container>
            <Grid container spacing={3}> 
                {galleryObject.map(image=>
                    <Grid item key={image.id}
                        xs={12}
                        md={6}
                        lg={4}
                    >
                        <GalleryCard image={image} getGalleryObject={getGalleryObject}/>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
} // end Gallery List

export default GalleryList;