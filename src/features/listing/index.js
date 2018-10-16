// import { listingsRef } from '../../utils/fire';

export const ADD_LISTING = 'listing/ADD_LISTING'
export const REMOVE_LISTING = 'listing/REMOVE_LISTING'
export const UPDATE_LISTING = 'listing/UPDATE_LISTING'
export const SAVE_FIREBASE_LISTING = 'listing/SAVE_FIREBASE_LISTING'
export const FETCH_FIREBASE_LISTING = 'listing/FETCH_FIREBASE_LISTING'

const initialState = {
    listings: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_LISTING:
            return {
                ...state,
                listings: [...state.listings, action.listing]
            }

        case REMOVE_LISTING:
            const listingIndexToRemove = state.listings.findIndex(item => (
                item.id === action.id
            ))
            return {
                ...state,
                listings: [
                    ...state.listings.slice(0, listingIndexToRemove), ...state.listings.slice(listingIndexToRemove + 1)
                ]
            }

        case UPDATE_LISTING:
            const listingIndex = state.listings.findIndex(listing => (
                listing.id === action.id
            ))
            if (listingIndex !== -1) {
                return {
                    ...state,
                    listings: [
                        ...state.listings.slice(0, listingIndex),
                        { id: action.id, description: action.description },
                        ...state.listings.slice(listingIndex + 1)
                    ]
                }
            }

        case FETCH_FIREBASE_LISTING:
            var arr = Object.keys(action.payload).map(function (k) {
                return { description: action.payload[k], id: k };
            });
            return {
                ...state,
                listings: arr
            }
        default:
            return state
    }
}

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