"use client"
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import ProfilesBody from '@/components/ProfilesBody'
import React from 'react'

const page = () => {
    return (
        <>
            <PrimaHeader />
            <ProfilesBody />
            <PrimaFooter />
        </>
    )
}

export default page