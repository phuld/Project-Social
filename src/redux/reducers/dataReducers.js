import { 
    GET_SCREAMS, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    LOADING_DATA, 
    DELETE_SCREAM, 
    POST_SCREAM, 
    GET_SCREAM,
    SUBMIT_COMMENT, 
    EDIT_SCREAM, 
    GET_NUMBER_SCREAMS,
    GET_SCREAMS_BY_PAGE, 
    CLEAR_SCREAM
} from '../types';

const initialState = {
    screams: [], 
    scream: {}, 
    loading: false, 
    number: 0
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
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
                ...state, 
                scream: action.payload 
            }
        case DELETE_SCREAM:
            const updateScreams = state.screams.filter(scream => scream.screamId !== action.payload);
            return {
                ...state, 
                screams: updateScreams
            }
        case POST_SCREAM:
            return {
                ...state, 
                screams: [
                    action.payload,
                    ...state.screams 
                ]
            }
        case GET_SCREAM:
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
        case SUBMIT_COMMENT:
            let indexComment = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            state.screams[indexComment] = action.payload
            return {
                ...state, 
                scream: action.payload
            }
        case EDIT_SCREAM:
            const updateScream = action.payload;
            let indexUpdate = state.screams.findIndex(scream => updateScream.screamId === scream.screamId);
            state.screams[indexUpdate] = updateScream;
            return {
                ...state
            }
        case GET_NUMBER_SCREAMS: 
            return { 
                ...state, 
                number: action.payload
            }
        case GET_SCREAMS_BY_PAGE:
            return {
                ...state, 
                screams: action.payload, 
                loading: false
            }
        default:
            return state;
    }
}

export default reducer