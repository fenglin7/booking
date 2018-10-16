export const addMessage = (msg) => (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
   firebase
     .push('messages', msg)
     .then(() => {
       dispatch({ type: 'ADD_MESSAGE_SUCCESS', value: 'added' })
     })
}