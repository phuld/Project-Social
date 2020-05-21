import { takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER, 
    SIGNUP_USER, 
    GET_USER_DATA, 
    LOGOUT_USER,
    AUTH_CHECK_STATE,
    CHANGE_AVATAR,
    EDIT_USER,
    MARK_NOTIFICATIONS_READ
} from '../types';
import { 
    loginUserSaga, 
    signupUserSaga, 
    getUserDataSaga, 
    logoutUserSaga,
    authCheckStateSaga,
    changeImageSaga,
    editUserDetailSaga,
    markNotificationsReadSaga
} from '../sagas/user';

export function* watchAuth() {
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(SIGNUP_USER, signupUserSaga);
    yield takeEvery(GET_USER_DATA, getUserDataSaga);
    yield takeEvery(LOGOUT_USER, logoutUserSaga);
    yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga);
    yield takeEvery(CHANGE_AVATAR, changeImageSaga);
    yield takeEvery(EDIT_USER, editUserDetailSaga);
    yield takeEvery(MARK_NOTIFICATIONS_READ, markNotificationsReadSaga);
}