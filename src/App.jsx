import React, { Component } from 'react';
import { Route } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { theme } from '@smooth-ui/core-sc'

import './App.css';
import Navbar from './components/layout/Navbar'

import Home from './components/dashboard/Home.jsx'
// import Listings from './components/Listings.jsx'
import EditListings from './components/EditListings.jsx'
import Profile from './components/Profile.jsx'
import SignIn from './components/auth/SignIn.jsx'
import SignUp from './components/auth/SignUp.jsx'

const themes = {
  ...theme,
  primary: '#30394F',
  secondary: '#6ACEEB',
  // secondary: '#FF434C',
  // secondary: '#EDE8DF',
  // secondary: '#FFFBED',
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={themes}>
        <div className="App">
        <Navbar />
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/listings" component={Listings} /> */}
            <Route path="/listings/edit/:id" component={EditListings} />
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
