import * as actionTypes from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [], 
    blocks: [], 
    follows: []
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
        case actionTypes.LIKE_SCREAM_SUCCESS:
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
        case actionTypes.UNLIKE_SCREAM_SUCCESS:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }
        case actionTypes.MARK_NOTIFICATIONS_READ_SUCCESS:
            state.notifications.forEach(noti => noti.read = true)
            return {
                ...state
            }
        case actionTypes.BLOCK_SCREAM_SUCCESS: 
            return {
                ...state, 
                blocks: [
                    action.payload, 
                    ...state.blocks
                ]
            }
        case actionTypes.FOLLOW_USER_SUCCESS:
            return {
                ...state, 
                loading: false,
                follows: [
                    action.payload, 
                    ...state.follows
                ]
            }
        case actionTypes.UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                follows: state.follows.filter(follow => follow.owner !== action.payload)
            }
        default:
            return state;
    }
}

export default reducer;