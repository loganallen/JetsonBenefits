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

export default {
    toggleLoginModal,
    toggleLoginModalType
};