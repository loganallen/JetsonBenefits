import ActionTypes from './actionTypes';

// these functions return an action

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

const updateUserZipcode = (zipcode) => ({
    type: ActionTypes.UPDATE_USER_ZIPCODE,
    data: {
        zipcode: zipcode
    }
});

const updateUserAge = (age) => ({
    type: ActionTypes.UPDATE_USER_AGE,
    data: {
        age: age
    }
});

export default {
    changeMenuTheme,
    updateLoginModal,
    updateUserZipcode,
    updateUserAge
};