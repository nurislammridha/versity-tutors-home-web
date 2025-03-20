"use client"
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import ProfilesBody from '@/components/ProfilesBody'
import React, { useEffect, useState } from 'react'

const ProfilesPage = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [clientData, setClientData] = useState(null)
    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === "true" ? true : false)
        setClientData(JSON.parse(localStorage.getItem("clientData")))
    }, [])
    return (
        <>
            <PrimaHeader isLogin={isLogin} clientData={clientData} />
            <ProfilesBody clientData={clientData} isLogin={isLogin} />
            <PrimaFooter />
        </>
    )
}

export default ProfilesPage