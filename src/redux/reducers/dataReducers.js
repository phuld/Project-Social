import { 
    GET_SCREAMS,
    GET_SCREAM, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    LOADING_DATA, 
    DELETE_SCREAM, 
    POST_SCREAM 
} from '../types';

const initialState = {
    screams: [], 
    scream: {}, 
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state, 
                loading: true
            }
        case GET_SCREAM:
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
                ...state 
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
                    ...state.screams, 
                    action.payload
                ]
            }
        default:
            return state;
    }
}

export default reducer