import { takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER, 
    SIGNUP_USER, 
    GET_USER_DATA, 
    LOGOUT_USER,
    AUTH_CHECK_STATE,
    CHANGE_AVATAR,
    EDIT_USER,
    MARK_NOTIFICATIONS_READ,
    GET_SCREAMS_BY_PAGE_START,
    GET_SCREAM_START,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    SUBMIT_COMMENT,
    GET_OTHER_USER,
    GET_SCREAMS_BY_USER,
    GET_NUMBER_SCREAMS_BY_USER,
    EDIT_SCREAM,
    GET_NUMBER_SCREAMS,
    BLOCK_SCREAM,
    FOLLOW_USER,
    UNFOLLOW_USER
} from '../types';
import { 
    loginUserSaga, 
    signupUserSaga, 
    getUserDataSaga, 
    logoutUserSaga,
    authCheckStateSaga,
    changeImageSaga,
    editUserDetailSaga,
    markNotificationsReadSaga,
    followUserSaga,
    unfollowUserSaga
} from '../sagas/user';
import { 
    getScreamsByPageSaga, 
    getOneScreamSaga, 
    likeScreamSaga, 
    unlikeScreamSaga,
    deleteScreamSaga,
    postScreamSaga,
    submitCommentSaga,
    getScreamsByUserSaga,
    getNumberScreamsByUserSaga,
    editScreamSaga, 
    getNumberScreamsSaga,
    blockScreamSaga
} from './data';
import { getOtherUserSaga } from './otherUser';

export function* watchAuth() {
    //User Saga
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(SIGNUP_USER, signupUserSaga);
    yield takeEvery(GET_USER_DATA, getUserDataSaga);
    yield takeEvery(LOGOUT_USER, logoutUserSaga);
    yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga);
    yield takeEvery(CHANGE_AVATAR, changeImageSaga);
    yield takeEvery(EDIT_USER, editUserDetailSaga);
    yield takeEvery(MARK_NOTIFICATIONS_READ, markNotificationsReadSaga);
    yield takeEvery(FOLLOW_USER, followUserSaga);
    yield takeEvery(UNFOLLOW_USER, unfollowUserSaga);

    //Data Saga
    yield takeEvery(GET_SCREAMS_BY_PAGE_START, getScreamsByPageSaga);
    yield takeEvery(GET_SCREAM_START, getOneScreamSaga);
    yield takeEvery(LIKE_SCREAM, likeScreamSaga);
    yield takeEvery(UNLIKE_SCREAM, unlikeScreamSaga);
    yield takeEvery(DELETE_SCREAM, deleteScreamSaga);
    yield takeEvery(POST_SCREAM, postScreamSaga);
    yield takeEvery(SUBMIT_COMMENT, submitCommentSaga);
    yield takeEvery(GET_SCREAMS_BY_USER, getScreamsByUserSaga);
    yield takeEvery(GET_NUMBER_SCREAMS_BY_USER, getNumberScreamsByUserSaga);
    yield takeEvery(EDIT_SCREAM, editScreamSaga);
    yield takeEvery(GET_NUMBER_SCREAMS, getNumberScreamsSaga);
    yield takeEvery(BLOCK_SCREAM, blockScreamSaga);
    //Other User Saga
    yield takeEvery(GET_OTHER_USER, getOtherUserSaga);
}