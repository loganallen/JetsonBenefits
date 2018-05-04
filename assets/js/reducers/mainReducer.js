import ActionTypes from '../actions/actionTypes';
import { isLoggedIn } from '../auth';

const initialState = {
  menuTheme: "themeWhite",
  deviceWidth: window.innerWidth,
  user: {
    name: '',
    isAuth: isLoggedIn()
  },
  userData: {
    age: '',
    zipcode: '',
    marital_status: '',
    spouse_age: '',
    spouse_annual_income: '',
    num_kids: '',
    kid_ages: [],
    annual_income: '',
    health_condition: ''
  },
  loginModal: {
    isOpen: false,
    isLogin: true
  }
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMIT_DEVICE_WIDTH_UPDATE:
      return {
        ...state,
        deviceWidth: action.data.deviceWidth
      };
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
      if (action.data.key === 'kid_ages') {
        // TODO: This yields warning but not sure why
        updatedValue = [ ...state.userData.kid_ages ];
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
    case ActionTypes.UPDATE_USER_AUTH:
      return {
        ...state,
        user: action.data
      }
    default:
      return state;
  }
};

export default mainReducer;
