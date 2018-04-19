// frontent authentication module

const tokenURL = `http://${env.baseURL}/api/signin`;

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

const logout = function logout() {
    delete sessionStorage.token
};

const loggedIn = function loggedIn() {
    return !!sessionStorage.token;
};

const token = function token() {
    return sessionStorage.token;
};

const getToken = function getToken(username, password, callback) {
    $.ajax({
        type: 'POST',
        url: tokenURL,
        data: {
            csrfmiddlewaretoken: env.crsf_token,
            username: username,
            password: password
        },
        success: (res) => {
            console.log(res);
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