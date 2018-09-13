import { applyMiddleware, createStore } from 'redux'
import reducers from '../reducers/index'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export default createStore(
    reducers,
    applyMiddleware(thunk, logger)
)