// frontent authentication module
import { Endpoints } from './utils';

/**
 * login: attempts to login with given username and password
 * @param {String} username
 * @param {String} password
 * @param {Function} callback
 */
const login = function login(username, password, callback) {
    if (sessionStorage.token) {
        if (callback) callback({ success: true, error: '' });
        return;
    } else {
        getToken(username, password, (res) => {
            if (res.authenticated) { sessionStorage.token = res.token  }
            
            if (callback) {
                callback({ 
                    success: res.authenticated,
                    name: res.name,
                    error: res.error 
                });
            }
        });
    }
};

/**
 * signup: attempts to signup the user with the given information
 * @param {Object} userData: { firstName, lastName, email, password }
 * @param {Function} callback
 */
const signup = function signup(userData, callback) {
    $.ajax({
        type: 'POST',
        url: Endpoints.SIGNUP,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password
        },
        success: (res) => {
            if (res.success) { sessionStorage.token = res.token; }

            if (callback) {
                callback({
                    success: res.success,
                    name: userData.firstName,
                    error: res.error
                });
            }
        }
    });
};

/**
 * logout: logs user out by deleting client side api token
 */
const logout = function logout() {
    delete sessionStorage.token
};

/**
 * isAuthenticated: returns true if logged in, false otherwise
 * @return {Boolean}
 */
const isAuthenticated = function isAuthenticated() {
    return !!sessionStorage.token;
};

/**
 * authToken: returns the currently stored auth token or undefined if it does not exist
 * @return {String | undefined}
 */
const authToken = function authToken() {
    return sessionStorage.token;
};

/**
 * getToken: makes a server request to retrieve a users token
 * @param {String} username
 * @param {String} password
 * @param {Function} callback
 */
const getToken = function getToken(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: Endpoints.LOGIN,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            username: username,
            password: password
        },
        success: (res) => {
            callback({
                authenticated: res.success,
                token: res.token === '' ? null : res.token,
                name: res.name === '' ? null : res.name,
                error: res.error
            });
        }
    });
};

module.exports = {
    login,
    logout,
    isAuthenticated,
    signup,
    authToken,
    getToken
}