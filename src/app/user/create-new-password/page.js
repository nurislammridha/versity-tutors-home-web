"use client"
import React from 'react'
import '../userStyle.css'
import Header from '@/components/Header'
import Login from '@/components/Login'
import Email from '@/components/Email'
import CreateNewPassword from '@/components/CreateNewPassword'
import { ToastContainer } from 'react-toastify'
const page = () => {
    return (<>
        <div className="parent_container">
            <Header />
            <CreateNewPassword />
        </div>
        <ToastContainer />
    </>)
}

export default page