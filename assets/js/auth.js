// frontent authentication module

const tokenURL = '';

const login = function login(username, password, callback) {
    if (sessionStorage.token) {
        if (callback) callback(true);
        return;
    } else {
        getToken(username, password, (res) => {
            if (res.authenticated) { 
                sessionStorage.token = res.token
                if (callback) callback(true);
            } else {
                if (callback) callback(false);
            }
        });
    }
};

const logout = function logout() {
    delete sessionStorage.token
};

const loggedIn = function loggedIn() {
    return !!sessionStorage.token;
};

const getToken = function getToken(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: tokenURL,
        data: {
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
    getToken
}