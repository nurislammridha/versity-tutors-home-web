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
    gender: true
  },
  divisionList: null,
  districtList: null,
  subDistrictList: null,
  areaList: null,
  isPersonalLoading: false,
  isEducationUpdated: false,
  education: {
    degree: "",
    institute: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    isOngoing: false
  },
  educations: [],
  subject: {
    categoryId: "",
    categoryInfo: "",
    subCategories: []
  },
  subjects: [],
  categoryList: null,
  subCategoryList: null,
  isAvatarLoading: false,
  isProfilesLoading: false,
  isProfileDetailsLoading: false,
  filteredProfiles: null,
  profileDetails: null,
  isReviewLoading: false,
  isGetReviewLoading: false,
  isReviewSubmitted: false,
  reviewList: null,
  isBookLoading: false,
  isBookByBookerLoading: false,
  isUpdateBookLoading: false,
  bookByBooker: null,
  icConnectionLoading: false,
  connectionData: null,
  icConnectionByClientLoading: false,
  connectionByClientData: null,
  isPackageBuying: false,
  isUnlockLoading: false,
  isStatusLoading: false,
  isUpdatedProfile: false,
  isHomeDataLoading: false,
  homeData: null,
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
        isTeachingLocationOnline, isTeachingLocationTutorHome, isTeachingLocationStudentHome, address, gender } = action.payload
      const personalSet = {
        firstName, lastName, tagline, hourlyFee, divisionId, divisionInfo, districtId, districtInfo, subDistrictId, subDistrictInfo, areaId, areaInfo, zipCode, tutorBriefIntroduction,
        isTeachingLocationOnline, isTeachingLocationTutorHome, isTeachingLocationStudentHome, address, gender
      };
      return {
        ...state,
        personal: personalSet,
      };
    case Types.GET_EDUCATION_INPUT:
      const { name: eName, value: eValue } = action.payload
      const education = { ...state.education };
      education[eName] = eValue;
      return {
        ...state,
        education: education,
      };
    case Types.GET_SUBJECT_INPUT:
      const { name: sName, value: sValue } = action.payload
      const subject = { ...state.subject };
      if (sName === "subCategories") {
        if (sValue.length === 0) {
          subject.subCategories = []
        } else {
          subject.subCategories.push({
            subCategoryId: sValue,
            subCategoryInfo: sValue,
          })
        }

      } else if (sName === "remove") {
        subject.subCategories = subject.subCategories.filter(item => item.subCategoryId !== sValue)
      } else {
        subject[sName] = sValue;
      }
      return {
        ...state,
        subject: subject,
      };
    case Types.MODIFY_EDUCATIONS:
      return {
        ...state,
        educations: action.payload,
        education: { ...initialState.education }
      };
    case Types.MODIFY_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        subject: { ...initialState.subject }
      };
    case Types.IS_EDUCATION_UPDATED:
      return {
        ...state,
        isEducationUpdated: action.payload
      };
    case Types.SET_EDUCATION_UPDATE:
      return {
        ...state,
        education: action.payload
      };
    case Types.SET_SUBJECT_UPDATE:
      return {
        ...state,
        subject: action.payload
      };
    case Types.CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
      };
    case Types.SUB_CATEGORY_LIST:
      return {
        ...state,
        subCategoryList: action.payload,
      };
    case Types.IS_AVATAR_LOADING:
      return {
        ...state,
        isAvatarLoading: action.payload,
      };
    case Types.IS_PROFILES_LOADING:
      return {
        ...state,
        isProfilesLoading: action.payload,
      };
    case Types.FILTERED_PROFILES:
      return {
        ...state,
        filteredProfiles: action.payload,
      };
    case Types.PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload,
      };
    case Types.IS_PROFILE_DETAILS_LOADING:
      return {
        ...state,
        isProfileDetailsLoading: action.payload,
      };
    case Types.IS_REVIEW_LOADING:
      return {
        ...state,
        isReviewLoading: action.payload,
      };
    case Types.IS_GET_REVIEW_LOADING:
      return {
        ...state,
        isGetReviewLoading: action.payload,
      };
    case Types.REVIEW_LIST:
      return {
        ...state,
        reviewList: action.payload,
      };
    case Types.IS_REVIEW_SUBMITTED:
      return {
        ...state,
        isReviewSubmitted: action.payload,
      };
    case Types.IS_BOOK_LOADING:
      return {
        ...state,
        isBookLoading: action.payload,
      };
    case Types.IS_BOOK_BY_BOOKER_LOADING:
      return {
        ...state,
        isBookByBookerLoading: action.payload,
      };
    case Types.BOOK_BY_BOOKER:
      return {
        ...state,
        bookByBooker: action.payload,
      };
    case Types.IS_UPDATE_BOOK_LOADING:
      return {
        ...state,
        isUpdateBookLoading: action.payload,
      };
    case Types.IS_CONNECTION_LOADING:
      return {
        ...state,
        icConnectionLoading: action.payload,
      };
    case Types.CONNECTION_DATA:
      return {
        ...state,
        connectionData: action.payload,
      };
    case Types.CONNECTION_BY_CLIENT_DATA:
      return {
        ...state,
        connectionByClientData: action.payload,
      };
    case Types.IS_CONNECTION_BY_CLIENT_LOADING:
      return {
        ...state,
        icConnectionByClientLoading: action.payload,
      };
    case Types.IS_PACKAGE_BUYING_LOADING:
      return {
        ...state,
        isPackageBuying: action.payload,
      };
    case Types.IS_UNLOCK_LOADING:
      return {
        ...state,
        isUnlockLoading: action.payload,
      };
    case Types.IS_STATUS_LOADING:
      return {
        ...state,
        isStatusLoading: action.payload,
      };
    case Types.IS_UPDATED_PROFILE:
      return {
        ...state,
        isUpdatedProfile: action.payload,
      };
    case Types.IS_HOME_DATA_LOADING:
      return {
        ...state,
        isHomeDataLoading: action.payload,
      };
    case Types.HOME_DATA_INFO:
      return {
        ...state,
        homeData: action.payload,
      };

    default:
      break;
  }
  return newState;
};
export default CommonReducer;
