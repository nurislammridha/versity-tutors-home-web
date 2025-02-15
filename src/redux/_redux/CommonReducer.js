import * as Types from "./Types";

const initialState = {
  signUpInput: {
    firstName: "",
    lastName: "",
    mailOrPhone: "",
    password: "",
    cPassword: "",
    isTutorAccount: false,
    isReadTC: false
  },
  isEmailOtpLoading: false,
  isEmailOtpComplete: false,
  isSignUpLoading: false,
  isSignUpComplete: false,
  isLoginComplete: false,
  isLoginLoading: false,
  isCheckBuyerLoading: false,
  isCheckBuyerCompleted: false,
  isSetPasswordLoading: false,
  isSetPasswordComplete: false,
  isCreatePasswordLoading: false,
  isPasswordCreated: false,
};
const CommonReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_SIGNUP_INPUT:
      const { name, value } = action.payload
      const signUpInput = { ...state.signUpInput };
      signUpInput[name] = value;
      return {
        ...state,
        signUpInput: signUpInput,
      };
    case Types.IS_EMAIL_OTP_LOADING:
      return {
        ...state,
        isEmailOtpLoading: action.payload,
      };
    case Types.EMAIL_OTP_CREATED:
      return {
        ...state,
        isEmailOtpComplete: action.payload,
      };
    case Types.IS_SIGNUP_LOADING:
      return {
        ...state,
        isSignUpLoading: action.payload,
      };
    case Types.IS_SIGNUP_COMPLETE:
      return {
        ...state,
        isSignUpComplete: action.payload,
      };
    case Types.IS_LOGIN_COMPLETE:
      return {
        ...state,
        isLoginComplete: action.payload,
      };
    case Types.IS_LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: action.payload,
      };
    case Types.IS_CHECK_BUYER_LOADING:
      return {
        ...state,
        isCheckBuyerLoading: action.payload,
      };
    case Types.CHECK_BUYER_COMPLETED:
      return {
        ...state,
        isCheckBuyerCompleted: action.payload,
      };
    case Types.IS_SET_PASSWORD_LOADING:
      return {
        ...state,
        isSetPasswordLoading: action.payload,
      };
    case Types.SET_PASSWORD_COMPLETE:
      return {
        ...state,
        isSetPasswordComplete: action.payload,
      };
    case Types.IS_CREATE_PASSWORD_LOADING:
      return {
        ...state,
        isCreatePasswordLoading: action.payload,
      };
    case Types.PASSWORD_CREATED:
      return {
        ...state,
        isPasswordCreated: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default CommonReducer;
