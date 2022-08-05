import React, { Component } from 'react';
import { getCategories } from './services/api';
import './App.css';

class App extends Component {
  render() {
    getCategories().then((categories) => { console.log(categories); });
    return (
      <div>
        <h1>Ola</h1>
      </div>
    );
  }
}

export default App;
