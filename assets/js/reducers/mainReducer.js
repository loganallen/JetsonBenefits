import ActionTypes from '../actions/actionTypes'

const initialState = {
  data: "hello",
  user: null,
  loginModal: {
    isOpen: false,
    type: true
  }
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: {
          isOpen: !state.loginModal.isOpen,
          type: action.data.type
        }
      };
    case ActionTypes.TOGGLE_LOGIN_MODAL_TYPE:
      return {
        ...state,
        loginModal: {
          isOpen: state.loginModal.isOpen,
          type: !state.loginModal.type
        }
      }
    default:
      return state;
  }
};

export default mainReducer;
