import axios from 'axios';
import { put } from 'redux-saga/effects';
import {
    loadingData,
    getScreamsbyPageSuccess,
    getScreamSuccess,
    likeScreamSuccess,
    unlikeScreamSuccess,
    deleteScreamSuccess,
    postScreamSuccess,
    submitCommentSuccess,
    getNumberScreamsByUserSuccess,
    editScreamSuccess,
    getNumberScreamsSuccess,
    blockScreamSuccess
} from '../actions/dataActions'
import {
    loadingUI,
    stopLoadingUI,
    setMessage,
    clearError,
    setError
} from '../actions/uiActions';
import {
    MESSAGE_LIKE_SCREAM,
    MESSAGE_UNLIKE_SCREAM,
    MESSAGE_DELETE_SCREAM,
    MESSAGE_CREATE_SCREAM,
    MESSAGE_COMMENT_SCREAM,
    MESSAGE_EDIT_SCREAM,
    MESSAGE_BLOCK_SCREAM
} from '../messages';

export function* getScreamsByPageSaga(action) {
    yield put(loadingData())
    try {
        const response = yield axios.get(`/screams/${action.currentType}/page/${action.currentNumber}`)
        yield put(getScreamsbyPageSuccess(response.data, action.currentType, action.currentNumber))
    } catch (error) {
        console.log(error)
    }
}

export function* getOneScreamSaga(action) {
    yield put(loadingUI())
    try {
        const response = yield axios.get(`/scream/${action.screamId}`)
        yield put(getScreamSuccess(response.data))
        yield put(stopLoadingUI());
    } catch (error) {
        console.log(error);
    }
}

export function* likeScreamSaga(action) {
    try {
        const response = yield axios.get(`/scream/${action.screamId}/like`)
        yield put(likeScreamSuccess(response.data))
        yield put(setMessage(MESSAGE_LIKE_SCREAM))
    } catch (error) {
        console.log(error);
    }
}

export function* unlikeScreamSaga(action) {
    try {
        const response = yield axios.get(`/scream/${action.screamId}/unlike`)
        yield put(unlikeScreamSuccess(response.data))
        yield put(setMessage(MESSAGE_UNLIKE_SCREAM))
    } catch (error) {
        console.log(error);
    }
}

export function* deleteScreamSaga(action) {
    try {
        yield axios.delete(`/scream/${action.screamId}`)
        yield put(deleteScreamSuccess(action.screamId))
        yield put(setMessage(MESSAGE_DELETE_SCREAM))
    } catch (error) {
        console.log(error)
    }
}

export function* postScreamSaga(action) {
    yield put(loadingUI());
    try {
        const response = yield axios.post('/scream', action.newScream)
        yield put(postScreamSuccess(response.data));
        yield put(clearError());
        yield put(setMessage(MESSAGE_CREATE_SCREAM));
    } catch (error) {
        yield put(setError(error.response.data))
    }
}

export function* submitCommentSaga(action) {
    yield put(loadingUI())
    try {
        const response = yield axios.post(`/scream/${action.screamId}/comment`, action.commentData)
        yield put(submitCommentSuccess(response.data));
        yield put(stopLoadingUI());
        yield put(setMessage(MESSAGE_COMMENT_SCREAM));
    } catch (error) {
        yield put(setError(error.response.data))
    }
}

export function* getScreamsByUserSaga(action) {
    yield put(loadingData());
    try {
        const response = yield axios.get(`/user/${action.userHandle}/screams/${action.currentType}/page/${action.currentPage}`);
        yield put(getScreamsbyPageSuccess(response.data, action.currentType, action.currentPage))
    } catch (error) {
        console.log(error);
    }
}

export function* getNumberScreamsByUserSaga(action) {
    try {
        const response = yield axios.get(`/${action.userHandle}/number-screams`);
        yield put(getNumberScreamsByUserSuccess(response.data.number))
    } catch (error) {

    }
}

export function* editScreamSaga(action) {
    yield put(loadingUI())
    try {
        const response = yield axios.post(`/scream/${action.screamId}/edit`, action.screamData);
        yield put(editScreamSuccess(response.data));
        yield put(stopLoadingUI())
        yield put(setMessage(MESSAGE_EDIT_SCREAM))
    } catch (error) {
        yield put(setError(error.response.data))
    }
}

export function* getNumberScreamsSaga(action) {
    try {
        const response = yield axios.get('/number-screams');
        yield put(getNumberScreamsSuccess(response.data.number))
    } catch (error) {
        console.log(error);
    }
}

export function* blockScreamSaga(action) {
    try {
        const response = yield axios.get(`/scream/${action.screamId}/block`);
        yield put(blockScreamSuccess(response.data));
        yield put(setMessage(MESSAGE_BLOCK_SCREAM));
    } catch (error) {
        console.log(error);
    }
}