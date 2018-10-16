// import { listingsRef } from '../../utils/fire';

export const addListing = (listing) => {
    return dispatch => {
        dispatch({
            type: ADD_LISTING,
            listing
        })
    }
}

export const removeListing = (listing) => {
    return dispatch => {
        dispatch({
            type: REMOVE_LISTING,
            listing
        })
    }
}

export const updateListing = (id, description) => {
    return dispatch => {
        dispatch({
            type: UPDATE_LISTING,
            id,
            description
        })
    }
}

export const saveFirebaseListing = (listings) => {
    return dispatch => {
        dispatch({
            type: SAVE_FIREBASE_LISTING,
            listings
        })
    }
}

export const addFirebaseListing = (listing) => {
    return dispatch => {
        dispatch({
            type: SAVE_FIREBASE_LISTING,
            listing
        })
    }
}

export const validateAndAddListing = (id, description) => (
    dispatch,
    getState
) => {
    console.log('id', id, 'description', description)
    const listings = getState().listing.listings
    const listingIndex = listings.findIndex(listing => (
        listing.id === id
    ))
    console.log('searchindex', listingIndex)
    if (listingIndex === -1) {
        dispatch(addListing({
            id: id,
            description: description
        }))
    } else {
        alert('ID is already in use!')
    }
}

// export const getFireBaseListings = () => async (dispatch) => {
//     listingsRef.on("value", snapshot => {
//         dispatch({
//             type: FETCH_FIREBASE_LISTING,
//             payload: snapshot.val()
//         });
//     });
// }