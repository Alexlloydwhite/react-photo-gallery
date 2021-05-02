import GalleryItem from '../GalleryCard/GalleryCard'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'

function GalleryList(props) {
    console.log('gallery props are:', props);
    for (let i = 0; i < props.galleryObject.length; i++) {
        console.log('In Gallery List loop!');
    }
    return (
        <Container>
            <Grid container>
                {props.galleryObject.map(index =>
                    <Grid item key={index.id}
                        xs={12}
                        md={6}
                        lg={4}
                    >
                        <GalleryItem
                            id={index.id}
                            path={index.path}
                            description={index.description}
                            likes={index.likes}
                            getGalleryObject={props.getGalleryObject}
                        />
                    </Grid>
                )}
            </Grid>
        </Container>
    )
} // end Gallery List

export default GalleryList;