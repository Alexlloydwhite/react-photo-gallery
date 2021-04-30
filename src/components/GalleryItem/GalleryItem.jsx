import './GalleryItem.css';

function GalleryItem(props) {

    return (
        <div class="galleryItem">
            <img src={props.path} width="200" height="200" />
            <p>Likes: {props.likes}</p>
        </div>
    )
}

export default GalleryItem;