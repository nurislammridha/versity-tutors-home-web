import { transformTuitionDataFromApi } from "../../../public/function/globalFunction";
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
    email: "",
    phone: "",
    additionalPhone: "",
    whatsapp: "",
    gender: "",
    religion: "",
    language: [],
    //current location
    division: "",
    divisionId: "",
    divisionInfo: "",
    district: "",
    districtId: "",
    districtInfo: "",
    subDistrict: "",
    subDistrictId: "",
    subDistrictInfo: "",
    area: "",
    areaId: "",
    areaInfo: "",
    address: "",
    zipCode: "",
    //permanent location
    permanentDivision: "",
    permanentDivisionId: "",
    permanentDivisionInfo: "",
    permanentDistrict: "",
    permanentDistrictId: "",
    permanentDistrictInfo: "",
    permanentSubDistrict: "",
    permanentSubDistrictId: "",
    permanentSubDistrictInfo: "",
    permanentArea: "",
    permanentAreaId: "",
    permanentAreaInfo: "",
    permanentAddress: "",
    permanentZipCode: "",
    //parental info
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    localGuardianPhone: "",
    guardianRelationship: "",
    tutorBriefIntroduction: "",

  },
  divisionList: null,
  instituteTypeList: null,
  studyTypeList: null,
  bachelorInstituteNameList: null,
  postInstituteNameList: null,
  bachelorDepartmentNameList: null,
  postDepartmentNameList: null,
  districtList: null,
  permanentDistrictList: null,
  subDistrictList: null,
  permanentSubDistrictList: null,
  areaList: null,
  permanentAreaList: null,
  isPersonalLoading: false,
  isEducationLoading: false,
  isEducationUpdated: false,
  education: {
    sscInstituteName: "",
    sscMedium: "",
    sscGroup: "",
    sscSession: "",
    sscPassingYear: "",
    sscResult: "",
    hscInstituteName: "",
    hscMedium: "",
    hscGroup: "",
    hscSession: "",
    hscPassingYear: "",
    hscResult: "",
    bachelorInstituteType: "",
    bachelorInstituteTypeId: "",
    bachelorInstituteName: "",
    bachelorInstituteNameId: "",
    bachelorStudyType: "",
    bachelorStudyTypeId: "",
    bachelorDepartment: "",
    bachelorDepartmentId: "",
    bachelorMedium: "",
    bachelorSession: "",
    bachelorPassingYear: "",
    bachelorCgpa: "",
    //post mean post graduation
    postInstituteType: "",
    postInstituteTypeId: "",
    postInstituteName: "",
    postInstituteNameId: "",
    postStudyType: "",
    postStudyTypeId: "",
    postDepartment: "",
    postDepartmentId: "",
    postMedium: "",
    postSession: "",
    postPassingYear: "",
    postCgpa: "",
  },
  tuitionInfos: [{
    division: "",
    divisionId: null,
    district: "",
    districtId: null,
    subDistrict: "",
    subDistrictId: null,
    area: [],
    detailsAddress: "",
    className: "",
    classId: null,
    medium: "",
    group: "",
    subjects: [],
    daysPerWeek: [],
    daysPerMonth: [],
    timeDuration: [],
    timeShift: [],
    studentGender: "",
    tuitionExperience: "",
    tuitionExperienceLabel: "",
    expectedSalary: "",
    expectedSalaryLabel: "",
    isStudentHome: false,
    isMyHome: false,
    isOnline: false,
    isGroupStudy: false,
    isTakeDemoClass: true,
    demoClass: "",
    demoClassStyle: "",
    demoClassPricing: "",
    //for student extra added
    instituteType: "",
    instituteTypeId: null,
    instituteName: "",
    instituteNameId: null,
    studyType: "",
    studyTypeId: null,
    departmentName: "",
    departmentNameId: null,
    teacherReligion: "",
    expectedSalaryOnline: "",
    expectedSalaryOnlineLabel: "",
    expectedSalaryOffline: "",
    expectedSalaryOfflineLabel: "",
  }],
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
  isConnectionLoading: false,
  connectionData: null,
  icConnectionByClientLoading: false,
  connectionByClientData: null,
  isPackageBuying: false,
  isUnlockLoading: false,
  isStatusLoading: false,
  isUpdatedProfile: false,
  isHomeDataLoading: false,
  homeData: null,
  documentData: null,
  isDocumentLoading: false,
  isUploadDocumentLoading: false,
  isDeleteDocumentLoading: false,
  notificationList: null,
  falseUpdated: false,
  imageDeleteLoading: false,
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
    case Types.INSTITUTE_TYPE_LIST:
      return {
        ...state,
        instituteTypeList: action.payload,
      };
    case Types.STUDY_TYPE_LIST:
      return {
        ...state,
        studyTypeList: action.payload,
      };
    case Types.DISTRICT_LIST:
      return {
        ...state,
        districtList: action.payload,
      };
    case Types.PERMANENT_DISTRICT_LIST:
      return {
        ...state,
        permanentDistrictList: action.payload,
      };
    case Types.BACHELOR_INSTITUTE_NAME_LIST:
      return {
        ...state,
        bachelorInstituteNameList: action.payload,
      };
    case Types.POST_INSTITUTE_NAME_LIST:
      return {
        ...state,
        postInstituteNameList: action.payload,
      };
    case Types.BACHELOR_DEPARTMENT_NAME_LIST:
      return {
        ...state,
        bachelorDepartmentNameList: action.payload,
      };
    case Types.POST_DEPARTMENT_NAME_LIST:
      return {
        ...state,
        postDepartmentNameList: action.payload,
      };
    case Types.SUBDISTRICT_LIST:
      return {
        ...state,
        subDistrictList: action.payload,
      };
    case Types.PERMANENT_SUBDISTRICT_LIST:
      return {
        ...state,
        permanentSubDistrictList: action.payload,
      };
    case Types.AREA_LIST:
      return {
        ...state,
        areaList: action.payload,
      };
    case Types.PERMANENT_AREA_LIST:
      return {
        ...state,
        permanentAreaList: action.payload,
      };
    case Types.IS_PERSONAL_LOADING:
      return {
        ...state,
        isPersonalLoading: action.payload,
      };
    case Types.SET_PERSONAL_DATA:
      const { firstName, lastName, email, phone, additionalPhone, whatsapp, gender, religion, language, division, divisionId,
        divisionInfo, district, districtId, districtInfo, subDistrict, subDistrictId, subDistrictInfo, area,
        areaId, areaInfo, address, zipCode, permanentDivision, permanentDivisionId, permanentDivisionInfo,
        permanentDistrict, permanentDistrictId, permanentDistrictInfo, permanentSubDistrict, permanentSubDistrictId,
        permanentSubDistrictInfo, permanentArea, permanentAreaId, permanentAreaInfo, permanentAddress,
        permanentZipCode, fatherName, fatherPhone, motherName, motherPhone, localGuardianPhone, guardianRelationship,
        tutorBriefIntroduction } = action.payload;
      const personalSet = {
        firstName, lastName, email, phone, additionalPhone, whatsapp, gender, religion, language, division: divisionInfo?.divisionName, divisionId,
        divisionInfo: divisionId, district: districtInfo?.districtName, districtId, districtInfo: districtId, subDistrict: subDistrictInfo?.subDistrictName, subDistrictId, subDistrictInfo: subDistrictId, area: areaInfo?.areaName,
        areaId, areaInfo: areaId, address, zipCode, permanentDivision: permanentDivisionInfo?.divisionName, permanentDivisionId, permanentDivisionInfo: permanentDivisionId,
        permanentDistrict: permanentDistrictInfo?.districtName, permanentDistrictId, permanentDistrictInfo: permanentDistrictId, permanentSubDistrict: permanentSubDistrictInfo?.subDistrictName, permanentSubDistrictId,
        permanentSubDistrictInfo: permanentSubDistrictId, permanentArea: permanentAreaInfo?.areaName, permanentAreaId, permanentAreaInfo: permanentAreaId, permanentAddress,
        permanentZipCode, fatherName, fatherPhone, motherName, motherPhone, localGuardianPhone, guardianRelationship,
        tutorBriefIntroduction
      };
      return {
        ...state,
        personal: personalSet,
      };
    case Types.SET_EDUCATIONAL_DATA:
      const { sscInstituteName, sscMedium, sscGroup, sscSession, sscPassingYear,
        sscResult, hscInstituteName, hscMedium, hscGroup, hscSession, hscPassingYear,
        hscResult, bachelorInstituteType, bachelorInstituteTypeId, bachelorInstituteName,
        bachelorInstituteNameId, bachelorStudyType, bachelorStudyTypeId, bachelorDepartment,
        bachelorDepartmentId, bachelorMedium, bachelorSession, bachelorPassingYear, bachelorCgpa,
        postInstituteType, postInstituteTypeId, postInstituteName, postInstituteNameId,
        postStudyType, postStudyTypeId, postDepartment, postDepartmentId, postMedium, postSession,
        postPassingYear, postCgpa } = action.payload;
      const educationalSet = {
        sscInstituteName, sscMedium, sscGroup, sscSession, sscPassingYear,
        sscResult, hscInstituteName, hscMedium, hscGroup, hscSession, hscPassingYear,
        hscResult, bachelorInstituteType: bachelorInstituteTypeId?.instituteType, bachelorInstituteTypeId: bachelorInstituteTypeId?._id, bachelorInstituteName: bachelorInstituteNameId?.instituteName,
        bachelorInstituteNameId: bachelorInstituteNameId?._id, bachelorStudyType: bachelorStudyTypeId?.studyType, bachelorStudyTypeId: bachelorStudyTypeId?._id, bachelorDepartment: bachelorDepartmentId?.departmentName,
        bachelorDepartmentId: bachelorDepartmentId?._id, bachelorMedium, bachelorSession, bachelorPassingYear, bachelorCgpa,
        postInstituteType: postInstituteTypeId?.instituteType, postInstituteTypeId: postInstituteTypeId?._id, postInstituteName: postInstituteNameId?.instituteName, postInstituteNameId: postInstituteNameId?._id,
        postStudyType: postStudyTypeId?.studyType, postStudyTypeId: postStudyTypeId?._id, postDepartment: postDepartmentId?.departmentName, postDepartmentId: postDepartmentId?._id, postMedium, postSession,
        postPassingYear, postCgpa
      };
      return {
        ...state,
        education: educationalSet,
      };
    case Types.SET_TUITION_DATA:

      const tuitionInfoSet = transformTuitionDataFromApi(action.payload)
      return {
        ...state,
        tuitionInfos: tuitionInfoSet,
      };
    case Types.GET_EDUCATION_INPUT:
      const { name: eName, value: eValue } = action.payload
      const education = { ...state.education };
      education[eName] = eValue;
      return {
        ...state,
        education: education,
      };
    case Types.GET_TUITION_INPUT:
      const tuitionData = [...state.tuitionInfos];
      tuitionData[action.payload.index][action.payload.name] = action.payload.value;

      return {
        ...state,
        tuitionInfos: tuitionData,
      };
    case Types.ADD_TUITION_TAB:
      return {
        ...state,
        tuitionInfos: [
          ...state.tuitionInfos,
          action.payload, // should be a full tuition object
        ],
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
        isConnectionLoading: action.payload,
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
    case Types.IS_DOCUMENT_LOADING:
      return {
        ...state,
        isDocumentLoading: action.payload,
      };
    case Types.DOCUMENT_INFO:
      return {
        ...state,
        documentData: action.payload,
      };
    case Types.IS_UPLOAD_DOCUMENT_LOADING:
      return {
        ...state,
        isUploadDocumentLoading: action.payload,
      };
    case Types.IS_DELETE_DOCUMENT_LOADING:
      return {
        ...state,
        isDeleteDocumentLoading: action.payload,
      };
    case Types.NOTIFICATION_LIST:
      return {
        ...state,
        notificationList: action.payload,
      };
    case Types.FALSE_UPDATED:
      return {
        ...state,
        falseUpdated: action.payload,
      };
    case Types.IMAGE_DELETE_LOADING:
      return {
        ...state,
        imageDeleteLoading: action.payload,
      };

    default:
      break;
  }
  return newState;
};
export default CommonReducer;
