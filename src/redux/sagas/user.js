import axios from 'axios';
import { put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import {
    getUserData,
    loadingUser,
    setUserData,
    setUnauthenticated,
    logoutUser,
    setAuthenticated,
    markNotiReadSuccess
} from '../actions/userActions';
import {
    loadingUI,
    clearError,
    setError,
    setMessage
} from '../actions/uiActions';
import {
    MESSAGE_CHANGE_AVATAR, 
    MESSAGE_UPDATE_USER
} from '../messages';

export function* loginUserSaga(action) {
    yield put(loadingUI());
    try {
        const response = yield axios.post('/login', action.userData);
        const authToken = `Bear ${response.data.token}`;
        yield localStorage.setItem('authToken', authToken);
        axios.defaults.headers.common['Authorization'] = authToken;
        yield put(getUserData());
        yield put(clearError());
    } catch (error) {
        yield put(setError(error.response.data));
    }
}

export function* signupUserSaga(action) {
    yield put(loadingUI())
    try {
        const response = yield axios.post('/signup', action.userData);
        const authToken = `Bear ${response.data.token}`;
        yield localStorage.setItem('authToken', authToken);
        axios.defaults.headers.common['Authorization'] = authToken;
        yield put(getUserData());
        yield put(clearError());
    } catch (error) {
        yield put(setError(error.response.data))
    }
}

export function* getUserDataSaga(action) {
    yield put(loadingUser())
    try {
        const response = yield axios.get('/user');
        yield put(setUserData(response.data))
    } catch (error) {
        console.log(error)
    }
}

export function* logoutUserSaga(action) {
    yield localStorage.removeItem('authToken');
    yield delete axios.defaults.headers.common['Authorization'];
    yield put(setUnauthenticated())
}

export function* authCheckStateSaga(action) {
    const authToken = yield localStorage.getItem('authToken');
    if (authToken) {
        const decodedToken = yield jwtDecode(authToken);
        if (decodedToken.exp * 1000 < Date.now() || !(decodedToken.exp)) {
            yield put(logoutUser());
            window.location.href = "/login";
        } else {
            yield put(setAuthenticated())
            axios.defaults.headers.common['Authorization'] = authToken;
            yield put(getUserData())
        }
    }
}

export function* changeImageSaga(action) {
    yield put(loadingUser());
    try {
        yield axios.post('/user/image', action.formData)
        yield put(getUserData())
        yield put(setMessage(MESSAGE_CHANGE_AVATAR))
    } catch (error) {
        console.log(error);
    }
}

export function* editUserDetailSaga(action) {
    yield put(loadingUser())
    try {
        yield axios.post('/user', action.userDetail)
        yield put(getUserData());
        yield put(setMessage(MESSAGE_UPDATE_USER));
    } catch (error) {
        console.log(error);
    }
}

export function* markNotificationsReadSaga(action) {
    try {
        yield axios.post('/notifications', action.notificationIds);
        yield put(markNotiReadSuccess());
    } catch (error) {
        console.log(error);
    }
}