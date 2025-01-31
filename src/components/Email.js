"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from '../assets/icons/user.png'
import PrimaButton from './PrimaButton'
import PrimaText from './PrimaText'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBuyerSubmit, FalseIsLoginComplete, GetSignUpInput, LoginSubmit, PhoneSubmit } from '@/redux/_redux/CommonAction'
const Email = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [buyerEmail, setBuyerEmail] = useState("")
    const isCheckBuyerLoading = useSelector((state) => state.homeInfo.isCheckBuyerLoading);
    const isCheckBuyerCompleted = useSelector((state) => state.homeInfo.isCheckBuyerCompleted);

    const handleSubmit = () => {
        dispatch(CheckBuyerSubmit(buyerEmail))
    }


    useEffect(() => {
        if (isCheckBuyerCompleted) {
            setBuyerEmail("")
            router.push('/user/create-new-password')
            dispatch(FalseIsLoginComplete())
        }
    }, [isCheckBuyerCompleted])

    return (
        <div className='user-con'>
            <div className='user-body'>
                <h2>Forgot Password</h2>
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
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                        />
                        <label for="form_name2">Email<span class="gl-form-asterisk"></span></label>
                    </div>


                </div>
                <PrimaButton
                    content={isCheckBuyerLoading ? "SUBMITTING" : "SUBMIT"}
                    width='160px'
                    height='30px'
                    color='#fff'
                    bWidth='1px'
                    bColor='#fff'
                    radius='20px'
                    bgColor='#00aac6'
                    onClick={() => !isCheckBuyerLoading && handleSubmit()}
                />

            </div>
        </div>
    )
}

export default Email