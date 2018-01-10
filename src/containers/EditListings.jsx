import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as listingActions from '../features/listing'

import Listing from '../presentors/Listing/Listing.jsx'
import ListingForm from '../presentors/ListingForm/ListingForm.jsx'



export class EditListings extends Component {
    render() {
        const {
            listings,
            updateListing
        } = this.props
        return (
            <div>
                <ListingForm submitAction={updateListing} />
                <br />
                <Link to='/listings'>Back to Listings</Link>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    listings: state.listing.listings
})

const mapDispatchToProps = dispatch => ({
    updateListing: (id, description) => dispatch(listingActions.updateListing(id, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditListings)
