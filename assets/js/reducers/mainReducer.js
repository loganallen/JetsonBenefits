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
    case ActionTypes.UPDATE_USER_DATA: {
      let updatedUserData = { ...state.userData };
      let updatedValue = action.data.value;
      if (action.data.key === 'num_kids' && action.data.value == 0) {
        // Clear kid_ages since no kids
        updatedUserData['kid_ages'] = [];
      }
      else if (action.data.key === 'kid_ages') {
        let ages = [ ...state.userData.kid_ages ];
        ages[action.data.value.idx] = action.data.value.age;
        updatedValue = ages;
      }
      else if (action.data.key === 'marital_status' && action.data.value !== 'married') {
        // Clear spouse data since not married
        updatedUserData['spouse_age'] = '';
        updatedUserData['spouse_annual_income'] = '';
      }
      updatedUserData[action.data.key] = updatedValue;
      return {
        ...state,
        userData: updatedUserData
      };
    }
    case ActionTypes.UPDATE_BULK_USER_DATA: {
      let updatedUserData = { ...state.userData };
      Object.keys(action.data).forEach(key => {
        if (Object.keys(state.userData).includes(key)) { 
          updatedUserData[key] = action.data[key];
        }
      });
      console.log('Update bulk', updatedUserData);
      return {
        ...state,
        userData: updatedUserData
      };
    }
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
