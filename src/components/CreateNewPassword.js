"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from '../assets/icons/user.png'
import PrimaButton from './PrimaButton'
import PrimaText from './PrimaText'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { CreatePasswordSubmit, FalseIsLoginComplete, GetSignUpInput, LoginSubmit, PhoneSubmit } from '@/redux/_redux/CommonAction'
const CreateNewPassword = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [buyerEmail, setBuyerEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const isCreatePasswordLoading = useSelector((state) => state.homeInfo.isCreatePasswordLoading);
    const isPasswordCreated = useSelector((state) => state.homeInfo.isPasswordCreated);

    const handleSubmit = () => {
        dispatch(CreatePasswordSubmit({ password, cPassword }))
    }
    useEffect(() => {
        setBuyerEmail(localStorage.getItem("buyerEmail"))
    }, [])


    useEffect(() => {
        if (isPasswordCreated) {
            setBuyerEmail("")
            router.push('/user/forget-password-otp')
            dispatch(FalseIsLoginComplete())
        }
    }, [isPasswordCreated])

    return (
        <div className='user-con'>
            <div className='user-body'>
                <h2>Create New Password</h2>
                {/* <p>Quick Login</p> */}
                <div className='img-con'>  <Image src={user} className='img' /></div>
                <div class="form-md">
                    <div class="form-group">
                        <input
                            id="form_name2"
                            class="form-control"
                            type="text"
                            placeholder=""
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="form_name2">New Password<span class="gl-form-asterisk"></span></label>
                    </div>
                    <div class="form-group">
                        <input
                            id="form_name2"
                            class="form-control"
                            type="text"
                            placeholder=""
                            required
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                        <label for="form_name2">Confirm New Password<span class="gl-form-asterisk"></span></label>
                    </div>


                </div>
                <PrimaButton
                    content={isCreatePasswordLoading ? "SUBMITTING" : "SUBMIT"}
                    width='160px'
                    height='30px'
                    color='#fff'
                    bWidth='1px'
                    bColor='#fff'
                    radius='20px'
                    bgColor='#00aac6'
                    onClick={() => !isCreatePasswordLoading && handleSubmit()}
                />

            </div>
        </div>
    )
}

export default CreateNewPassword