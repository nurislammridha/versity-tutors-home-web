"use client"
import React from 'react'
import '../userStyle.css'
import Header from '@/components/Header'
import Account from '@/components/Account'
import SignUpOtp from '@/components/SignUpOtp'
import { ToastContainer } from 'react-toastify'
const page = () => {
    return (<>
        <div className="parent_container">
            <Header />
            <SignUpOtp />
        </div>
        <ToastContainer />
    </>)
}

export default page