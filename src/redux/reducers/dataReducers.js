import { 
    GET_SCREAMS, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    LOADING_DATA, 
    DELETE_SCREAM, 
    POST_SCREAM, 
    GET_SCREAM
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
                    ...state.screams, 
                    action.payload
                ]
            }
        case GET_SCREAM:
            return {
                ...state, 
                scream: action.payload
            }
        default:
            return state;
    }
}

export default reducer