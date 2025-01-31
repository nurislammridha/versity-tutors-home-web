"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from '../assets/icons/user.png'
import PrimaButton from './PrimaButton'
import PrimaText from './PrimaText'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { CreatePasswordSubmit, FalseIsLoginComplete, GetSignUpInput, sendEmailOtp, SetPasswordSubmit, SignUpSubmit } from '@/redux/_redux/CommonAction'
const ForgetPasswordOtp = () => {
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

    return (
        <div className='user-con'>
            <div className='user-body'>
                <h2>Otp send to {resetInfo?.buyerEmail}</h2>
                {/* <p>Quick Sign-Up / Registration</p> */}
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
                        <label for="form_name1">OTP<span class="gl-form-asterisk"></span></label>
                    </div>
                </div>
                <PrimaButton
                    content={isSetPasswordLoading ? "SUBMITING OTP" : "SUBMIT OTP"}
                    width='160px'
                    height='30px'
                    color='#fff'
                    bWidth='1px'
                    bColor='#fff'
                    radius='20px'
                    bgColor='#00aac6'
                    onClick={() => !isSetPasswordLoading && handleSubmit()}
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
                            content={isCreatePasswordLoading ? "Resending OTP" : "Resend OTP"}
                            color='#00ffff'
                            size='14px'
                            bgColor='#00aac6'
                            onClick={() => !isCreatePasswordLoading && resendOTP()}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordOtp