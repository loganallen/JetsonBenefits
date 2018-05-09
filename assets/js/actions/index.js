import ActionTypes from './actionTypes';
import { Endpoints, InsuranceTypes } from '../utils';
import Auth from '../auth';

/*
 * App actions
 */
const emitDeviceWidthUpdate = () => ({
    type: ActionTypes.EMIT_DEVICE_WIDTH_UPDATE,
    data: {
        deviceWidth: window.innerWidth
    }
});

const changeMenuTheme = (theme) => ({
    type: ActionTypes.CHANGE_MENU_THEME,
    data: {
        menuTheme: theme
    }
});

const updateLoginModal = (isOpen=false, isTypeLogin=true) => ({
    type: ActionTypes.UPDATE_LOGIN_MODAL,
    data: {
        isOpen: isOpen,
        isTypeLogin: isTypeLogin
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

const updateInsuranceData = (type, key, value) => ({
    type: ActionTypes.UPDATE_INSURANCE_DATA,
    data: {
        type: type,
        key: key,
        value: value
    }
});

const updateBulkInsuranceData = (type, data) => ({
    type: ActionTypes.UPDATE_BULK_INSURANCE_DATA,
    data: {
        type: type,
        data: data
    }
});

const updateUserAuth = (hasAuthToken, name='') => ({
    type: ActionTypes.UPDATE_USER_AUTH,
    data: {
        name: name,
        isAuth: hasAuthToken
    }
});

const updateInsuranceQuote = (insuranceType, quote) => ({
    type: ActionTypes.UPDATE_INSURANCE_QUOTE,
    data: {
        type: insuranceType,
        quote: quote
    }
})

const clearAllUserInfo = () => ({
    type: ActionTypes.CLEAR_ALL_USER_INFO,
    data: {}
});

/**
 * Thunks for API requests
 */

/**
 * loginUser: attempt to login the user (generates auth token stored in sessionStorage.token)
 * @param {String}   username 
 * @param {String}   password 
 * @param {Function} callback
 */
const loginUser = (username, password, callback) => (dispatch, getState) => {
    // TODO: Validate username (email) w/ regex?
    let valid = true;

    if (valid) {
        Auth.login(username, password, (res) => {
            if (res.success) {
                dispatch(updateUserAuth(true, res.name));
                dispatch(updateLoginModal(false));
                dispatch(fetchUserInfo());
                if (callback) { callback(true); }
            } else {
                dispatch(updateUserAuth(false));
                // TODO: Display error message
                console.log('loginUser FAILURE', res.error);
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
                let state = getState().app;
                dispatch(updateUserAuth(true, res.name));
                dispatch(updateLoginModal(false));
                dispatch(postUserInfo(state.userData));
                dispatch(postInsuranceInfo(InsuranceTypes.HEALTH));
                dispatch(postInsuranceInfo(InsuranceTypes.LIFE));
                dispatch(postInsuranceInfo(InsuranceTypes.DISABILITY));
            } else {
                dispatch(updateUserAuth(false));
                // TODO: Display error message
                console.log('signupUser ERROR', res.error);
            }
        })
    } else {
        // TODO: Display error message
        console.log('Invalid inputs');
    }
}

/**
 * logoutUser: logouts the active auth user
 * @param {Function} callback
 */
const logoutUser = (callback) => (dispatch, getState) => {
    Auth.logout();
    dispatch(updateUserAuth(false));
    dispatch(clearAllUserInfo());
    if (callback) { callback(true); }
}

/**
 *  postUserInfo: update user info for the active auth user
 */ 
const postUserInfo = () => (dispatch, getState) => {
    let token = Auth.authToken();
    let data = getState().app.userData;

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
        console.log('postUserInfo SUCCESS', res);
    }).fail(err => {
        console.log('postUserInfo FAILURE', err);
    });
}
/**
 * fetchUserInfo: get user info for the active auth user
 */
const fetchUserInfo = () => (dispatch, getState) => {
    let token = Auth.authToken();

    $.ajax({
        type: 'GET',
        url: Endpoints.GET_USER_INFO,
        data: {},
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        dispatch(updateBulkUserData(res.data));
    }).fail(err => {
        console.log('fetchUserInfo FAILURE', err);
    });
}

/**
 * postInsuranceInfo: update insurance info for the active auth user
 * @param {String} insuranceType
 */
const postInsuranceInfo = (insuranceType) => (dispatch, getState) => {
    let token = Auth.authToken();
    let data = getState().app.insuranceData[insuranceType];
    
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
        console.log('postInsuranceInfo SUCCESS', res);
    }).fail(err => {
        console.log('postInsuranceInfo FAILURE', err);
    });
}
/**
 * fetchInsuranceInfo: get specific insurance info for the active auth user
 * @param {String} insuranceType
 */
const fetchInsuranceInfo = (insuranceType) => (dispatch, getState) => {
    let token = Auth.authToken();

    $.ajax({
        type: 'GET',
        url: Endpoints.GET_INSURANCE_INFO,
        data: {
            insuranceType: insuranceType
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log('fetchInsuranceInfo SUCCESS', res);
        dispatch(updateBulkInsuranceData(insuranceType, res.data));
    }).fail(err => {
        console.log('fetchInsuranceInfo FAILURE', err);
    });
}

/**
 * fetchAllInsuranceInfo: get all insurance info for the active auth user
 */
const fetchAllInsuranceInfo = () => (dispatch, getState) => {
    let token = Auth.authToken();

    $.ajax({
        type: 'GET',
        url: Endpoints.GET_ALL_INSURANCE_INFO,
        data: {},
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log('fetchAllInsuranceInfo SUCCESS', res);
        // Update the data in state.app.insuranceData for each insuranceType
        Object.keys(res.data).forEach(insuranceType => {
            dispatch(updateBulkInsuranceData(insuranceType, res.data[insuranceType]));
        });
    }).fail(err => {
        console.log('fetchAllInsuranceInfo FAILURE', err);
    });
}

/**
 * fetchInsuranceQuote: get specific insurance quote info for the active auth user
 * @param {String} insuranceType
 */
const fetchInsuranceQuote = (insuranceType) => (dispatch, getState) => {
    let token = Auth.authToken();

    $.ajax({
        type: 'GET',
        url: Endpoints.GET_INSURANCE_QUOTE,
        data: {
            insuranceType: insuranceType
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log('fetchInsuranceQuote SUCCESS', res);
        dispatch(updateInsuranceQuote(insuranceType, res.data));
    }).fail(err => {
        console.log('fetchInsuranceQuote FAILURE', err);
    });
}

/**
 * fetchAllInsuranceQuotes: get all insurance quote info for the active auth user
 */
const fetchAllInsuranceQuotes = () => (dispatch, getState) => {
    let token = Auth.authToken();

    $.ajax({
        type: 'GET',
        url: Endpoints.GET_ALL_INSURANCE_QUOTES,
        data: {},
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        console.log('fetchAllInsuranceQuotes SUCCESS', res);
        // Update the quote in state.app.insuranceQuotes for each insuranceType
        Object.keys(res.data).forEach(insuranceType => {
            dispatch(updateInsuranceQuote(insuranceType, res.data[insuranceType]));
        });
    }).fail(err => {
        // TODO: Handle failure due to incomplete user inputs
        console.log('fetchAllInsuranceQuote FAILURE', err);
    });
}

/**
 * generateInsuranceQuotes: get all insurance quote info for the anonymous user
 */
const generateInsuranceQuotes = () => (dispatch, getState) => {
    let state = getState().app;
    let data = {
        GENERAL: state.userData,
        HEALTH: state.insuranceData[InsuranceTypes.HEALTH],
        LIFE: state.insuranceData[InsuranceTypes.LIFE],
        DISABILITY: state.insuranceData[InsuranceTypes.DISABILITY],
    }
    
    $.ajax({
        type: 'GET',
        url: Endpoints.GENERATE_INSURANCE_QUOTES,
        data: {
            userData: JSON.stringify(data)
        }
    }).done(res => {
        console.log('generateInsuranceQuotes SUCCESS', res);
        // Update the quote in state.app.insuranceQuotes for each insuranceType
        Object.keys(res.data).forEach(insuranceType => {
            dispatch(updateInsuranceQuote(insuranceType, res.data[insuranceType]));
        });
    }).fail(err => {
        // TODO: Handle failure due to incomplete user inputs
        console.log('generateInsuranceQuotes FAILURE', err);
    });
}


export default {
    emitDeviceWidthUpdate,
    changeMenuTheme,
    updateLoginModal,
    updateUserData,
    updateBulkUserData,
    updateInsuranceData,
    updateInsuranceQuote,
    loginUser,
    signupUser,
    logoutUser,
    postUserInfo,
    fetchUserInfo,
    postInsuranceInfo,
    fetchInsuranceInfo,
    fetchAllInsuranceInfo,
    fetchInsuranceQuote,
    fetchAllInsuranceQuotes,
    generateInsuranceQuotes
};