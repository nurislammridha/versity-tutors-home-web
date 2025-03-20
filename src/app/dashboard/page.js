// import DashboardPage from '@/pages/DashboardPage'
import DashboardPage from '@/page-components/DashboardPage'
import React, { Suspense } from 'react'

const page = () => {
    return (<Suspense fallback={<div>Loading...</div>}>
        <DashboardPage />
    </Suspense>

    )
}

export default page