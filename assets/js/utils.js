/**
 * utils.js: A module for useful constants and functions across our application
 */

import keyMirror from "keymirror";

// base url for our api
const baseAPI = `http://${env.baseURL}/api`;

// mobile breakpoint in pixels
const MOBILE_BREAKPOINT = 768;

// constant for our specific api endpoints
export const Endpoints = {
  SIGNUP: `${baseAPI}/signup`,
  LOGIN: `${baseAPI}/login`,
  UPDATE_USER_INFO: `${baseAPI}/update-user-info`,
  GET_USER_INFO: `${baseAPI}/get-user-info`,
  UPDATE_INSURANCE_INFO: `${baseAPI}/update-insurance-info`,
  GET_INSURANCE_INFO: `${baseAPI}/get-insurance-info`,
  GET_ALL_INSURANCE_INFO: `${baseAPI}/get-all-insurance-info`,
  GET_INSURANCE_QUOTE: `${baseAPI}/get-insurance-quote`,
  GET_ALL_INSURANCE_QUOTES: `${baseAPI}/get-all-insurance-quotes`,
  GENERATE_INSURANCE_QUOTES: `${baseAPI}/generate-insurance-quotes`
};

// insurance type constants
export const InsuranceTypes = keyMirror({
  HEALTH: null,
  LIFE: null,
  DISABILITY: null,
  GENERAL: null
});

export const HealthConditions = ['poor', 'meh', 'good', 'excellent'];

export const MaritalStatus = keyMirror({
  single: null,
  married: null,
  divorced: null,
  widowed: null
});

export const Gender = keyMirror({
  male: null,
  female: null,
  none: null
});

/**
 * isMobile: returns true if the device is mobile, false otherwise
 * @param {Number} deviceWidth: the current device width
 * @return {Boolean}
 */
export const isMobile = (deviceWidth) => (deviceWidth <= MOBILE_BREAKPOINT || env.isMobile);