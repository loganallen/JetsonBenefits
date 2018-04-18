import ActionTypes from '../actions/actionTypes'

const initialState = {
  menuTheme: "themeWhite",
  user: null,
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
      console.log(action);
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
    default:
      return state;
  }
};

export default mainReducer;
