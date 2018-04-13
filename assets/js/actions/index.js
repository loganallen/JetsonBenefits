import ActionTypes from './actionTypes';

// these functions return an action

const toggleLoginModal = (type) => ({
    type: ActionTypes.TOGGLE_LOGIN_MODAL,
    data: {
        type: type
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
    toggleLoginModal,
    toggleLoginModalType,
    updateUserZipcode,
    updateUserAge
};