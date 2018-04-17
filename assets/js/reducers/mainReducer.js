import ActionTypes from '../actions/actionTypes'

const initialState = {
  data: "hello",
  menuTheme: "themeWhite",
  user: null,
  zipcode: '',
  age: '',
  loginModal: {
    isOpen: false,
    type: true
  }
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_MENU_THEME:
      return {
        ...state,
        menuTheme: action.data.menuTheme
      };
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
      };
    case ActionTypes.UPDATE_USER_ZIPCODE:
      return {
        ...state,
        zipcode: action.data.zipcode
      };
    case ActionTypes.UPDATE_USER_AGE:
      return {
        ...state,
        age: action.data.age
      };
    default:
      return state;
  }
};

export default mainReducer;
