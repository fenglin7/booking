import React, { Component } from 'react';
import { Route } from 'react-router'

import './App.css';
import Home from './containers/Home.jsx'
import Listings from './containers/Listings.jsx'
import EditListings from './containers/EditListings.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/listings" component={Listings} />
          <Route path="/listings/edit/:id" component={EditListings} />
        </main>
      </div>
    );
  }
}

export default App;
