import { GET_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM } from '../types';
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
                    type: GET_SCREAM,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_SCREAM,
                    payload: []
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