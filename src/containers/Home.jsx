import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../assets/logo.svg';



export default class Home extends Component {
    render() {
        return (
            <div>Hi there this is home
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        )
    }
}
