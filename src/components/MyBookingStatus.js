import { GetBookingByBooker } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const MyBookingStatus = ({ clientData }) => {
    const { t } = useLanguage()
    const router = useRouter()
    const dispatch = useDispatch()
    const isBookByBookerLoading = useSelector((state) => state.homeInfo.isBookByBookerLoading);
    const bookByBooker = useSelector((state) => state.homeInfo.bookByBooker);
    useEffect(() => {
        if (clientData?._id) {
            dispatch(GetBookingByBooker(clientData?._id))
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
                                    <h4>{t.myBookingStatus}</h4>
                                </div>
                            </div>
                            <div class="tu-box">
                                {/* //here */}
                                {!isBookByBookerLoading && bookByBooker !== null && bookByBooker.length > 0 ? (
                                    <table class="table table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">{t.name}</th>
                                                <th scope="col">{t.phone}</th>
                                                <th scope="col">{t.date}</th>
                                                <th scope="col">{t.details}</th>
                                                <th scope="col">{t.status}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookByBooker.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item?.clientId?.firstName + " " + item?.clientId?.lastName}</td>
                                                    <td>{item?.clientId?.phone}</td>
                                                    <td>{formatDate(item?.createdAt)}</td>
                                                    <td>
                                                        <a
                                                            className='btn btn-sm btn-info'
                                                            onClick={() => router.push(`/details/${item.clientId?._id}`)}
                                                        >{t.details}</a>
                                                    </td>
                                                    <td >
                                                        <span className='badge bg-secondary'>{item?.status.toUpperCase()}</span>
                                                    </td>
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

export default MyBookingStatus