import React, { Component } from 'react'
import { connect } from 'react-redux'

import Listing from '../presentors/Listing/Listing.jsx'


export default class Listings extends Component {
    render() {
        return (
            <div>Hi this is listings
                <Listing />
            </div>
        )
    }
}
