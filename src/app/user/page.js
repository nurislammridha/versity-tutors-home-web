
"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import './userStyle.css'
import UserContainer from '@/components/UserContainer'
import { ToastContainer } from 'react-toastify'
const page = () => {


    return (<>
        <div className="parent_container">
            <Header />
            <UserContainer />
        </div>
        <ToastContainer />
    </>)
}

export default page