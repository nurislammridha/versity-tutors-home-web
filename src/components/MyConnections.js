import { GetConnectionByClient } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { convertToBanglaNumber, formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const MyConnections = ({ clientData }) => {
    const { t, language } = useLanguage()
    const router = useRouter()
    const dispatch = useDispatch()
    const icConnectionByClientLoading = useSelector((state) => state.homeInfo.icConnectionByClientLoading);
    const connectionByClientData = useSelector((state) => state.homeInfo.connectionByClientData);
    useEffect(() => {
        if (clientData?._id) {
            dispatch(GetConnectionByClient(clientData?._id))
        }
    }, [clientData])

    // console.log('subCategoryList', subCategoryList)
    return (
        <>
            <div class="col-lg-8 col-xl-9">
                <div class="tu-profilewrapper">

                    <div class="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div class="tu-boxarea">
                            <div class="tu-boxsm">
                                <div class="tu-boxsmtitle">
                                    <h4>{this.myConnectionsStatus}</h4>
                                    <a
                                        className='btn btn-success'
                                        style={{ color: '#fff' }}
                                        onClick={() => router.push("/connection")}
                                    >
                                        {t.buyNewConn}
                                    </a>

                                </div>
                            </div>
                            <div class="tu-box">
                                {/* //here */}
                                {!icConnectionByClientLoading && connectionByClientData !== null && connectionByClientData.length > 0 ? (
                                    <table class="table table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">{t.package}</th>
                                                <th scope="col">{t.price}</th>
                                                <th scope="col">{t.spendConnections}</th>
                                                <th scope="col">{t.remaining}</th>
                                                <th scope="col">{t.date}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {connectionByClientData.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{language === "en" ? item?.connectionPackageId?.name : item?.connectionPackageId?.nameBn}</td>
                                                    <td>{language === "en" ? item?.connectionPackageId?.price : convertToBanglaNumber(item?.connectionPackageId?.price)}</td>
                                                    <td>{language === "en" ? item?.spendConnection : convertToBanglaNumber(item?.spendConnection)}</td>
                                                    <td>{language === "en" ? item?.remainingConnection : convertToBanglaNumber(item?.remainingConnection)}</td>
                                                    <td>{formatDate(item?.createdAt)}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                ) : (<div>{t.noDataFound}</div>)
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default MyConnections