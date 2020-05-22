import { 
    GET_OTHER_USER, 
    LOADING_OTHER_USER, 
    GET_OTHER_USER_SUCCESS
} from '../types';

export const getOtherUser = (userHandle) => {
    return {
        type: GET_OTHER_USER, 
        userHandle
    }
}

export const loadingOtherUser = () => {
    return {
        type: LOADING_OTHER_USER
    }
}

export const getOtherUserSuccess = (data) => {
    return {
        type: GET_OTHER_USER_SUCCESS, 
        payload: data
    }
}