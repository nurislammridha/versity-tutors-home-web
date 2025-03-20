// import ProfilesPage from '@/pages/ProfilesPage'
import ProfilesPage from '@/page-components/ProfilesPage'
import React, { Suspense } from 'react'

const page = () => {
    return (<Suspense fallback={<div>Loading...</div>}>
        <ProfilesPage />
    </Suspense>

    )
}

export default page