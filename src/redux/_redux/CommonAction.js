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
    const url = `${process.env.NEXT_PUBLIC_API_URL}buyer/send-email-otp`;
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}buyer`;
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

export const FalseIsLoginComplete = () => (dispatch) => {
    dispatch({ type: Types.EMAIL_OTP_CREATED, payload: false })
    dispatch({ type: Types.IS_LOGIN_COMPLETE, payload: false })
    dispatch({ type: Types.IS_SIGNUP_COMPLETE, payload: false })
}