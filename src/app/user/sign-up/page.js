"use client"
import React from 'react'
import '../userStyle.css'
import Header from '@/components/Header'
import Account from '@/components/Account'
import { ToastContainer } from 'react-toastify'
const page = () => {
    return (<>
        <div className="parent_container">
            <Header />
            <Account />
        </div>
        <ToastContainer />
    </>)
}

export default page