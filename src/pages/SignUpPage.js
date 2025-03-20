"use client"
import React, { useEffect, useState } from 'react'
import { FalseIsLoginComplete, GetSignUpInput, sendEmailOtp } from '@/redux/_redux/CommonAction';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const SignUpPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const signUpInput = useSelector((state) => state.homeInfo.signUpInput);
    const isEmailOtpLoading = useSelector((state) => state.homeInfo.isEmailOtpLoading);
    const isEmailOtpComplete = useSelector((state) => state.homeInfo.isEmailOtpComplete);
    const handleChange = (name, value) => {
        dispatch(GetSignUpInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(sendEmailOtp(signUpInput))
    }
    useEffect(() => {
        if (isEmailOtpComplete) {
            router.push('/sign-up-otp')
            dispatch(FalseIsLoginComplete())
        }
    }, [isEmailOtpComplete])
    return (
        <>
            <main>
                <div className="tu-main-login">
                    <div className="tu-login-left">
                        <strong>
                            <a
                            ><img src="images/login/logo_white.png" alt="images" /></a>
                        </strong>
                        <figure>
                            <img src="images/login/img-01.png" alt="images" />
                        </figure>
                        <div className="tu-login-left_title">
                            <h2>Yes! we’re making progress</h2>
                            <span>every minute & every second</span>
                        </div>
                    </div>
                    <div className="tu-login-right">
                        <div className="tu-login-right_title">
                            <h2>Welcome!</h2>
                            <h3>It’s really nice to see you</h3>
                        </div>
                        <form className="tu-themeform tu-login-form">
                            <fieldset>
                                <div className="tu-themeform__wrap">
                                    <div className="form-group-wrap">
                                        <div className="form-group">
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="Full Name"
                                                    value={signUpInput.firstName}
                                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>First name</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="Last name"
                                                    value={signUpInput.lastName}
                                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Last name</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="Email address"
                                                    value={signUpInput.mailOrPhone}
                                                    onChange={(e) => handleChange("mailOrPhone", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Your email address</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="password"
                                                    value={signUpInput.password}
                                                    onChange={(e) => handleChange("password", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Enter password</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="password"
                                                    value={signUpInput.cPassword}
                                                    onChange={(e) => handleChange("cPassword", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Confirm password</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group tu-form-groupradio registration-user-type">
                                            <div class="tu-check tu-radiosm">
                                                <input
                                                    id="user_type_instructor"
                                                    type="radio"
                                                    name="registration[user_type]"
                                                    value="instructor"
                                                    checked={signUpInput.isTutorAccount}
                                                    onChange={(e) => handleChange("isTutorAccount", true)}
                                                />
                                                <label for="user_type_instructor">Instructor</label>
                                            </div>
                                            <div class="tu-check tu-radiosm" style={{ marginLeft: 20 }}>
                                                <input
                                                    id="user_type_student"
                                                    type="radio"
                                                    name="registration[user_type]"
                                                    value="student"
                                                    checked={!signUpInput.isTutorAccount}
                                                    onChange={(e) => handleChange("isTutorAccount", false)}
                                                />
                                                <label for="user_type_student">Student</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <a
                                                className="tu-primbtn-lg"
                                                onClick={() => !isEmailOtpLoading ? handleSubmit() : {}}
                                            >
                                                <span>{isEmailOtpLoading ? "Signing Up" : "Sign Up"}</span>
                                                <i className="icon icon-arrow-right"></i>
                                            </a>
                                        </div>
                                        <div className="form-group">
                                            <div className="tu-check tu-signup-check">
                                                <input
                                                    type="checkbox"
                                                    id="expcheck2"
                                                    name="expcheck"
                                                    checked={signUpInput.isReadTC}
                                                    onChange={(e) => handleChange("isReadTC", !signUpInput.isReadTC)}
                                                />
                                                <label for="expcheck2"><span>I have read and agree to all
                                                    <a
                                                    >Terms &amp; conditions</a></span></label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="tu-optioanl-or">
                                                <span>OR</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <a
                                                target="_blank" className="tu-btn-signup">
                                                <img src="images/google.png" alt="images" />
                                                Sign in with Google
                                            </a>
                                        </div>
                                        <div className="tu-lost-password form-group">
                                            <a
                                                onClick={() => router.push("/login")}
                                            >
                                                Login now
                                            </a>
                                            <a
                                                className="tu-password-clr_light">Lost password?</a>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </main>
            <ToastContainer />
        </>
    )
}

export default SignUpPage