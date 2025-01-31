"use client"
import React, { Suspense } from 'react'
import AllContainer from './AllContainer'

const page = () => {
    return (
        <Suspense><AllContainer /></Suspense>
    )
}

export default page