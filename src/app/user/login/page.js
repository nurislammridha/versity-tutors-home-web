"use client"
import React from 'react'
import '../userStyle.css'
import Header from '@/components/Header'
import Login from '@/components/Login'
import { ToastContainer } from 'react-toastify'
const page = () => {
    return (<>
        <div className="parent_container">
            <Header />
            <Login />
        </div>
        <ToastContainer />
    </>)
}

export default page