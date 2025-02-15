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
  isSignUpComplete
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
    default:
      break;
  }
  return newState;
};
export default CommonReducer;
