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
  personal: {
    firstName: "",
    lastName: "",
    tagline: "",
    hourlyFee: 0,
    divisionId: "",
    divisionInfo: "",
    // division: "",
    districtId: "",
    districtInfo: "",
    // district: "",
    subDistrictId: "",
    subDistrictInfo: "",
    // subDistrict: "",
    areaId: "",
    areaInfo: "",
    // area: "",
    zipCode: "",
    tutorBriefIntroduction: "",
    // languageId: "",
    // languageInfo: "",
    // language: "",
    address: "",
    isTeachingLocationOnline: false,
    isTeachingLocationTutorHome: false,
    isTeachingLocationStudentHome: false,
  },
  divisionList: null,
  districtList: null,
  subDistrictList: null,
  areaList: null,
  isPersonalLoading: false,
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
    case Types.GET_PERSONAL_INPUT:
      const { name: personalName, value: personalValue } = action.payload
      const personal = { ...state.personal };
      personal[personalName] = personalValue;
      return {
        ...state,
        personal: personal,
      };
    case Types.DIVISION_LIST:
      return {
        ...state,
        divisionList: action.payload,
      };
    case Types.DISTRICT_LIST:
      return {
        ...state,
        districtList: action.payload,
      };
    case Types.SUBDISTRICT_LIST:
      return {
        ...state,
        subDistrictList: action.payload,
      };
    case Types.AREA_LIST:
      return {
        ...state,
        areaList: action.payload,
      };
    case Types.IS_PERSONAL_LOADING:
      return {
        ...state,
        isPersonalLoading: action.payload,
      };
    case Types.SET_PERSONAL_DATA:
      const { firstName, lastName, tagline, hourlyFee, divisionId, divisionInfo, districtId, districtInfo, subDistrictId, subDistrictInfo, areaId, areaInfo, zipCode, tutorBriefIntroduction,
        isTeachingLocationOnline, isTeachingLocationTutorHome, isTeachingLocationStudentHome, address } = action.payload
      const personalSet = {
        firstName, lastName, tagline, hourlyFee, divisionId, divisionInfo, districtId, districtInfo, subDistrictId, subDistrictInfo, areaId, areaInfo, zipCode, tutorBriefIntroduction,
        isTeachingLocationOnline, isTeachingLocationTutorHome, isTeachingLocationStudentHome, address
      };
      return {
        ...state,
        personal: personalSet,
      };
    default:
      break;
  }
  return newState;
};
export default CommonReducer;
