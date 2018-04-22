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

/**
 *  postUserInfo: update user info for the active auth user
 *  @param {String} token
 *  @param {Object} data { key: value }
 */ 
const postUserInfo = (token, data) => (dispatch, getState) => {
    $.ajax({
        type: 'POST',
        url: Endpoints.UPDATE_USER_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            userData: data
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

/**
 * fetchUserInfo: get user info for the active auth user
 * @param {String} token
 */
const fetchUserInfo = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_USER_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log(res);
        dispatch(updateBulkUserData(res.data));
    }).fail(err => {
        console.log(err);
    });
}

/**
 * postInsuranceInfo: update insurance info for the active auth user
 * @param {String} token
 * @param {String} insuranceType
 * @param {Object} data: { key: value }
 */
const postInsuranceInfo = (token, insuranceType, data) => (dispatch, getState) => {
    $.ajax({
        type: 'POST',
        url: Endpoints.UPDATE_INSURANCE_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            insuranceType: insuranceType,
            insuranceData: data
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

/**
 * fetchInsuranceInfo: get specific insurance info for the active auth user
 * @param {String} token
 * @param {String} insuranceType
 */
const fetchInsuranceInfo = (token, insuranceType) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_INSURANCE_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            insuranceType: insuranceType
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

/**
 * fetchAllInsuranceInfo: get all insurance info for the active auth user
 * @param {String} token
 */
const fetchAllInsuranceInfo = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_ALL_INSURANCE_INFO,
        data: {
            csrfmiddlewaretoken: env.csrf_token
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

/**
 * fetchInsuranceQuote: get specific insurance quote info for the active auth user
 * @param {String} token
 * @param {String} insuranceType
 */
const fetchInsuranceQuote = (token, insuranceType) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_INSURANCE_QUOTE,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            insuranceType: insuranceType
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log(res);
    }).fail(err => {
        console.log(err);
    });
}

/**
 * fetchAllInsuranceQuote: get all insurance quote info for the active auth user
 * @param {String} token
 */
const fetchAllInsuranceQuote = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_ALL_INSURANCE_QUOTES,
        data: {
            csrfmiddlewaretoken: env.csrf_token
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
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