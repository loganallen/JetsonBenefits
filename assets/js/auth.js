// frontent authentication module

// login api endpoint
const tokenURL = `http://${env.baseURL}/api/signin`;
const signUpURL = `http://${env.baseURL}/api/signup`;

/**
 * login: attempts to login with given username and password
 * @param {String} username
 * @param {String} password
 * @param {Function} callback
 */
const login = function login(username, password, callback) {
    if (sessionStorage.token) {
        if (callback) callback(true);
        return;
    } else {
        getToken(username, password, (res) => {
            if (res.success) { 
                sessionStorage.token = res.token
                if (callback) callback(true);
            } else {
                if (callback) callback(false);
            }
        });
    }
};

/**
 * signUp: attempts to signUp the user with the given information
 * @param {Object} userData: { firstName, lastName, email, password }
 * @param {Function} callback
 */
const signUp = function signUp(userData, callback) {
    $.ajax({
        type: 'POST',
        url: signUpURL,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password
        },
        success: (res) => {
            callback({
                authenticated: true,
                token: res.token
            });
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
 * loggedIn: returns true if logged in, false otherwise
 * @return {Boolean}
 */
const loggedIn = function loggedIn() {
    return !!sessionStorage.token;
};

/**
 * token: returns the currently stored token, will be undefined if doesn't exist
 * @return {String | undefined}
 */
const token = function token() {
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
        url: tokenURL,
        data: {
            csrfmiddlewaretoken: env.csrf_token,
            username: username,
            password: password
        },
        success: (res) => {
            callback({
                authenticated: true,
                token: res.token
            });
        }
    });
};

module.exports = {
    login,
    logout,
    loggedIn,
    token,
    getToken
}