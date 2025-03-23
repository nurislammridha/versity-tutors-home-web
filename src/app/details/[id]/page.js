// import DetailsPage from '@/pages/DetailsPage'
import DetailsPage from '@/page-components/DetailsPage'
import React from 'react'

const page = ({ params }) => {
    const { id } = params || {}; // Get dynamic ID from URL
    return (<>
        <DetailsPage id={id} />
    </>

    )
}

export default page