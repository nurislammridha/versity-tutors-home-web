"use client"
import PrimaButton from '@/components/PrimaButton'
import PrimaText from '@/components/PrimaText'
import { CreatePasswordSubmit, FalseIsLoginComplete, sendEmailOtp, SetPasswordSubmit, SignUpSubmit } from '@/redux/_redux/CommonAction'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState("")
    const [resetInfo, setResetInfo] = useState({})
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const isSetPasswordLoading = useSelector((state) => state.homeInfo.isSetPasswordLoading);
    const isSetPasswordComplete = useSelector((state) => state.homeInfo.isSetPasswordComplete);
    const isCreatePasswordLoading = useSelector((state) => state.homeInfo.isCreatePasswordLoading);
    const isPasswordCreated = useSelector((state) => state.homeInfo.isPasswordCreated);
    const handleSubmit = () => {
        dispatch(SetPasswordSubmit(resetInfo, otp))
    }


    const resendOTP = () => {
        let obj = { ...resetInfo, cPassword: resetInfo.password }
        dispatch(CreatePasswordSubmit(obj))
    };
    useEffect(() => {
        if (isSetPasswordComplete) {
            setOtp("")
            router.push('/')
            dispatch(FalseIsLoginComplete())
        }
    }, [isSetPasswordComplete])

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
        setResetInfo(JSON.parse(localStorage.getItem("resetInfo")) || {})
        setMinutes(1);
        setSeconds(49);
    }, [])
    useEffect(() => {
        if (isPasswordCreated) {
            setMinutes(1);
            setSeconds(49);
            dispatch(FalseIsLoginComplete())
        }
    }, [isPasswordCreated])
    console.log('resetInfo', resetInfo)
    return (
        <>
            <main>
                <div className="tu-main-login">
                    <div className="tu-login-left">
                        <strong>
                            <a
                            //  href="index.html"
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
                            <h3>Otp was send to {resetInfo.email}</h3>
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
                                                    content={isCreatePasswordLoading ? "Resending OTP" : "Resend OTP"}
                                                    color='#6a307d'
                                                    size='14px'
                                                    bgColor='#fff'
                                                    onClick={() => !isCreatePasswordLoading && resendOTP()}
                                                />
                                            )}
                                        </div>


                                        <div className="form-group">
                                            <a
                                                // href="profile-setting-a.html" 
                                                className="tu-primbtn-lg"
                                                onClick={() => !isSetPasswordLoading && handleSubmit()}
                                            >
                                                <span>{isSetPasswordLoading ? "SUBMITING OTP" : "SUBMIT OTP"}</span><i className="icon icon-arrow-right"></i>
                                            </a>
                                        </div>


                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page