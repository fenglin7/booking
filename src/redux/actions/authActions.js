// export const createUserSuccess = (resp) => {
//     return {
//         type: CREATE_USER_SUCCESS,
//         user: resp,
//     }
// }
// export const createUserFail = (error) => {
//     return {
//         type: CREATE_USER_FAIL,
//         error
//     }
// }

// export const createUser = (email, pass) => dispatch => {
//     auth.doCreateUserWithEmailAndPassword(email, pass)
//     .then((resp) => {
//         return dispatch(createUserSuccess(resp));
//     }) 
//     .catch((error) => disptach(createUserFail));
// }

export const signIn = credentials => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        console.log('cred', credentials)
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            console.log('success')
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch(err => {
            console.log('err', err)
            dispatch({ type: 'LOGIN_ERROR', err })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNOUT_ERROR', err })
        })
    }
}


export const signUp = (newUser) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            console.log('resp', resp)
            const userData = {
                id: resp.user.uid,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            }
            return firebase.set(`users/${resp.user.uid}`, userData)

        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}