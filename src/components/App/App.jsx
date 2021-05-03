import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import GalleryContainer from '../GalleryContainer/GalleryContainer'
import GalleryItemForm from '../GalleryItemForm/GalleryItemForm';
import Layout from '../Layout/Layout';

function App() {
  // hook for storing image data in array
  const [galleryObject, setGalleryObject] = useState([]);
  // grab data from server and push into array
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

  useEffect(() => {
    getGalleryObject();
  }, []);


  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/add">
              {/* Passing function to perform GET request => form for adding new image */}
              <GalleryItemForm getGalleryObject={getGalleryObject} />
            </Route>
            <Route path="/">
              {/* Passing galleryObject(where the data is stored) plus function to perform GET 
                  request to the container that will hold image cards */}
              <GalleryContainer galleryObject={galleryObject} getGalleryObject={getGalleryObject} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
