"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from '../assets/icons/user.png'
import PrimaButton from './PrimaButton'
import PrimaText from './PrimaText'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FalseIsLoginComplete, GetSignUpInput, sendEmailOtp } from '@/redux/_redux/CommonAction'
const Account = () => {
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
            router.push('/user/sign-up-otp')
            dispatch(FalseIsLoginComplete())
        }
    }, [isEmailOtpComplete])
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
                            value={signUpInput.buyerName}
                            onChange={(e) => handleChange("buyerName", e.target.value)}
                        />
                        <label for="form_name1">Name<span class="gl-form-asterisk"></span></label>
                    </div>

                    <div class="form-group">
                        <input
                            id="form_name2"
                            class="form-control"
                            type="text"
                            placeholder=""
                            required
                            value={signUpInput.mailOrPhone}
                            onChange={(e) => handleChange("mailOrPhone", e.target.value)}
                        />
                        <label for="form_name2">Email<span class="gl-form-asterisk"></span></label>
                    </div>
                    <div class="form-group">
                        <input
                            id="form_name3"
                            class="form-control"
                            type="password"
                            placeholder=""
                            required
                            value={signUpInput.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                        <label for="form_name3">New Password<span class="gl-form-asterisk"></span></label>
                    </div>
                    <div class="form-group">
                        <input
                            id="form_name4"
                            class="form-control"
                            type="password"
                            placeholder=""
                            value={signUpInput.cPassword}
                            onChange={(e) => handleChange("cPassword", e.target.value)}
                            required
                        />
                        <label for="form_name4">Confirm Password<span class="gl-form-asterisk"></span></label>
                    </div>
                    {/* //backup */}
                    {/* <div class="form-group">
                        <select
                            id="form_name12"
                            class="form-control"
                            value={12}
                        >
                            <option value={12}>Test 1</option>
                            <option>Test 2</option>
                            <option >Test 3</option>
                            <option>Test 4</option>
                            <option>Test 5</option>
                        </select>
                        <label for="form_name12">Select District<span class="gl-form-asterisk"></span></label>
                    </div>
                    <div class="form-group">
                        <textarea id="form_name2" class="form-control" type="text" placeholder="" required />
                        <label for="form_name2">Email<span class="gl-form-asterisk"></span></label>
                    </div> */}
                </div>
                <PrimaButton
                    content={isEmailOtpLoading ? "Signing Up" : "Sign Up"}
                    width='160px'
                    height='30px'
                    color='#fff'
                    bWidth='1px'
                    bColor='#fff'
                    radius='20px'
                    bgColor='#00aac6'
                    onClick={() => !isEmailOtpLoading ? handleSubmit() : {}}
                />
                <div className='txt-con'>
                    <PrimaText
                        content='Already have an Account?'
                        color='#fff'
                        size='14px'
                        right='10px'
                    />
                    <PrimaButton
                        width='fit-content'
                        height='fit-content'
                        content='Log-in'
                        color='#00ffff'
                        size='14px'
                        bgColor='#00aac6'
                        onClick={() => router.push("/user/login")}
                    />
                </div>
            </div>
        </div>
    )
}

export default Account