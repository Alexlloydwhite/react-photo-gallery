import React, { useEffect,useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header'
import GalleryList from '../GalleryList/GalleryList';

function App() {

  const [galleryObject, setGalleryObject] = useState([]);

  const getGalleryObject = () => {
    axios({
      method: 'GET',
      url: '/gallery'
    })
      .then(response => {
        console.log('response from server!', response.data);
        setGalleryObject(response.data);
      })
      .catch(error => {
        console.log('error getting response from server..', error);
      })
  }

  useEffect( () => {
    getGalleryObject();
  }, [] );


  return (
    <div className="App">
      <Header />
      <GalleryList galleryObject={galleryObject} getGalleryObject={getGalleryObject}/>
    </div>
  );
}

export default App;
