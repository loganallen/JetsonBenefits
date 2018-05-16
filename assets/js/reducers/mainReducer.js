import ActionTypes from '../actions/actionTypes';
import { isAuthenticated } from '../auth';
import { InsuranceTypes, MaritalStatus } from '../utils';

const initialState = {
  menuTheme: "themeWhite",
  deviceWidth: window.innerWidth,
  user: {
    name: '',
    isAuth: isAuthenticated()
  },
  userData: {
    age: '',
    zipcode: '',
    gender: '',
    marital_status: '',
    spouse_age: '',
    spouse_annual_income: '',
    num_kids: '',
    kid_ages: [],
    annual_income: '',
    health_condition: ''
  },
  insuranceData: {
    [InsuranceTypes.HEALTH]: {
      q_1: '',
      q_2: '',
      q_5: '',
      q_6: '',
      q_7: '',
      q_8: '',
      q_9: '',
      q_10: '',
      q_11: '',
      q_12: ''
    },
    [InsuranceTypes.LIFE]: {
      mortgage_balance: '',
      other_debts_balance: '',
      existing_life_insurance: '',
      balance_investings_savings: '',
    },
    [InsuranceTypes.DISABILITY]: {}
  },
  insuranceQuotes: {
    [InsuranceTypes.HEALTH]: {
      carrier: '',
      deductible: '',
      deductible_level: '',
      has_spouse: '',
      health_plan_id: '',
      medal: '',
      monthly_premium: '',
      num_kids: '',
      plan_name: '',
      plan_type: ''
    },
    [InsuranceTypes.LIFE]: {
      age: '',
      carrier: '',
      gender: '',
      life_plan_id: '',
      monthly: '',
      policy_amount: '',
      policy_term: ''
    },
    [InsuranceTypes.DISABILITY]: {
      benefit_amount: '',
      duration: '',
      monthly: ''
    }
  },
  loginModal: {
    isOpen: false,
    isTypeLogin: true
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
      if (action.data.key === 'num_kids') { 
        if (action.data.value == 0) {
          // Clear kid_ages since no kids
          updatedUserData['kid_ages'] = [];
        } else {
          // Make empty array of length = num_kids
          let numKids = parseInt(action.data.value);
          updatedUserData['kid_ages'] = (new Array(numKids)).fill('');
        }
      }
      else if (action.data.key === 'kid_ages') {
        let ages = [ ...state.userData.kid_ages ];
        ages[action.data.value.idx] = action.data.value.age;
        updatedValue = ages;
      }
      else if (action.data.key === 'marital_status' && action.data.value !== MaritalStatus.married) {
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
      return {
        ...state,
        userData: updatedUserData
      };
    }
    case ActionTypes.UPDATE_INSURANCE_DATA:
      let updatedInsuranceItem = { ...state.insuranceData[action.data.type] };
      updatedInsuranceItem[action.data.key] = action.data.value;
      return {
        ...state,
        insuranceData: {
          ...state.insuranceData,
          [action.data.type]: updatedInsuranceItem
        }
      };
    case ActionTypes.UPDATE_BULK_INSURANCE_DATA: {
      let updatedInsuranceData = { ...state.insuranceData[action.data.type]};
      Object.keys(action.data.data).forEach(key => {
        updatedInsuranceData[key] = action.data.data[key];
      });
      return {
        ...state,
        insuranceData: {
          ...state.insuranceData,
          [action.data.type]: updatedInsuranceData
        }
      }
    }
    case ActionTypes.UPDATE_USER_AUTH:
      return {
        ...state,
        user: action.data
      }
    case ActionTypes.UPDATE_INSURANCE_QUOTE: {
      let insuranceType = action.data.type;
      return {
        ...state,
        insuranceQuotes: {
          ...state.insuranceQuotes,
          [insuranceType]: action.data.quote
        }
      }
    }
    case ActionTypes.CLEAR_ALL_USER_INFO:
      return {
        ...state,
        userData: initialState.userData,
        insuranceData: initialState.insuranceData,
        insuranceQuotes: initialState.insuranceQuotes
      }
    default:
      return state;
  }
};

export default mainReducer;
