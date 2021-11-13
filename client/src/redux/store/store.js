import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { } from 'react-redux'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)))


