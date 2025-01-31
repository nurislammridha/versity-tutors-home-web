"use client"
import DetailsBody from '@/components/DetailsBody'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import '../detailsStyle.css'
import Combo from '@/components/Combo'
import Tab from '@/components/Tab'
import ReviewAndQuestion from '@/components/ReviewAndQuestion'
import RemindProduct from '@/components/RemindProduct'
import HomeProducts from '@/components/HomeProducts'
import Share from '@/components/Share'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetailsById } from '@/redux/_redux/CommonAction'
import { relProductModify } from '@/assets/function/globalFunction'
const DetailsContainer = ({ params }) => {
    const { id } = params;
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(false)
    const productDetails = useSelector((state) => state.homeInfo.productDetails);
    const { relatedProducts, longDescriptions, shortDescriptions, videoUrl } = productDetails || {}
    useEffect(() => {
        dispatch(ProductDetailsById(id))
    }, [id])
    useEffect(() => {
        const val = localStorage.getItem("isLogin")
        val === "true" ? setIsLogin(true) : setIsLogin(false)
    }, [])
    return (
        <div className='parent_container'>
            <Header />
            <DetailsBody data={productDetails} isLogin={isLogin} />
            <Combo />
            <Share />

            <HomeProducts title="Related Product" isViewAll={false} list={relProductModify(relatedProducts) || []} />
            <HomeProducts title="You may also like" isViewAll={false} />
            <HomeProducts title="People also purchased" isViewAll={false} />
            <Tab
                longDescriptions={longDescriptions}
                shortDescriptions={shortDescriptions}
                videoUrl={videoUrl}
            />

            {/* <ReviewAndQuestion /> */}
            <RemindProduct />
        </div>
    )
}

export default DetailsContainer