import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as listingActions from '../features/listing'

import Listing from '../presentors/Listing/Listing.jsx'
import ListingForm from '../presentors/ListingForm/ListingForm.jsx'



export class Listings extends Component {
    render() {
        const {
            listings,
            validateAndAddListing
        } = this.props
        return (
            <div>Hi this is listings
                <br />
                <Link to='/'>Home</Link>
                <br />
                All Listings Available
                <br />
                {listings && listings.map((listing) => <Listing key={listing.id} listing={listing} /> )}

                <ListingForm submitAction={validateAndAddListing} />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    listings: state.listing.listings
})

const mapDispatchToProps = dispatch => ({
    validateAndAddListing: (id, description) => dispatch(listingActions.validateAndAddListing(id, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(Listings)
