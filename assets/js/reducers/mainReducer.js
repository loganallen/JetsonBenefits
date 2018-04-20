import ActionTypes from '../actions/actionTypes'
import Auth from '../auth'

const initialState = {
  menuTheme: "themeWhite",
  user: {
    loggedIn: Auth.loggedIn()
  },
  userData: {
    age: '',
    zipcode: '',
    marriageStatus: '',
    spouseAge: '',
    numKids: '',
    kidAges: [],
    income: '',
    healthCondition: ''
  },
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
    case ActionTypes.UPDATE_USER_DATA:
      var updatedValue = action.data.value;
      if (action.data.key === 'kidAges') {
        // TODO: This yields warning but not sure why
        updatedValue = [ ...state.userData.kidAges ];
        updatedValue[action.data.value.idx] = action.data.value.age;
      }
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.data.key]: updatedValue
        }
      };
    case ActionTypes.UPDATE_BULK_USER_DATA:
      let updatedUserData = { ...state.userData };
      // TODO: Walk through action.data and update each key/value pair
      return {
        ...state,
        userData: updatedUserData
      };
    default:
      return state;
  }
};

export default mainReducer;
