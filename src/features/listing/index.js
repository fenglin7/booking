export const ADD_LISTING = 'listing/ADD_LISTING'
export const REMOVE_LISTING = 'listing/REMOVE_LISTING'
export const UPDATE_LISTING = 'listing/UPDATE_LISTING'

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
                    ...state.cart.slice(0, listingIndexToRemove), ...state.cart.slice(listingIndexToRemove + 1)
                ]
            }

        case UPDATE_LISTING:
            return {
                ...state,
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

export const validateAndAddListing = (id, description) => (
    dispatch
) => {
    console.log('id', id, 'description', description)
    dispatch(addListing({
        id: id, 
        description: description
    }))
}