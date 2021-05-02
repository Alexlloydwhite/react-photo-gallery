import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header'
import GalleryContainer from '../GalleryContainer/GalleryContainer'
import GalleryItemForm from '../GalleryItemForm/GalleryItemForm';
import Layout from '../Layout/Layout';

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

  useEffect(() => {
    getGalleryObject();
  }, []);


  return (
    <div className="App">
      <Header />
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <GalleryItemForm getGalleryObject={getGalleryObject} />
            </Route>
            <Route path="/gallery">
              <GalleryContainer galleryObject={galleryObject} getGalleryObject={getGalleryObject} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
