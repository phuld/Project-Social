import { 
    GET_SCREAMS, 
    LOADING_DATA, 
    DELETE_SCREAM_SUCCESS, 
    GET_SCREAMS_BY_PAGE_SUCCESS, 
    CLEAR_SCREAM,
    CHANGE_TYPE,
    GET_SCREAM_SUCCESS,
    LIKE_SCREAM_SUCCESS,
    UNLIKE_SCREAM_SUCCESS,
    POST_SCREAM_SUCCESS,
    SUBMIT_COMMENT_SUCCESS,
    GET_NUMBER_SCREAMS_BY_USER_SUCCESS,
    EDIT_SCREAM_SUCCESS,
    GET_NUMBER_SCREAMS_SUCCESS
} from '../types';

const initialState = {
    screams: [], 
    scream: {}, 
    loading: false, 
    number: 0, 
    type: 'newest', 
    currentPage: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state, 
                loading: true
            }
        case GET_SCREAMS:
            return {
                ...state, 
                loading: false, 
                screams: action.payload
            }
        case LIKE_SCREAM_SUCCESS:
        case UNLIKE_SCREAM_SUCCESS:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
                ...state, 
                scream: action.payload 
            }
        case DELETE_SCREAM_SUCCESS:
            const updateScreams = state.screams.filter(scream => scream.screamId !== action.payload);
            return {
                ...state, 
                screams: updateScreams
            }
        case POST_SCREAM_SUCCESS:
            return {
                ...state, 
                screams: [
                    action.payload,
                    ...state.screams 
                ]
            }
        case GET_SCREAM_SUCCESS:
            return {
                ...state, 
                scream: action.payload
            }
        case CLEAR_SCREAM: 
            return {
                ...state, 
                scream: {}, 
                loading: false
            }
        case SUBMIT_COMMENT_SUCCESS:
            let indexComment = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            state.screams[indexComment] = action.payload
            return {
                ...state, 
                scream: action.payload
            }
        case EDIT_SCREAM_SUCCESS:
            const updateScream = action.payload;
            let indexUpdate = state.screams.findIndex(scream => updateScream.screamId === scream.screamId);
            state.screams[indexUpdate] = updateScream;
            return {
                ...state
            }
        case GET_NUMBER_SCREAMS_SUCCESS: 
            return { 
                ...state, 
                number: action.payload
            }
        case GET_SCREAMS_BY_PAGE_SUCCESS:
            return {
                ...state, 
                screams: action.payload, 
                loading: false, 
                type: action.sortBy, 
                currentPage: action.currentPage
            }
        case CHANGE_TYPE:
            return {
                ...state, 
                type: action.payload
            }
        case GET_NUMBER_SCREAMS_BY_USER_SUCCESS:
            return {
                ...state, 
                number: action.payload
            }
        default:
            return state;
    }
}

export default reducer