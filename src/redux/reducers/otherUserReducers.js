import { 
    GET_OTHER_USER_SUCCESS,
    LOADING_OTHER_USER
} from '../types';


const initialState = {
    data: {}, 
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_OTHER_USER:
            return {
                ...state, 
                loading: true
            }
        case GET_OTHER_USER_SUCCESS:
            return {
                ...state, 
                data: action.payload, 
                loading: false    
            }
        default:
            return state;
    }
}

export default reducer;