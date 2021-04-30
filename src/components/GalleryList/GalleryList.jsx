import GalleryItem from '../GalleryItem/GalleryItem'

function GalleryList(props) {
    console.log('gallery props are:', props);
    for (let i = 0; i < props.galleryObject.length; i++) {
        console.log('In Gallery List loop!');
    }
    return (
        <div>
            {props.galleryObject.map( index => 
                <GalleryItem 
                    id = {index.id}
                    path = {index.path}
                    description = {index.description}
                    likes = {index.likes}
                    getGalleryObject={props.getGalleryObject}
                />
                )}
        </div>
    )
} // end Gallery List

export default GalleryList;