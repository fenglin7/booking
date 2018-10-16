import {
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR
} from '../constants/actionTypes'

const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            console.log('signin success')
            return state;
        case SIGNIN_ERROR:
            console.log('signin error', action.err)
            break;
        case SIGNUP_SUCCESS:
            console.log('signup success')
            return state;
        case SIGNUP_ERROR:
            console.log('signup error', action.err)
            break;
        case SIGNOUT_SUCCESS:
            console.log('sign out success')
            return state;
        case SIGNOUT_ERROR:
            console.log('sign out error', action.err)
            break;
        default:
            return state
    }
}

export default authReducer