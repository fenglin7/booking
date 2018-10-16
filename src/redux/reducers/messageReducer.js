import {
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_ERROR
} from '../constants/actionTypes'


const initState = {
    messages: []
}
const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_MESSAGE_SUCCESS:
            console.log('add message success', action.value)
            return state;
        case ADD_MESSAGE_ERROR:
            console.log('add message error', action.err)
            break;
        default:
            return state
    }
}

export default messageReducer