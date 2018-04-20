import ActionTypes from './actionTypes';
import { Endpoints } from '../utils'; 

/*
 * App actions
 */
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

// data: { key: value } object
const updateBulkUserData = (data) => ({
    type: ActionTypes.UPDATE_BULK_USER_DATA,
    data: data
});

/*
 * Thunks for API requests
 */

 // POST updated user info for the active auth user
const postUserInfo = (token, data) => (dispatch, getState) => {
    $.ajax({
        type: 'POST',
        url: Endpoints.UPDATE_USER_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            apiToken: token,
            userData: data
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

// FETCH user info for the active auth user
const fetchUserInfo = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_USER_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            apiToken: token
        }
    }).done(res => {
        console.log(res);
        dispatch(updateBulkUserData(res.data));
    }).fail(err => {
        console.log(err);
    });
}

// POST updated insurance info for the active auth user
const postInsuranceInfo = (token, insuranceType, data) => (dispatch, getState) => {
    $.ajax({
        type: 'POST',
        url: Endpoints.UPDATE_INSURANCE_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            apiToken: token,
            insuranceType: insuranceType,
            insuranceData: data
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

// FETCH specific insurance info for the active auth user
const fetchInsuranceInfo = (token, insuranceType) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_INSURANCE_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            apiToken: token,
            insuranceType: insuranceType
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

// FETCH all insurance info for the active auth user
const fetchAllInsuranceInfo = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_ALL_INSURANCE_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            apiToken: token
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

// FETCH specific insurance quote info for the active auth user
const fetchInsuranceQuote = (token, insuranceType) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_INSURANCE_QUOTE,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            apiToken: token,
            insuranceType: insuranceType
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

// FETCH all insurance quote info for the active auth user
const fetchAllInsuranceQuote = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_ALL_INSURANCE_QUOTES,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            apiToken: token
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}


export default {
    changeMenuTheme,
    updateLoginModal,
    updateUserData,
    postUserInfo
};