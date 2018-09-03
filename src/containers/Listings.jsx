import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fire from '../utils/fire';

import * as listingActions from '../features/listing'

import Listing from '../presentors/Listing/Listing.jsx'
import ListingForm from '../presentors/ListingForm/ListingForm.jsx'



export class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = { listings: [] }; // <- set up react state
    }
    componentWillMount() {
        // /* Create reference to messages in Firebase Database */
        // let listingsRef = fire.database().ref('listings').orderByKey().limitToLast(100);
        // listingsRef.on('child_added', snapshot => {
        //     /* Update React state when message is added at Firebase Database */
        //     console.log(snapshot.val())
        //     let listing = { description: snapshot.val(), id: snapshot.key };
        //     this.setState({ listings: [listing].concat(this.state.listings) });
        // })
        // console.log('lisfire', listingsRef)
        this.props.getFireBaseListings()

    }
    // componentDidMount() {
    //     /* Create reference to messages in Firebase Database */
    //     this.props.getFireBaseListings()
    // }

    render() {
        const {
            listings,
            validateAndAddListing
        } = this.props
        console.log('listings', listings)
        return (
            <div>Hi this is listings
                <br />
                <Link to='/'>Home</Link>
                <br />
                All Listings Available
                <br />
                {listings && listings.map((listing, i) => <Listing key={i} index={i} listing={listing} /> )}
                {/* {this.state.listings && this.state.listings.map((listing, index) => <Listing key={listing.id} index={index+1} listing={listing} /> )} */}

                <ListingForm submitAction={validateAndAddListing} />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    listings: state.listing.listings
})

const mapDispatchToProps = dispatch => ({
    validateAndAddListing: (id, description) => dispatch(listingActions.validateAndAddListing(id, description)),
    getFireBaseListings: () => dispatch(listingActions.getFireBaseListings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Listings)
