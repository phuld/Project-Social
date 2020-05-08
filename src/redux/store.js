import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducers from './reducers/userReducers';
import uiReducers from './reducers/uireducers';
import dataReducers from './reducers/dataReducers';

// const initialState = {};

const reducers = combineReducers({
    user: userReducers, 
    data: dataReducers, 
    ui: uiReducers
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
))

export default store;