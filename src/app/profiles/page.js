"use client"
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import ProfilesBody from '@/components/ProfilesBody'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [clientData, setClientData] = useState(null)
    useEffect(() => {
        setClientData(JSON.parse(localStorage.getItem("clientData")))
    }, [])
    return (
        <>
            <PrimaHeader />
            <ProfilesBody clientData={clientData} />
            <PrimaFooter />
        </>
    )
}

export default page