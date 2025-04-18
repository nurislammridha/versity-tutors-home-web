"use client"
import PrimaFooter from '@/components/PrimaFooter'
import PrimaHeader from '@/components/PrimaHeader'
import { useLanguage } from '@/context/LanguageContext'
import { GetConnectionPackage, SubmitBuyPackage } from '@/redux/_redux/CommonAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { convertToBanglaNumber } from '../../public/function/globalFunction'

const ConnectionPage = () => {
    const { t, language } = useLanguage()
    const dispatch = useDispatch()
    const [clickId, setClickId] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const [clientData, setClientData] = useState(null)
    const isConnectionLoading = useSelector((state) => state.homeInfo.isConnectionLoading);
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
            {isConnectionLoading ?
                <div class="tu-preloader">
                    <div class="tu-preloader_holder">
                        <img src="../images/favicon.png" alt="laoder img" />
                        <div class="tu-loader"></div>
                    </div>
                </div>
                :
                <main class="tu-main tu-bgmain">
                    <section class="tu-main-section">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="tu-pricingtop">
                                        <h4>{t.expandYourGreatExperience}</h4>
                                        <h2>{t.buyBestPrice}</h2>
                                        <p>{t.spendingASingleConnection}</p>
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
                                                                <h6 className='text-center mt-1'>{language === "en" ? item?.connections : convertToBanglaNumber(item?.connections)} {t.connection}</h6>
                                                                <h2 className='text-center' style={{ color: '#F97316' }}>&#2547;{language === "en" ? item?.price : convertToBanglaNumber(item?.price)}</h2>
                                                                <span className='text-center'>{t.includingAllTaxes}</span>
                                                                <p>
                                                                    {t.usingConnection}
                                                                </p>
                                                            </div>
                                                            <ul class="tu-planperks">
                                                                <li>
                                                                    <span>{t.phone}: <i class="fa fa-check tu-colorgreen"></i></span>
                                                                </li>
                                                                <li>
                                                                    <span>{t.whatsapp}: <i class="fa fa-check tu-colorgreen"></i></span>
                                                                </li>
                                                                <li>
                                                                    <span>{t.email}:<i class="fa fa-check tu-colorgreen"></i></span>
                                                                </li>
                                                                <li>
                                                                    <span>{t.booking}:<i class="fa fa-check tu-colorgreen"></i></span>
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
                                                                    {isPackageBuying && clickId === item?._id ? t.buying : t.buyNow}
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
            }
            <PrimaFooter />
            <ToastContainer />
        </>
    )
}

export default ConnectionPage