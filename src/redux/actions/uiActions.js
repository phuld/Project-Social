import {
    LOADING_UI, 
    STOP_LOADING_UI, 
    SET_ERROR, 
    CLEAR_ERROR,
    SET_MESSAGE, 
    CLEAR_MESSAGE
} from '../types';

export const loadingUI = () => {
    return {
        type: LOADING_UI       
    }
}

export const stopLoadingUI = () => {
    return {
        type: STOP_LOADING_UI
    }
}

export const setError = (error) => {
    return {
        type: SET_ERROR, 
        payload: error
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const setMessage = (message) => {
    return {
        type: SET_MESSAGE, 
        payload: message
    }
}

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE
    }
}