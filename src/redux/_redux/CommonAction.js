import { showToast } from "../../utils/ToastHelper";
import * as Types from "./Types";
import Axios from "axios";
export const GetSignUpInput = (name, value) => (dispatch) => {
    const formValue = { name, value }
    dispatch({ type: Types.GET_SIGNUP_INPUT, payload: formValue });
};
export const sendEmailOtp = (data) => (dispatch) => {
    const { firstName, lastName, mailOrPhone, password, cPassword, isTutorAccount, isReadTC } = data
    // console.log('data', data)
    if (firstName.length === 0) {
        showToast("error", "First name shouldn't be empty!")
        return 0
    } else if (lastName.length === 0) {
        showToast("error", "Last name shouldn't be empty!")
        return 0
    } else if (mailOrPhone.length === 0) {
        showToast("error", "Email shouldn't be empty!")
        return 0
    } else if (password.length === 0) {
        showToast("error", "Password shouldn't be empty!")
        return 0
    } else if (password.length < 6) {
        showToast("error", "Password length should be at least 6 character!")
        return 0
    } else if (password !== cPassword) {
        showToast("error", "Password and confirm password are mitch match!")
        return 0
    } else if (!isReadTC) {
        showToast("error", "You should check our terms and conditions")
        return 0
    }
    let buyerEmail = ""
    let buyerPhone = ""
    mailOrPhone.substring(0, 2) === "01" ? buyerPhone = mailOrPhone : buyerEmail = mailOrPhone
    const postData = { firstName, lastName, password, email: buyerEmail, phone: buyerPhone, isTutorAccount }
    localStorage.setItem("signUpData", JSON.stringify(postData))
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/send-email-otp`;
    dispatch({ type: Types.IS_EMAIL_OTP_LOADING, payload: true })
    try {
        Axios.post(url, { email: buyerEmail }).then((res) => {
            if (res.data.status) {
                // console.log('res', res)
                dispatch({ type: Types.IS_EMAIL_OTP_LOADING, payload: false });
                dispatch({ type: Types.EMAIL_OTP_CREATED, payload: true });
                showToast("success", res.data.message);
            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_EMAIL_OTP_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
}
export const SignUpSubmit = (data, otp) => (dispatch) => {
    if (otp.length !== 6) {
        showToast("error", "Invalid Otp!")
        return 0
    }
    const postData = { ...data, otp }
    const url = `${process.env.NEXT_PUBLIC_API_URL}client`;
    dispatch({ type: Types.IS_SIGNUP_LOADING, payload: true })
    try {
        Axios.post(url, postData).then((res) => {
            if (res.data.status) {
                // console.log('res', res)
                dispatch({ type: Types.IS_SIGNUP_LOADING, payload: false });
                // dispatch({ type: Types.SIGNUP_CREATED, payload: true });
                showToast("success", res.data.message);
                if (res.data.isLogin) {
                    localStorage.setItem("signUpData", "")
                    localStorage.setItem("isLogin", true)
                    localStorage.setItem("clientData", JSON.stringify(res.data.result))
                    localStorage.setItem("access_token", res.data.token)
                    dispatch({ type: Types.IS_SIGNUP_COMPLETE, payload: true });
                    dispatch({ type: Types.IS_LOGIN_COMPLETE, payload: true });
                }
            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_SIGNUP_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const LoginSubmit = (data) => (dispatch) => {
    const { mailOrPhone, password } = data
    // console.log('data', data)
    if (mailOrPhone.length === 0) {
        showToast("error", "Email shouldn't be empty!")
        return 0
    } else if (password.length === 0) {
        showToast("error", "Password shouldn't be empty!")
        return 0
    } else if (password.length < 6) {
        showToast("error", "Password length should be at least 6 character!")
        return 0
    }
    let email = ""
    let phone = ""
    mailOrPhone.substring(0, 2) === "01" ? phone = mailOrPhone : email = mailOrPhone
    const postData = { password, email, phone }
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/login`;
    dispatch({ type: Types.IS_LOGIN_LOADING, payload: true })
    try {
        Axios.post(url, postData).then((res) => {
            if (res.data.status) {
                // console.log('res', res)
                dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
                showToast("success", res.data.message);
                if (res.data.isLogin) {
                    // console.log('123rrr', "123rrr")
                    localStorage.setItem("isLogin", true)
                    localStorage.setItem("clientData", JSON.stringify(res.data.result))
                    localStorage.setItem("access_token", res.data.token)
                    dispatch({ type: Types.IS_LOGIN_COMPLETE, payload: true });
                } else {
                    localStorage.setItem("isLogin", false)
                    localStorage.setItem("clientData", null)
                }
            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const CheckBuyerSubmit = (email) => (dispatch) => {

    // console.log('data', data)
    if (email.length === 0) {
        showToast("error", "EMail shouldn't be empty!")
        return 0
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/check-client`;
    dispatch({ type: Types.IS_CHECK_BUYER_LOADING, payload: true })
    localStorage.setItem('email', email)
    try {
        Axios.post(url, { email }).then((res) => {
            if (res.data.status) {
                if (res.data.isPresent) {
                    dispatch({ type: Types.CHECK_BUYER_COMPLETED, payload: true });
                } else {
                    //not found
                    showToast("success", res.data.message);
                }
                dispatch({ type: Types.IS_CHECK_BUYER_LOADING, payload: false });

            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_CHECK_BUYER_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const SetPasswordSubmit = (resetInfo, otp) => (dispatch) => {

    // console.log('data', data)
    if (otp.length !== 6) {
        showToast("error", "Invalid Otp!")
        return 0
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/set-password`;
    dispatch({ type: Types.IS_SET_PASSWORD_LOADING, payload: true })
    // const resetInfo = JSON.parse(localStorage.getItem('resetInfo'))
    const payload = { ...resetInfo, otp }
    try {
        Axios.post(url, payload).then((res) => {
            if (res.data.status) {
                // console.log('res', res)
                localStorage.setItem('email', "")
                localStorage.setItem('resetInfo', "")
                localStorage.setItem("isLogin", true)
                localStorage.setItem("clientData", JSON.stringify(res.data.result))
                localStorage.setItem("access_token", res.data.token)
                dispatch({ type: Types.IS_SET_PASSWORD_LOADING, payload: false });
                dispatch({ type: Types.SET_PASSWORD_COMPLETE, payload: true });
                showToast("success", res.data.message);
            } else {
                console.log('res', res)
                showToast("error", res.data.message);
                dispatch({ type: Types.IS_SET_PASSWORD_LOADING, payload: false });
            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_SET_PASSWORD_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const CreatePasswordSubmit = (data) => (dispatch) => {
    const { password, cPassword } = data
    // console.log('data', data)
    if (password.length === 0) {
        showToast("error", "Password should n't be empty!")
        return 0;
    } else if (password.length < 6) {
        showToast("error", "Password should be at least 6 character!")
        return 0;
    } else if (cPassword.length === 0) {
        showToast("error", "Confirm password should n't be empty!")
        return 0;
    } else if (cPassword.length < 6) {
        showToast("error", "Confirm password should be at least 6 character!")
        return 0;
    } else if (cPassword !== password) {
        showToast("error", "Password and confirm password not matche!")
        return 0;
    }
    const email = localStorage.getItem('email')
    localStorage.setItem("resetInfo", JSON.stringify({ password, email }))
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/forget-password-otp`;
    dispatch({ type: Types.IS_CREATE_PASSWORD_LOADING, payload: true })
    try {
        Axios.post(url, { email }).then((res) => {
            if (res.data.status) {
                // console.log('res', res)
                dispatch({ type: Types.IS_CREATE_PASSWORD_LOADING, payload: false });
                dispatch({ type: Types.PASSWORD_CREATED, payload: true });
                showToast("success", res.data.message);
            } else {
                dispatch({ type: Types.IS_CREATE_PASSWORD_LOADING, payload: false });
                showToast("success", "Something went wrong");
            }
        }).catch((err) => {
            dispatch({ type: Types.IS_CREATE_PASSWORD_LOADING, payload: false });
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_CREATE_PASSWORD_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};

export const FalseIsLoginComplete = () => (dispatch) => {
    dispatch({ type: Types.IS_LOGIN_COMPLETE, payload: false })
    dispatch({ type: Types.IS_SIGNUP_COMPLETE, payload: false })
    dispatch({ type: Types.EMAIL_OTP_CREATED, payload: false })
    dispatch({ type: Types.SET_PASSWORD_COMPLETE, payload: false })
    dispatch({ type: Types.PASSWORD_CREATED, payload: false })
    dispatch({ type: Types.CHECK_BUYER_COMPLETED, payload: false })
}
export const GetPersonalInput = (name, value) => (dispatch) => {
    const formValue = { name, value }
    dispatch({ type: Types.GET_PERSONAL_INPUT, payload: formValue });
};
export const GetDivisionList = () => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}division`;
    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.DIVISION_LIST, payload: res.data.result });
            }
        });
    } catch (error) {
        showToast("error", "Something went wrong");
    }
};
export const DistrictByDivisionId = (id) => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}district/by-division/${id}`;
    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                // showToast("success", res.data.message);
                dispatch({ type: Types.DISTRICT_LIST, payload: res.data.result });
            } else {
                showToast("error", "Something went wrong");
            }
        });
    } catch (error) {
        showToast("error", "Something went wrong");
    }
};
export const SubDistrictByDistrictId = (id) => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}sub-district/by-district/${id}`;
    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                // showToast("success", res.data.message);
                dispatch({ type: Types.SUBDISTRICT_LIST, payload: res.data.result });
            } else {
                showToast("error", "Something went wrong");
            }
        });
    } catch (error) {
        showToast("error", "Something went wrong");
    }
};
export const AreaBySubDistrictId = (id) => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}area/by-sub-district/${id}`;
    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                // showToast("success", res.data.message);
                dispatch({ type: Types.AREA_LIST, payload: res.data.result });
            } else {
                showToast("error", "Something went wrong");
            }
        });
    } catch (error) {
        showToast("error", "Something went wrong");
    }
};
export const GetClientById = (id) => (dispatch) => {

    const url = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                localStorage.setItem("clientData", JSON.stringify(res.data.result))
            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        showToast("error", "Something went wrong");
    }
};
export const SetPersonalData = (data) => (dispatch) => {
    dispatch({ type: Types.SET_PERSONAL_DATA, payload: data });
}
export const PersonalSubmit = (data, id) => (dispatch) => {
    const { firstName, lastName, tagline, hourlyFee, divisionId, divisionInfo, division, districtId, districtInfo, district, subDistrictId, subDistrictInfo, subDistrict, areaId, areaInfo, area, zipCode, tutorBriefIntroduction, languageId,
        languageInfo, language, isTeachingLocationOnline, isTeachingLocationTutorHome, isTeachingLocationStudentHome, address } = data
    if (firstName.length === 0) {
        showToast("error", "First name shouldn't be empty")
        return 0
    } else if (lastName.length === 0) {
        showToast("error", "Last name shouldn't be empty")
        return 0
    } else if (tagline.length === 0) {
        showToast("error", "Tag line shouldn't be empty")
        return 0
    } else if (hourlyFee.length < 0) {
        showToast("error", "Hourly fee shouldn't be less than zero")
        return 0
    } else if (divisionId.length === 0) {
        showToast("error", "Please select a division")
        return 0
    } else if (districtId.length === 0) {
        showToast("error", "Please select a district")
        return 0
    } else if (subDistrictId.length === 0) {
        showToast("error", "Please select a sub district")
        return 0
    } else if (areaId.length === 0) {
        showToast("error", "Please select a area")
        return 0
    } else if (!isTeachingLocationTutorHome && !isTeachingLocationStudentHome && !isTeachingLocationOnline) {
        showToast("error", "Please select a which can you teach on")
        return 0
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
    dispatch({ type: Types.IS_PERSONAL_LOADING, payload: true })
    try {
        Axios.put(url, data).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
                showToast("success", res.data.message);
                dispatch(GetClientById(id))

            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const ContactSubmit = (data, id) => (dispatch) => {
    const { phone, email, skype, whatsapp, website } = data
    if (phone.length === 0) {
        showToast("error", "Phone number shouldn't be empty")
        return 0
    } else if (email.length === 0) {
        showToast("error", "Email shouldn't be empty")
        return 0
    }
    // else if (skype.length === 0) {
    //     showToast("error", "Skype shouldn't be empty")
    //     return 0
    // } else if (whatsapp.length < 0) {
    //     showToast("error", "Whatsapp shouldn't be empty")
    //     return 0
    // } else if (website.length === 0) {
    //     showToast("error", "Website shouldn't be empty")
    //     return 0
    // }

    const url = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
    dispatch({ type: Types.IS_PERSONAL_LOADING, payload: true })
    try {
        Axios.put(url, data).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
                showToast("success", res.data.message);
                dispatch(GetClientById(id))

            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const GetEducationInput = (name, value) => (dispatch) => {
    const formValue = { name, value }
    dispatch({ type: Types.GET_EDUCATION_INPUT, payload: formValue });
};
export const AddEducationSubmit = (education, educations, id) => (dispatch) => {
    const { degree, institute, location, startDate, endDate, description, isOngoing } = education || {}
    if (degree.length === 0) {
        showToast("error", "Degree shouldn't be empty")
        return 0
    } else if (institute.length === 0) {
        showToast("error", "Institute shouldn't be empty")
        return 0
    } else if (location.length === 0) {
        showToast("error", "Location shouldn't be empty")
        return 0
    } else if (startDate.length === 0) {
        showToast("error", "Start date shouldn't be empty")
        return 0
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
    dispatch({ type: Types.IS_PERSONAL_LOADING, payload: true })
    educations.push(education)
    try {
        Axios.put(url, { education: educations }).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
                dispatch({ type: Types.MODIFY_EDUCATIONS, payload: educations });
                dispatch({ type: Types.IS_EDUCATION_UPDATED, payload: true });
                showToast("success", res.data.message);
                dispatch(GetClientById(id))

            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const FalseEducationUpdated = () => (dispatch) => {
    dispatch({ type: Types.IS_EDUCATION_UPDATED, payload: false });
}
export const SetEducationData = (data) => (dispatch) => {
    dispatch({ type: Types.MODIFY_EDUCATIONS, payload: data.education });
}