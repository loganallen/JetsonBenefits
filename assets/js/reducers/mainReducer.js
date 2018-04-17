import ActionTypes from '../actions/actionTypes'

const initialState = {
  data: "hello",
  menuTheme: "themeWhite",
  user: null,
  zipcode: '',
  age: '',
  loginModal: {
    isOpen: false,
    isLogin: true
  }
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_MENU_THEME:
      return {
        ...state,
        menuTheme: action.data.menuTheme
      };
    case ActionTypes.UPDATE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: action.data
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
