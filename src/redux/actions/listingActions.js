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
