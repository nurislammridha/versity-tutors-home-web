"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CheckBuyerSubmit, FalseIsLoginComplete } from '@/redux/_redux/CommonAction';

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const isCheckBuyerLoading = useSelector((state) => state.homeInfo.isCheckBuyerLoading);
    const isCheckBuyerCompleted = useSelector((state) => state.homeInfo.isCheckBuyerCompleted);

    const handleSubmit = () => {
        dispatch(CheckBuyerSubmit(email))
    }


    useEffect(() => {
        if (isCheckBuyerCompleted) {
            setEmail("")
            router.push('/create-new-password')
            dispatch(FalseIsLoginComplete())
        }
    }, [isCheckBuyerCompleted])
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
                                                    type="email"
                                                    className="form-control"
                                                    required=""
                                                    placeholder="Email address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <div className="tu-placeholder">
                                                    <span>Your email address</span>
                                                    <em>*</em>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <a
                                                className="tu-primbtn-lg"
                                                onClick={() => !isCheckBuyerLoading && handleSubmit()}
                                            >
                                                <span>{isCheckBuyerLoading ? "SUBMITTING" : "SUBMIT"}</span>
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