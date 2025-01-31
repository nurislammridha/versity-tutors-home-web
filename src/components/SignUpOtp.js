"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from '../assets/icons/user.png'
import PrimaButton from './PrimaButton'
import PrimaText from './PrimaText'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FalseIsLoginComplete, GetSignUpInput, sendEmailOtp, SignUpSubmit } from '@/redux/_redux/CommonAction'
const SignUpOtp = () => {
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
            const reDetails = localStorage.getItem("redirect_details") || ""
            const reUrl = localStorage.getItem("redirect_url") || ""
            setOtp("")
            reDetails.length > 0 ? reUrl === "shop" ? router.push(`/shop/${reDetails}`) : router.push(`/product-details/${reDetails}`) : router.push('/')
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
        const { buyerName, password, buyerEmail, buyerPhone } = data
        setResentInput({ buyerName, mailOrPhone: buyerEmail.length > 0 ? buyerEmail : buyerPhone, password, cPassword: password })
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
    console.log('signUpInput', signUpInput)
    return (
        <div className='user-con'>
            <div className='user-body'>
                <h2>Create New Account</h2>
                <p>Quick Sign-Up / Registration</p>
                <div className='img-con'>  <Image src={user} className='img' /></div>
                <div class="form-md">
                    <div class="form-group">
                        <input
                            id="form_name1"
                            class="form-control"
                            type="text"
                            placeholder=''
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <label for="form_name1">Otp<span class="gl-form-asterisk"></span></label>
                    </div>
                </div>
                <PrimaButton
                    content={isSignUpLoading ? "SUBMITING OTP" : "SUBMIT OTP"}
                    width='160px'
                    height='30px'
                    color='#fff'
                    bWidth='1px'
                    bColor='#fff'
                    radius='20px'
                    bgColor='#00aac6'
                    onClick={() => !isSignUpLoading && handleSubmit()}
                />
                <div className='txt-con'>
                    <PrimaText
                        content={seconds > 0 || minutes > 0 ? `Time Remaining ${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}` : "Didn't receive otp?"}
                        color='#fff'
                        size='14px'
                        right='10px'
                    />
                    {seconds > 0 || minutes > 0 ? "" : (
                        <PrimaButton
                            width='fit-content'
                            height='fit-content'
                            content={isEmailOtpLoading ? "Resending OTP" : "Resend OTP"}
                            color='#00ffff'
                            size='14px'
                            bgColor='#00aac6'
                            onClick={() => !isEmailOtpLoading && resendOTP()}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default SignUpOtp