import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { 
    SET_ERROR, 
    LOADING_UI, 
    CLEAR_ERROR, 
    SET_USER, 
    SET_UNAUTHENTICATED, 
    SET_AUTHENTICATED, 
    LOADING_USER, 
    MARK_NOTIFICATIONS_READ
} from '../types';

export const loadingUI = () => {
    return {
        type: LOADING_UI
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const getUserData = () => {
    return dispatch => {
        dispatch(loadingUser())
        axios.get('/user')
            .then(response => {
                dispatch({
                    type: SET_USER,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const loginUser = (userData, history) => {
    return dispatch => {
        dispatch(loadingUI())
        axios.post('/login', userData)
            .then(response => {
                const authToken = `Bear ${response.data.token}`;
                localStorage.setItem('authToken', authToken);
                axios.defaults.headers.common['Authorization'] = authToken;
                dispatch(getUserData());
                dispatch({
                    type: CLEAR_ERROR
                })
                history.push('/')
            })
            .catch(error => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.response.data
                })
            })
    }
}

export const signupUser = (userData, history) => {
    return dispatch => {
        dispatch(loadingUI())
        axios.post('/signup', userData)
            .then(response => {
                const authToken = `Bear ${response.data.token}`;
                localStorage.setItem('authToken', authToken);
                axios.defaults.headers.common['Authorization'] = authToken;
                dispatch(getUserData());
                dispatch({
                    type: CLEAR_ERROR
                })
                history.push('/')
            })
            .catch(error => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.response.data
                })
            })
    }
}

export const logoutUser = () => {
    return dispatch => {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        dispatch({
            type: SET_UNAUTHENTICATED
        })
    }
}

export const setAuthenticated = () => {
    return {
        type: SET_AUTHENTICATED
    }
}

export const authCheckState = () => {
    return dispatch => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            if (decodedToken.exp * 1000 < Date.now() || !(decodedToken.exp)) {
                dispatch(logoutUser());
                window.location.href = "/login";
            } else {
                dispatch(setAuthenticated());
                axios.defaults.headers.common['Authorization'] = authToken;
                dispatch(getUserData());
            }
        }
    }
}

export const changeImage = (formData) => {
    return dispatch => {
        axios.post('/user/image', formData)
            .then(response => {
                dispatch(getUserData())
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const editUserDetails = (userDetail) => {
    return dispatch => {
        dispatch({
            type: LOADING_USER
        })
        axios.post('/user', userDetail)
            .then((response) => {
                dispatch(getUserData())
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const markNotificationsRead = (notificationIds) => {
    return dispatch => {
        axios.post('/notifications', notificationIds)
            .then(response => {
                dispatch({
                    type: MARK_NOTIFICATIONS_READ
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}