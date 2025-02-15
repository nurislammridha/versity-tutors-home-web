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
export const LoginSubmit = (data, createPassword) => (dispatch) => {
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
    let buyerEmail = ""
    let buyerPhone = ""
    mailOrPhone.substring(0, 2) === "01" ? buyerPhone = mailOrPhone : buyerEmail = mailOrPhone
    const postData = { password, buyerEmail, buyerPhone, createPassword }

    const url = `${process.env.NEXT_PUBLIC_API_URL}buyer/login`;
    dispatch({ type: Types.IS_LOGIN_LOADING, payload: true })
    try {
        Axios.post(url, postData).then((res) => {
            if (res.data.status) {
                // console.log('res', res)
                dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
                showToast("success", res.data.message);
                if (res.data.isLogin) {
                    localStorage.setItem("isLogin", true)
                    localStorage.setItem("clientData", JSON.stringify(res.data.result))
                    localStorage.setItem("access_token", res.data.token)
                    dispatch(GetCartListByBuyer(res.data.result._id))
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
    console.log('data', data)
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
    const buyerEmail = localStorage.getItem('email')
    localStorage.setItem("resetInfo", JSON.stringify({ password, email }))
    const url = `${process.env.NEXT_PUBLIC_API_URL}client/forget-password-otp`;
    dispatch({ type: Types.IS_CREATE_PASSWORD_LOADING, payload: true })
    try {
        Axios.post(url, { buyerEmail }).then((res) => {
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