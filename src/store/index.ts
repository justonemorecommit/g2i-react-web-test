import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './rootReducer'

const enhancers = [applyMiddleware(thunkMiddleware)]
const composedEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(...enhancers)
    : (compose(...enhancers) as StoreEnhancer)

const store = createStore(rootReducer, composedEnhancers)

export default store
