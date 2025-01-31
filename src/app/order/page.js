"use client"
import React from 'react'
import './orderStyle.css'
import Header from '@/components/Header'
import OrderContainer from '@/components/OrderContainer'
import { ToastContainer } from 'react-toastify'
const page = () => {
    return (<>
        <div className='parent_container'>
            <Header />
            <OrderContainer />
        </div>
        <ToastContainer />
    </>)
}

export default page