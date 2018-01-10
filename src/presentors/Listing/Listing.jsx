import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Listing extends Component {
    render() {
        const {listing} = this.props
        return (
            <div>
                <span>ID: {listing.id}</span>
                <span>Description: {listing.description}</span>
                <Link to={`listings/edit/${listing.id}`}>EDIT</Link>
            </div>
        )
    }
}