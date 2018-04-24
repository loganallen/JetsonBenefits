import ActionTypes from './actionTypes';
import { Endpoints } from '../utils';
import Auth from '../auth';

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

const updateUserAuth = (hasAuthToken, name='') => ({
    type: ActionTypes.UPDATE_USER_AUTH,
    data: {
        name: name,
        isAuth: hasAuthToken
    }
});

/**
 * Thunks for API requests
 */

/**
 * loginUser: attempt to login the user (generates auth token stored in sessionStorage.token)
 * @param {String} username 
 * @param {String} password 
 */
const loginUser = (username, password) => (dispatch, getState) => {
    // TODO: Validate username (email) w/ regex?
    let valid = true;

    if (valid) {
        Auth.login(username, password, (res) => {
            console.log(res);
            if (res.success) {
                dispatch(updateUserAuth(true, res.name));
                dispatch(updateLoginModal(false));
            } else {
                dispatch(updateUserAuth(false));
                // TODO: Display error message
                console.log(res.error);
            }
        });
    } else {
        // TODO: Display error message
        console.log('Invalid username & password');
    }
}

/**
 * signupUser: attempt to signup a new user (generates auth token stored in sessionStorage.token)
 * @param {Object} userData: { firstName, lastName, email, password }
 */
const signupUser = (userData) => (dispatch, getState) => {
    let valid = true; // TODO: Validate user input first

    if (valid) {
        Auth.signup(userData, (res) => {
            if (res.success) {
                dispatch(updateUserAuth(true, res.name));
                dispatch(updateLoginModal(false));
            } else {
                dispatch(updateUserAuth(false));
                // TODO: Display error message
                console.log(res.error);
            }
        })
    } else {
        // TODO: Display error message
        console.log('Invalid inputs');
    }
}

/**
 * logoutUser: logouts the active auth user
 */
const logoutUser = () => (dispatch, getState) => {
    Auth.logout();
    dispatch(updateUserAuth(false));
}

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
            userData: JSON.stringify(data)
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
        // dispatch(updateBulkUserData(res.data));
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
            insuranceData: JSON.stringify(data)
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
const fetchAllInsuranceQuotes = (token) => (dispatch, getState) => {
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
    loginUser,
    signupUser,
    logoutUser,
    postUserInfo,
    fetchUserInfo,
    postInsuranceInfo,
    fetchInsuranceInfo,
    fetchAllInsuranceInfo,
    fetchInsuranceQuote,
    fetchAllInsuranceQuotes
};