import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.svg';



export default class Home extends Component {
    render() {
        return (
            <div>
                Hi there this is home<br/>
                <img src={logo} className="App-logo" alt="logo" />
                <br/>
                <Link to='/listings'>Listings</Link> 
            </div>
        )
    }
}
