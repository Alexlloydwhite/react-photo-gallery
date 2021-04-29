import React from 'react';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header'

function App() {

      axios({
        method: 'GET',
        url: '/gallery'
      })
        .then( response => {
          console.log('response from server!', response);
        })
        .catch( error => {
          console.log('error getting response from server..', error);
        })
    
      return (
      <div className="App">
        <Header />
        <p>Gallery goes here</p>
        <img src="images/goat_small.jpg"/>
      </div>
    );
}

export default App;
