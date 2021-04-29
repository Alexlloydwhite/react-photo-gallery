import React from 'react';
import './App.css';
import axios from 'axios';

function App() {

      axios({
        method: 'GET',
        url: '/gallery'
      })
        .then( response => {
          console.log('response from server!', response);
          
        })
    
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Gallery of My Life</h1>
        </header>
        <p>Gallery goes here</p>
        <img src="images/goat_small.jpg"/>
      </div>
    );
}

export default App;
