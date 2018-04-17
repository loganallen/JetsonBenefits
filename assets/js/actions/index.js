import ActionTypes from './actionTypes';

// these functions return an action

const changeMenuTheme = (theme) => ({
    type: ActionTypes.CHANGE_MENU_THEME,
    data: {
        menuTheme: theme
    }
});

const toggleLoginModal = (type) => ({
    type: ActionTypes.TOGGLE_LOGIN_MODAL,
    data: {
        willOpen: willOpen,
        isLogin: isLogin
    }
});

const toggleLoginModalType = () => ({
    type: ActionTypes.TOGGLE_LOGIN_MODAL_TYPE,
    data: {}
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
    toggleLoginModal,
    toggleLoginModalType,
    updateUserZipcode,
    updateUserAge
};