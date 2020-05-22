import {
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SUBMIT_COMMENT,
    EDIT_SCREAM,
    GET_NUMBER_SCREAMS,
    GET_SCREAMS_BY_PAGE_START, 
    GET_SCREAMS_BY_PAGE_SUCCESS,
    CLEAR_SCREAM, 
    CHANGE_TYPE,
    GET_SCREAM_START,
    GET_SCREAM_SUCCESS,
    LIKE_SCREAM_SUCCESS,
    UNLIKE_SCREAM_SUCCESS,
    DELETE_SCREAM_SUCCESS, 
    POST_SCREAM_SUCCESS,
    SUBMIT_COMMENT_SUCCESS,
    GET_SCREAMS_BY_USER,
    GET_NUMBER_SCREAMS_BY_USER,
    GET_NUMBER_SCREAMS_BY_USER_SUCCESS,
    EDIT_SCREAM_SUCCESS,
    GET_NUMBER_SCREAMS_SUCCESS
} from '../types';

//Loading data
export const loadingData = () => {
    return {
        type: LOADING_DATA
    }
}

export const getScreamsbyPage = (currentType, currentNumber) => {
    return {
        type: GET_SCREAMS_BY_PAGE_START, 
        currentType, 
        currentNumber
    }
}

export const getScreamsbyPageSuccess = (payload, sortBy, currentPage) => {
    return {
        type: GET_SCREAMS_BY_PAGE_SUCCESS, 
        payload, 
        sortBy, 
        currentPage
    }
}

//Get One Scream
export const getOneScream = (screamId) => {
    return {
        type: GET_SCREAM_START, 
        screamId
    }
}

export const getScreamSuccess = (screamData) => {
    return {
        type: GET_SCREAM_SUCCESS, 
        payload: screamData
    }
}

//Like Scream
export const likeScream = (screamId) => {
    return {
        type: LIKE_SCREAM, 
        screamId
    }
}

export const likeScreamSuccess = (screamData) => {
    return {
        type: LIKE_SCREAM_SUCCESS, 
        payload: screamData
    }
}

//Unlike Scream
export const unlikeScream = (screamId) => {
    return {
        type: UNLIKE_SCREAM, 
        screamId
    }
}

export const unlikeScreamSuccess = (screamData) => {
    return {
        type: UNLIKE_SCREAM_SUCCESS, 
        payload: screamData
    }
}

//Delete Scream
export const deleteScream = (screamId) => {
    return {
        type: DELETE_SCREAM, 
        screamId
    }
}

export const deleteScreamSuccess = (screamId) => {
    return {
        type: DELETE_SCREAM_SUCCESS, 
        payload: screamId
    }
}

//Post Scream
export const postScream = (newScream) => {
    return {
        type: POST_SCREAM, 
        newScream
    }
}

export const postScreamSuccess = (screamData) => {
    return {
        type: POST_SCREAM_SUCCESS, 
        payload: screamData
    }
}

export const submitComment = (screamId, commentData) => {
    return {
        type: SUBMIT_COMMENT, 
        screamId, 
        commentData
    }
}

export const submitCommentSuccess = (commentData) => {
    return {
        type: SUBMIT_COMMENT_SUCCESS, 
        payload: commentData
    }
}


export const editScream = (screamId, screamData) => {
    return {
        type: EDIT_SCREAM, 
        screamId, 
        screamData
    }
}

export const editScreamSuccess = (screamData) => {
    return {
        type: EDIT_SCREAM_SUCCESS, 
        payload: screamData
    }
}

export const getNumberScreams = () => {
    return {
        type: GET_NUMBER_SCREAMS
    }
}

export const getNumberScreamsSuccess = (number) => {
    return {
        type: GET_NUMBER_SCREAMS_SUCCESS, 
        payload: number
    }
}

export const clearScream = () => {
    return {
        type: CLEAR_SCREAM
    }
}

export const changeType = (type) => {
    return {
        type: CHANGE_TYPE, 
        payload: type
    }
}

export const getScreamsByUser = (userHandle, currentType, currentPage) => {
    return {
        type: GET_SCREAMS_BY_USER, 
        userHandle, 
        currentType, 
        currentPage
    }
}

export const getNumberScreamsByUser = (userHandle) => {
    return {
        type: GET_NUMBER_SCREAMS_BY_USER, 
        userHandle
    }
}

export const getNumberScreamsByUserSuccess = (number) => {
    return {
        type: GET_NUMBER_SCREAMS_BY_USER_SUCCESS, 
        payload: number
    }
}