import ActionTypes from '../actions/actionTypes'

const initialState = {
  data: "hello",
  user: null,
  loginModal: {
    isOpen: false,
    isLogin: true
  }
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: {
          isOpen: action.data.willOpen,
          isLogin: action.data.isLogin ? action.data.isLogin : state.data.isLogin
        }
      };
    case ActionTypes.TOGGLE_LOGIN_MODAL_TYPE:
      return {
        ...state,
        loginModal: {
          ...state.loginModal,
          isLogin: !state.loginModal.isLogin
        }
      }
    default:
      return state;
  }
};

export default mainReducer;
