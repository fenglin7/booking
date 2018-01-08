import React, { Component } from 'react';
import { Route } from 'react-router'

import './App.css';
import Home from './containers/Home.jsx'
import Listings from './containers/Listings.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/listings" component={Listings} />
        </main>
      </div>
    );
  }
}

export default App;
