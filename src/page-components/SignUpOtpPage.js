"use client"
import PrimaButton from '@/components/PrimaButton'
import PrimaText from '@/components/PrimaText'
import { FalseIsLoginComplete, sendEmailOtp, SignUpSubmit } from '@/redux/_redux/CommonAction'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const SignUpOtpPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [signUpInput, setSignUpInput] = useState({})
    const [resendInput, setResentInput] = useState({})
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const isSignUpLoading = useSelector((state) => state.homeInfo.isSignUpLoading);
    const isSignUpComplete = useSelector((state) => state.homeInfo.isSignUpComplete);
    const isEmailOtpLoading = useSelector((state) => state.homeInfo.isEmailOtpLoading);
    const isEmailOtpComplete = useSelector((state) => state.homeInfo.isEmailOtpComplete);
    const handleSubmit = () => {
        dispatch(SignUpSubmit(signUpInput, otp))
    }
    // console.log('isSignUpComplete', isSignUpComplete)

    const resendOTP = () => {
        dispatch(sendEmailOtp(resendInput))
    };
    useEffect(() => {
        if (isSignUpComplete) {
            setOtp("")
            router.push('/')
            localStorage.setItem("redirect_details", "")
            dispatch(FalseIsLoginComplete())
        }
    }, [isSignUpComplete])

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("signUpData")) || {}
        const { firstName, lastName, password, email, phone, isTutorAccount } = data
        setResentInput({ firstName, lastName, mailOrPhone: email.length > 0 ? email : phone, password, cPassword: password, isTutorAccount, isReadTC: true })
        setSignUpInput(data)
        setMinutes(1);
        setSeconds(49);
    }, [])
    useEffect(() => {
        if (isEmailOtpComplete) {
            setMinutes(1);
            setSeconds(49);
            dispatch(FalseIsLoginComplete())
        }
    }, [isEmailOtpComplete])
    // console.log('signUpInput', signUpInput)
    return (
        <>
            <main>
                <div className="tu-main-login">
                    <div className="tu-login-left">
                        <strong>
                            <a
                            // ="index.html"
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
                            <h3>Otp was send to {signUpInput.email}</h3>
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
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Otp</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <PrimaText
                                                content={seconds > 0 || minutes > 0 ? `Time Remaining ${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}` : "Didn't receive otp?"}
                                                color='#000'
                                                size='16px'
                                                right='10px'
                                            />
                                            {seconds > 0 || minutes > 0 ? "" : (
                                                <PrimaButton
                                                    width='fit-content'
                                                    height='fit-content'
                                                    content={isEmailOtpLoading ? "Resending OTP" : "Resend OTP"}
                                                    color='#6a307d'
                                                    size='14px'
                                                    bgColor='#fff'
                                                    onClick={() => !isEmailOtpLoading && resendOTP()}
                                                />
                                            )}
                                        </div>


                                        <div className="form-group">
                                            <a
                                                // ="profile-setting-a.html" 
                                                className="tu-primbtn-lg"
                                                onClick={() => !isSignUpLoading && handleSubmit()}
                                            >
                                                <span>{isSignUpLoading ? "SUBMITING OTP" : "SUBMIT OTP"}</span><i className="icon icon-arrow-right"></i>
                                            </a>
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

export default SignUpOtpPage