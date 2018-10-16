import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import firebaseConfig from './config/firebaseConfig'
import createHistory from 'history/createBrowserHistory'
import listing from './features/listing'
import home from './features/home'
import messageReducer from './redux/reducers/messageReducer'
import authReducer from './redux/reducers/authReducer'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk.withExtraArgument(getFirebase),
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const rootReducer = combineReducers({
  routing: routerReducer,
  firebase: firebaseReducer,
  // listing,
  // home,
  messages: messageReducer,
  auth: authReducer
})

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  reactReduxFirebase(firebaseConfig, { userProfile: 'users', attachAuthIsReady: true }),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store