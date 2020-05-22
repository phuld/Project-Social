import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducers from './reducers/userReducers';
import uiReducers from './reducers/uireducers';
import dataReducers from './reducers/dataReducers';
import otherUserReducers from './reducers/otherUserReducers';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from '../redux/sagas/index';

// const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    user: userReducers, 
    data: dataReducers, 
    ui: uiReducers, 
    otherUser: otherUserReducers
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
))

sagaMiddleware.run(watchAuth)

export default store;