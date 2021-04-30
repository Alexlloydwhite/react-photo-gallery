function GalleryList(props) {
    console.log('gallery props are:', props);
    for (let i = 0; i < props.galleryObject.length; i++) {
        console.log('In Gallery List loop!');
    }

    return (
        <>
        </>
    )
} // end Gallery List

export default GalleryList;