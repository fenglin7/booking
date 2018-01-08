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
            }

        case REMOVE_LISTING:
            return {
                ...state,
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