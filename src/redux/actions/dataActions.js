import {
    GET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_ERROR,
    LOADING_UI,
    CLEAR_ERROR,
    GET_SCREAM,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

//Loading data
export const loadingData = () => {
    return {
        type: LOADING_DATA
    }
}

//Get All Screams
export const getScreams = () => {
    return dispatch => {
        dispatch(loadingData())
        axios.get('/screams')
            .then(response => {
                dispatch({
                    type: GET_SCREAMS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_SCREAMS,
                    payload: []
                })
            })
    }
}

//Get One Scream
export const getOneScream = (screamId) => {
    return dispatch => {
        dispatch({
            type: LOADING_UI
        })
        axios.get(`/scream/${screamId}`)
            .then((response) => {
                dispatch({
                    type: GET_SCREAM,
                    payload: response.data
                })
                dispatch({
                    type: STOP_LOADING_UI
                })
            })
    }
}

//Like Scream
export const likeScream = (screamId) => {
    return dispatch => {
        axios.get(`/scream/${screamId}/like`)
            .then(response => {
                dispatch({
                    type: LIKE_SCREAM,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

//Unlike Scream
export const unlikeScream = (screamId) => {
    return dispatch => {
        axios.get(`/scream/${screamId}/unlike`)
            .then(response => {
                dispatch({
                    type: UNLIKE_SCREAM,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

//Delete Scream
export const deleteScream = (screamId) => {
    return dispatch => {
        axios.delete(`/scream/${screamId}`)
            .then((response) => {
                dispatch({
                    type: DELETE_SCREAM,
                    payload: screamId
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

//Post Scream
export const postScream = (newScream) => {
    return dispatch => {
        dispatch({
            type: LOADING_UI
        })
        axios.post('/scream', newScream)
            .then(response => {
                dispatch({
                    type: POST_SCREAM,
                    payload: response.data
                })
                dispatch({
                    type: CLEAR_ERROR
                })
            })
            .catch(error => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.response.data
                })
            })
    }
}

export const clearErrors = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_ERROR
        })
    }
}

export const submitComment = (screamId, commentData) => {
    return dispatch => {
        axios.post(`/scream/${screamId}/comment`, commentData)
            .then(response => {
                dispatch({
                    type: SUBMIT_COMMENT,
                    payload: response.data
                })
                dispatch(clearErrors())
            })
            .catch(error => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.response.data
                })
            })
    }
}

export const getScreamsByUser = (userHandle) => {
    return dispatch => {
        dispatch({
            type: LOADING_DATA
        })
        axios.get(`/user/${userHandle}`)
            .then(response => {
                dispatch({
                    type: GET_SCREAMS, 
                    payload: response.data.screams
                })
            })
            .catch(error => {
                dispatch({
                    type: SET_ERROR, 
                    payload: []
                })
            })
    }
}