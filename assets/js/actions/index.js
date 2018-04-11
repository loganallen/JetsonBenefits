import ActionTypes from './actionTypes';

// these functions return an action

const toggleLoginModal = (willOpen, isLogin) => ({
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

export default {
    toggleLoginModal,
    toggleLoginModalType
};