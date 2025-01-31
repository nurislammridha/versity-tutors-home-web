"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from '../assets/icons/user.png'
import PrimaButton from './PrimaButton'
import PrimaText from './PrimaText'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FalseIsLoginComplete, GetSignUpInput, LoginSubmit, PhoneSubmit } from '@/redux/_redux/CommonAction'
const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isShow, setShow] = useState(true)
    const [isGoogle, setGoogle] = useState(false)
    const [isFacebook, setFacebook] = useState(false)
    const loginInput = useSelector((state) => state.homeInfo.signUpInput);
    const isLoginLoading = useSelector((state) => state.homeInfo.isLoginLoading);
    const isLoginComplete = useSelector((state) => state.homeInfo.isLoginComplete);
    const userInfo = useSelector((state) => state.homeInfo.userInfo);
    const [createPassword, setCreatePassword] = useState(false)
    const handleChange = (name, value) => {
        dispatch(GetSignUpInput(name, value))
    }
    const handleSubmit = () => {
        dispatch(LoginSubmit(loginInput, createPassword))
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
    const facebookLogin = async () => {
        setFacebook(true)
        auth
            .signInWithPopup(facebookAuthProvider)
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
    const logout = () => {
        // firebase.auth().signOut();
        // console.log('signOut', "signOut")
        // dispatch({
        //     type: "LOGOUT",
        //     payload: null,
        // });
        // history.push("/login");
    };
    useEffect(() => {
        if (isLoginComplete) {
            const reDetails = localStorage.getItem("redirect_details") || ""
            const reUrl = localStorage.getItem("redirect_url") || ""
            setGoogle(false)
            setFacebook(false)
            reDetails.length > 0 ? reUrl === "shop" ? router.push(`/shop/${reDetails}`) : router.push(`/details/${reDetails}`) : router.push('/')
            localStorage.setItem("redirect_details", "")
            dispatch(FalseIsLoginComplete())
        }
    }, [isLoginComplete])

    useEffect(() => {
        let phone = loginInput.mailOrPhone
        if (phone.substring(0, 2) == "01" && phone.length == 11) {
            dispatch(PhoneSubmit(phone))
        }
    }, [loginInput.mailOrPhone])
    const decision = () => {
        let createPassword = false
        if (userInfo && userInfo?.isPresent) {

            if (userInfo?.result?.isPassword === false) {
                createPassword = true
            }
        }
        return createPassword
    }
    useEffect(() => {
        setCreatePassword(decision())
    }, [userInfo])

    return (
        <div className='user-con'>
            <div className='user-body'>
                <h2>Log-In</h2>
                <p>Quick Login</p>
                <div className='img-con'>  <Image src={user} className='img' /></div>
                <div class="form-md">


                    <div class="form-group">
                        <input
                            id="form_name2"
                            class="form-control"
                            type="text"
                            placeholder=""
                            required
                            value={loginInput.mailOrPhone}
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
                            value={loginInput.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                        <label for="form_name3">Password<span class="gl-form-asterisk"></span></label>
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
                    content={!isGoogle && !isFacebook && isLoginLoading ? "Login in" : "Login"}
                    width='160px'
                    height='30px'
                    color='#fff'
                    bWidth='1px'
                    bColor='#fff'
                    radius='20px'
                    bgColor='#00aac6'
                    onClick={() => !isGoogle && !isFacebook && !isLoginLoading ? handleSubmit() : {}}
                />
                <div className='txt-con'>
                    <PrimaButton
                        width='fit-content'
                        height='fit-content'
                        content='Forgot Password?'
                        color='#fff'
                        size='14px'
                        right='10px'
                        bgColor='#00aac6'
                        onClick={() => router.push('/user/email')}
                    />
                    <PrimaButton
                        width='fit-content'
                        height='fit-content'
                        content='Create New Account'
                        color='#00ffff'
                        size='14px'
                        bgColor='#00aac6'
                        onClick={() => router.push("/user/sign-up")}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login