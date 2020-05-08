import * as actionTypes from '../types';

const initialState = {
    authenticated: false, 
    loading: false,
    credentials: {}, 
    likes: [], 
    notifications: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTHENTICATED:
            return {
                ...state, 
                authenticated: true
            }
        case actionTypes.SET_UNAUTHENTICATED:
            return initialState;
        case actionTypes.SET_USER: {
            return {
                ...state, 
                loading: false,
                authenticated: true, 
                ...action.payload
            }
        }
        case actionTypes.LOADING_USER:
            return {
                ...state, 
                loading: true
            }
        case actionTypes.LIKE_SCREAM:
            return {
                ...state, 
                likes: [
                    ...state.likes, 
                    {
                        screamId: action.payload.screamId, 
                        userHandle: action.payload.userhandle
                    }
                ]
            }
        case actionTypes.UNLIKE_SCREAM:
            return {
                ...state, 
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }
        default:
            return state;
    }
}

export default reducer;