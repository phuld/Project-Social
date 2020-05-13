import {
    SET_ERROR,
    LOADING_UI,
    CLEAR_ERROR,
    STOP_LOADING_UI, 
    SET_MESSAGE, 
    CLEAR_MESSAGE
} from '../types';

const initialState = {
    loading: false,
    errors: {},
    message: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                errors: {},
                message: ''
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_UI: {
            return {
                ...state,
                loading: false
            }
        }
        case SET_MESSAGE: {
            return {
                ...state, 
                loading: false, 
                message: action.payload
            }
        }
        case CLEAR_MESSAGE:
            return {
                ...state, 
                loading: false, 
                message: ''
            }
        default:
            return state;
    }
}

export default reducer;