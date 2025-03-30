"use client"
import React, { useEffect, useState } from 'react'
import { FalseIsLoginComplete, GetSignUpInput, LoginSubmit, sendEmailOtp } from '@/redux/_redux/CommonAction';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isShow, setShow] = useState(true)
    const [isGoogle, setGoogle] = useState(false)
    const [isFacebook, setFacebook] = useState(false)
    const loginInput = useSelector((state) => state.homeInfo.signUpInput);
    const isLoginLoading = useSelector((state) => state.homeInfo.isLoginLoading);
    const isLoginComplete = useSelector((state) => state.homeInfo.isLoginComplete);
    const handleChange = (name, value) => {
        dispatch(GetSignUpInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(LoginSubmit(loginInput))
    }
    const googleLogin = async () => {
        setGoogle(true)
        auth
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                console.log('result', result)
                // const { user } = result;
                // const idTokenResult = await user.getIdTokenResult();
                dispatch(SocialLoginSubmit(result))
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isLoginComplete) {
            setGoogle(false)
            router.push('/')
            dispatch(FalseIsLoginComplete())
        }
    }, [isLoginComplete])
    // console.log('isLoginComplete', isLoginComplete)
    // useEffect(() => {
    //     let phone = loginInput.mailOrPhone
    //     if (phone.substring(0, 2) == "01" && phone.length == 11) {
    //         dispatch(PhoneSubmit(phone))
    //     }
    // }, [loginInput.mailOrPhone])

    return (
        <>
            {/* {isLoginLoading ?
                <div class="tu-preloader">
                    <div class="tu-preloader_holder">
                        <img src="images/favicon.png" alt="laoder img" />
                        <div class="tu-loader"></div>
                    </div>
                </div>
                : */}
            <main>
                <div className="tu-main-login">
                    <div className="tu-login-left">
                        <strong>
                            <a
                                // 
                                onClick={() => router.push('/')}><img src="images/login/logo_white.png" alt="images" /></a>
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
                            <h3>We know you will come back</h3>
                        </div>
                        <form className="tu-themeform tu-login-form">
                            <fieldset>
                                <div className="tu-themeform__wrap">
                                    <div className="form-group-wrap">

                                        <div className="form-group">
                                            <div className="tu-placeholderholder">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="Email address"
                                                    value={loginInput.mailOrPhone}
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
                                                    value={loginInput.password}
                                                    onChange={(e) => handleChange("password", e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Enter password</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <a
                                                className="tu-primbtn-lg"
                                                onClick={() => !isGoogle && !isFacebook && !isLoginLoading ? handleSubmit() : {}}
                                            >
                                                <span>{!isGoogle && !isFacebook && isLoginLoading ? "Login in" : "Login"}</span>
                                                <i className="icon icon-arrow-right"></i>
                                            </a>
                                        </div>

                                        {/* <div className="form-group">
                                            <div className="tu-optioanl-or">
                                                <span>OR</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <a
                                                // ="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin" 
                                                target="_blank" className="tu-btn-signup">
                                                <img src="images/google.png" alt="images" />
                                                Sign in with Google
                                            </a>
                                        </div> */}
                                        <div className="tu-lost-password form-group">
                                            <a

                                                onClick={() => router.push("/sign-up")}
                                            >
                                                Joi us today
                                            </a>
                                            <a
                                                // ="lost-password.html"
                                                className="tu-password-clr_light"
                                                onClick={() => router.push('/email')}
                                            >
                                                Lost password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </main>
            {/* } */}
            <ToastContainer />
        </>
    )
}

export default LoginPage