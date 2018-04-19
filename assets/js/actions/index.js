import ActionTypes from './actionTypes';
import { Endpoints } from '../API'; 

const changeMenuTheme = (theme) => ({
    type: ActionTypes.CHANGE_MENU_THEME,
    data: {
        menuTheme: theme
    }
});

const updateLoginModal = (isOpen=false, isLogin=true) => ({
    type: ActionTypes.UPDATE_LOGIN_MODAL,
    data: {
        isOpen: isOpen,
        isLogin: isLogin
    }
});

const updateUserData = (key, value) => ({
    type: ActionTypes.UPDATE_USER_DATA,
    data: {
        key: key,
        value: value
    }
});

// const updateBulkUserData = (data) => ({
//     type: ActionTypes.UPDATE_BULK_USER_DATA,
//     data: data
// });

/*
 * API Requests as Thunks
 */

 // POST user info for specified authenticated user
const postUserInfo = (token, data) => (dispatch, getState) => {
    $.ajax({
        type: 'POST',
        url: Endpoints.UPDATE_USER_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            userToken: token,
            data: data
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

// FETCH user info for the authenticated user
const fetchUserInfo = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.FETCH_USER_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            userToken: token
        }
    }).done(res => {
        console.log(res);
        dispatch()
    }).fail(err => {
        console.log(err);
    });
}


export default {
    changeMenuTheme,
    updateLoginModal,
    updateUserData
};