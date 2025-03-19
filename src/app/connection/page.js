"use client"
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import { GetConnectionPackage, SubmitBuyPackage } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const page = () => {
    const dispatch = useDispatch()
    const [clickId, setClickId] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const [clientData, setClientData] = useState(null)
    const icConnectionLoading = useSelector((state) => state.homeInfo.icConnectionLoading);
    const isPackageBuying = useSelector((state) => state.homeInfo.isPackageBuying);
    const connectionData = useSelector((state) => state.homeInfo.connectionData);
    const handleSubmit = (item) => {
        setClickId(item?._id)
        dispatch(SubmitBuyPackage({ clientId: clientData?._id, spendConnection: 0, remainingConnection: item?.connections, connectionPackageId: item?._id }))
    }
    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === "true" ? true : false)
        setClientData(JSON.parse(localStorage.getItem("clientData")))
        dispatch(GetConnectionPackage())
    }, [])

    return (
        <>
            <PrimaHeader isLogin={isLogin} clientData={clientData} />
            <main class="tu-main tu-bgmain">
                <section class="tu-main-section">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="tu-pricingtop">
                                    <h4>Expand your great experience</h4>
                                    <h2>Buy a best price package</h2>
                                    <p>Spending a single connection you may unlock a profile features with access to book a profile</p>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <ul class="tu-pricinglist">
                                            {connectionData !== null && connectionData.map((item, index) => (
                                                <li key={index}>
                                                    <div class="tu-planlist">
                                                        <div class="tu-plandetail">
                                                            <h4 className='text-center'>{item?.name}</h4>
                                                            <h6 className='text-center mt-1'>{item?.connections} Connection</h6>
                                                            <h2 className='text-center' style={{ color: '#F97316' }}>&#2547;{item?.price}</h2>
                                                            <span className='text-center'>Including all taxes</span>
                                                            <p>
                                                                Using 1 connection you may access.
                                                            </p>
                                                        </div>
                                                        <ul class="tu-planperks">
                                                            <li>
                                                                <span>Phone: <i class="fa fa-check tu-colorgreen"></i></span>
                                                            </li>
                                                            <li>
                                                                <span>Whatsapp: <i class="fa fa-check tu-colorgreen"></i></span>
                                                            </li>
                                                            <li>
                                                                <span>Email:<i class="fa fa-check tu-colorgreen"></i></span>
                                                            </li>
                                                            <li>
                                                                <span>Booking:<i class="fa fa-check tu-colorgreen"></i></span>
                                                            </li>
                                                        </ul>
                                                        <div class="tu-btnarea">
                                                            <a
                                                                // 
                                                                class="tu-primbtn tu-btnplain"
                                                                onClick={() => {
                                                                    !isPackageBuying && handleSubmit(item)
                                                                }}
                                                            >
                                                                {isPackageBuying && clickId === item?._id ? "Buying.." : "Buy now"}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <PrimaFooter />
            <ToastContainer />
        </>
    )
}

export default page