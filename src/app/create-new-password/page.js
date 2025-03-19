"use client"
import React, { useEffect, useState } from 'react'
import { CreatePasswordSubmit, FalseIsLoginComplete, GetSignUpInput, sendEmailOtp } from '@/redux/_redux/CommonAction';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const isCreatePasswordLoading = useSelector((state) => state.homeInfo.isCreatePasswordLoading);
    const isPasswordCreated = useSelector((state) => state.homeInfo.isPasswordCreated);

    const handleSubmit = () => {
        dispatch(CreatePasswordSubmit({ password, cPassword }))
    }
    useEffect(() => {
        setEmail(localStorage.getItem("email"))
    }, [])


    useEffect(() => {
        if (isPasswordCreated) {
            setEmail("")
            router.push('/forget-password-otp')
            dispatch(FalseIsLoginComplete())
        }
    }, [isPasswordCreated])
    // console.log('isPasswordCreated', isPasswordCreated)
    return (
        <>
            <main>
                <div className="tu-main-login">
                    <div className="tu-login-left">
                        <strong>
                            <a
                            // href="index.html"
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
                            <h3>We know you'll come back</h3>
                        </div>
                        <form className="tu-themeform tu-login-form">
                            <fieldset>
                                <div className="tu-themeform__wrap">
                                    <div className="form-group-wrap">
                                        <div className="form-group">
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>New password</span>
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
                                                    value={cPassword}
                                                    onChange={(e) => setCPassword(e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Confirm New password</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <a
                                                className="tu-primbtn-lg"
                                                onClick={() => !isCreatePasswordLoading && handleSubmit()}
                                            >
                                                <span>{isCreatePasswordLoading ? "SUBMITTING" : "SUBMIT"}</span>
                                                <i className="icon icon-arrow-right"></i>
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

export default page