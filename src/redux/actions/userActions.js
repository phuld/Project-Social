import { 
    SET_USER, 
    SET_UNAUTHENTICATED, 
    SET_AUTHENTICATED, 
    LOADING_USER, 
    MARK_NOTIFICATIONS_READ,  
    LOGIN_USER, 
    SIGNUP_USER, 
    GET_USER_DATA, 
    LOGOUT_USER,
    AUTH_CHECK_STATE,
    CHANGE_AVATAR,
    EDIT_USER, 
    MARK_NOTIFICATIONS_READ_SUCCESS,
    FOLLOW_USER,
    FOLLOW_USER_SUCCESS,
    UNFOLLOW_USER,
    UNFOLLOW_USER_SUCCESS
} from '../types';

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const getUserData = () => {
    return {
        type: GET_USER_DATA
    }
}

export const setUserData = (userData) => {
    return {
        type: SET_USER, 
        payload: userData
    }
}

export const loginUser = (userData, history) => {
    return {
        type: LOGIN_USER, 
        userData, 
        history
    }
}

export const signupUser = (userData) => {
    return {
        type: SIGNUP_USER, 
        userData
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const setAuthenticated = () => {
    return {
        type: SET_AUTHENTICATED
    }
}

export const setUnauthenticated = () => {
    return {
        type: SET_UNAUTHENTICATED
    }
}

export const authCheckState = () => {
    return {
        type: AUTH_CHECK_STATE
    }
}

export const changeImage = (formData) => {
    return {
        type: CHANGE_AVATAR, 
        formData
    }
}

export const editUserDetails = (userDetail) => {
    return {
        type: EDIT_USER, 
        userDetail
    }
}

export const markNotificationsRead = (notificationIds) => {
    return {
        type: MARK_NOTIFICATIONS_READ, 
        notificationIds
    }
}

export const markNotiReadSuccess = () => {
    return {
        type: MARK_NOTIFICATIONS_READ_SUCCESS
    }
}

export const followUser = (userHandle) => {
    return {
        type: FOLLOW_USER, 
        userHandle
    }
}

export const followUserSuccess = (followData) => {
    return {
        type: FOLLOW_USER_SUCCESS, 
        payload: followData
    }
}

export const unfollowUser = (userHandle) => {
    return {
        type: UNFOLLOW_USER, 
        userHandle
    }
}

export const unfollowUserSuccess = (userHandle) => {
    return {
        type: UNFOLLOW_USER_SUCCESS, 
        payload: userHandle
    }
}