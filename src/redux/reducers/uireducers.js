import {SET_ERROR, LOADING_UI, CLEAR_ERROR} from '../types';

const initialState = {
    loading: false, 
    errors:{}
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
                errors: {}
            }
        case LOADING_UI:
            return {
                ...state, 
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;