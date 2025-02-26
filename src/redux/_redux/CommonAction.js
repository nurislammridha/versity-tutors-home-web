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
                dispatch({ type: Types.MODIFY_SUBJECTS, payload: res.data.result.subject });
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
        Axios.put(url, { ...data, isApproved: false }).then((res) => {
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
        Axios.put(url, { ...data, isApproved: false }).then((res) => {
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
export const GetSubjectInput = (name, value) => (dispatch) => {
    const formValue = { name, value }
    dispatch({ type: Types.GET_SUBJECT_INPUT, payload: formValue });
};
export const AddEducationSubmit = (education, educations, id, action, actionId = "1") => (dispatch) => {
    const { degree, institute, location, startDate, endDate, description, isOngoing } = education || {}
    if (action !== "delete") {
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
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
    dispatch({ type: Types.IS_PERSONAL_LOADING, payload: true })
    let arr = educations
    if (action === "add") {
        arr.push(education)
    } else if (action === "delete") {
        arr = educations.filter(item => item._id !== actionId);
    } else if (action === "edit") {
        arr = educations.map(item =>
            item._id === actionId ? { ...item, ...education } : item
        )
    }
    // console.log('arr', arr)
    // return 0
    try {
        Axios.put(url, { education: arr, isApproved: false }).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
                dispatch({ type: Types.MODIFY_EDUCATIONS, payload: arr });
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
export const AddSubjectSubmit = (subject, subjects, id, action, actionId = "1") => (dispatch) => {
    const { categoryId, categoryInfo, subCategories } = subject || {}
    if (action !== "delete") {
        if (categoryId.length === 0) {
            showToast("error", "Select a class")
            return 0
        } else if (subCategories.length === 0) {
            showToast("error", "Select a subject")
            return 0
        }
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
    dispatch({ type: Types.IS_PERSONAL_LOADING, payload: true })
    let arr = subjects
    if (action === "add") {
        arr.push(subject)
    } else if (action === "delete") {
        arr = subjects.filter(item => item._id !== actionId);
    } else if (action === "edit") {
        arr = subjects.map(item =>
            item._id === actionId ? { ...item, ...subject } : item
        )
    }
    // console.log('arr', arr)
    // return 0
    try {
        Axios.put(url, { subject: arr, isApproved: false }).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_PERSONAL_LOADING, payload: false });
                // dispatch({ type: Types.MODIFY_SUBJECTS, payload: arr });
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
export const SetSubjectData = (data) => (dispatch) => {
    dispatch({ type: Types.MODIFY_SUBJECTS, payload: data.subject });
}
export const SetEducationUpdate = (data) => (dispatch) => {
    dispatch({ type: Types.SET_EDUCATION_UPDATE, payload: data });
}
export const SetSubjectUpdate = (data) => (dispatch) => {
    dispatch({ type: Types.SET_SUBJECT_UPDATE, payload: data });
}
export const GetCategoryList = () => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}category`;
    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.CATEGORY_LIST, payload: res.data.result });
            }
        });
    } catch (error) {
        showToast("error", "Something went wrong");
    }
};
export const GetSubCategoryByCategoryId = (id) => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}sub-category/by-category/${id}`;
    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.SUB_CATEGORY_LIST, payload: res.data.result });
            }
        });
    } catch (error) {
        showToast("error", "Something went wrong");
    }
};
const PostImg = (img, id) => (dispatch) => {
    // console.log('img', img)
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "nurislam");
    data.append("cloud_name ", "nurislammridha");
    const url = "https://api.cloudinary.com/v1_1/nurislammridha/image/upload"
    Axios.post(url, data).then((res) => {
        // console.log('res.data', res.data)
        if (res.data) {
            let avatar = { publicId: res?.data?.public_id, url: res?.data?.url }
            const url2 = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
            Axios.put(url2, { avatar }).then((res) => {
                if (res.data.status) {
                    dispatch({ type: Types.IS_AVATAR_LOADING, payload: false });
                    showToast("success", res.data.message);
                    dispatch(GetClientById(id))

                }
            }).catch((err) => {
                dispatch({ type: Types.IS_AVATAR_LOADING, payload: false });
                showToast("success", err);
            });
        }
    }
    )
}
export const UploadAvatarImg = (img, avatar = null, id) => (dispatch) => {
    if (img.type === "image/jpeg" || img.type === "image/png") {
        dispatch({ type: Types.IS_AVATAR_LOADING, payload: true });
        const urlRemove = `${process.env.NEXT_PUBLIC_API_URL}helper/delete-cloudinary`;
        let publicId = avatar === null ? null : avatar.publicId
        // console.log('avatar', avatar)
        if (publicId !== null) {
            Axios.post(urlRemove, { publicId }).then((res) => {
                if (res) {
                    dispatch(PostImg(img, id))
                }
            })
        } else {
            dispatch(PostImg(img, id))
        }
    } else {
        dispatch({ type: Types.IS_AVATAR_LOADING, payload: false });
        showToast("error", "Image should be jpg/jpeg/png");
    }

};

export const GetProfiles = (data) => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/filter`;
    dispatch({ type: Types.IS_PROFILES_LOADING, payload: true })

    try {
        Axios.post(url, data).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_PROFILES_LOADING, payload: false });
                dispatch({ type: Types.FILTERED_PROFILES, payload: res.data });

            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_PROFILES_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const GetProfileDetails = (id) => (dispatch) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/${id}`;
    dispatch({ type: Types.IS_PROFILE_DETAILS_LOADING, payload: true })

    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_PROFILE_DETAILS_LOADING, payload: false });
                dispatch({ type: Types.PROFILE_DETAILS, payload: res.data.result });

            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_PROFILE_DETAILS_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const GetReviewByClientId = (clientId, page = 1, limit = 10) => (dispatch) => {

    const url = `${process.env.NEXT_PUBLIC_API_URL}review/client?clientId=${clientId}&page=${page}&limit=${limit}`;
    // console.log('url', url)
    dispatch({ type: Types.IS_GET_REVIEW_LOADING, payload: true })

    try {
        Axios.get(url).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_GET_REVIEW_LOADING, payload: false });
                dispatch({ type: Types.REVIEW_LIST, payload: res.data });

            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_GET_REVIEW_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const SubmitReview = (data) => (dispatch) => {
    const { comment, clientId } = data || {}
    if (comment.length === 0) {
        showToast("success", "Comment shouldn't be empty")
        return 0
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}review`;
    dispatch({ type: Types.IS_REVIEW_LOADING, payload: true })

    try {
        Axios.post(url, data).then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.IS_REVIEW_LOADING, payload: false });
                dispatch({ type: Types.IS_REVIEW_SUBMITTED, payload: true });
                // dispatch(GetReviewByClientId(clientId))
            }
        }).catch((err) => {
            showToast("success", err);
        });
    } catch (error) {
        dispatch({ type: Types.IS_REVIEW_LOADING, payload: false });
        showToast("error", "Something went wrong");
    }
};
export const FalseSubmitReview = (data) => (dispatch) => {
    dispatch({ type: Types.IS_REVIEW_SUBMITTED, payload: false });
}