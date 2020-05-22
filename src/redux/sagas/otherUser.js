import axios from 'axios';
import { put } from 'redux-saga/effects';
import { loadingOtherUser, getOtherUserSuccess } from '../actions/otherUserReducers';

export function* getOtherUserSaga(action) {
    yield put(loadingOtherUser())
    try {
        const response = yield axios.get(`/user/${action.userHandle}`);
        yield put(getOtherUserSuccess(response.data))
    } catch (error) {
        console.log(error);
    }
}
