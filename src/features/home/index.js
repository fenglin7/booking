// import { messagesRef } from '../../utils/fire';

export const FETCH_FIREBASE_MESSAGES = 'home/FETCH_FIREBASE_MESSAGES'

const initialState = {
    messages: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FIREBASE_MESSAGES:
            var arr = Object.keys(action.payload).map(function (k) {
                return { text: action.payload[k], id: k };
            });
            return {
                ...state,
                messages: arr
            }
        default:
            return state
    }
}

// export const addListing = (listing) => {
//     return dispatch => {
//         dispatch({
//             type: ADD_LISTING,
//             listing
//         })
//     }
// }

// export const removeListing = (listing) => {
//     return dispatch => {
//         dispatch({
//             type: REMOVE_LISTING,
//             listing
//         })
//     }
// }

// export const updateListing = (id, description) => {
//     return dispatch => {
//         dispatch({
//             type: UPDATE_LISTING,
//             id,
//             description
//         })
//     }
// }

// export const saveFirebaseListing = (listings) => {
//     return dispatch => {
//         dispatch({
//             type: SAVE_FIREBASE_LISTING,
//             listings
//         })
//     }
// }

// export const addFirebaseListing = (listing) => {
//     return dispatch => {
//         dispatch({
//             type: SAVE_FIREBASE_LISTING,
//             listing
//         })
//     }
// }

// export const validateAndAddListing = (id, description) => (
//     dispatch,
//     getState
// ) => {
//     console.log('id', id, 'description', description)
//     const listings = getState().listing.listings
//     const listingIndex = listings.findIndex(listing => (
//         listing.id === id
//     ))
//     console.log('searchindex', listingIndex)
//     if (listingIndex === -1) {
//         dispatch(addListing({
//             id: id,
//             description: description
//         }))
//     } else {
//         alert('ID is already in use!')
//     }
// }

// export const getFireBaseMessages = () => async (dispatch) => {
//     messagesRef.on("value", snapshot => {
//         dispatch({
//             type: FETCH_FIREBASE_MESSAGES,
//             payload: snapshot.val()
//         });
//     });
// }