import { GetBookingByBooker, UpdateBooking } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const WhoBookedMe = ({ clientData }) => {
    const { t, language } = useLanguage()
    const router = useRouter()
    const dispatch = useDispatch()
    const [status, setStatus] = useState("initiate") //initiate accepted rejected
    const isBookByBookerLoading = useSelector((state) => state.homeInfo.isBookByBookerLoading);
    const bookByBooker = useSelector((state) => state.homeInfo.bookByBooker);
    const isUpdateBookLoading = useSelector((state) => state.homeInfo.isUpdateBookLoading);
    const handleAccept = (item) => {
        dispatch(UpdateBooking(item?._id, { status: "accepted" }, clientData?._id, status, item, clientData))
    }
    const handleReject = (item) => {
        dispatch(UpdateBooking(item?._id, { status: "rejected" }, clientData?._id, status, item, clientData))
    }
    useEffect(() => {
        if (clientData?._id) {
            dispatch(GetBookingByBooker(clientData?._id, true, status))
        }
    }, [clientData, status])
    // console.log('subCategoryList', subCategoryList)
    return (
        <>
            <div class="col-lg-8 col-xl-9">
                <div class="tu-profilewrapper">

                    <div class="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div class="tu-boxarea">
                            <div class="tu-boxsm">
                                <div class="tu-boxsmtitle">
                                    <h4>{t.myBookingManagement}</h4>
                                </div>
                            </div>
                            <div class="tu-box">
                                {/* //here */}
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a
                                            class={`nav-link ${status === "initiate" && "active"}`}
                                            aria-current="page"

                                            onClick={() => setStatus("initiate")}
                                        >
                                            {t.initiate}
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class={`nav-link ${status === "accepted" && "active"}`}
                                            aria-current="page"

                                            onClick={() => setStatus("accepted")}
                                        >
                                            {t.accepted}
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class={`nav-link ${status === "rejected" && "active"}`}
                                            aria-current="page"

                                            onClick={() => setStatus("rejected")}
                                        >
                                            {t.rejected}
                                        </a>
                                    </li>
                                </ul>
                                {!isBookByBookerLoading && bookByBooker !== null && bookByBooker.length > 0 ? (
                                    <table class="table table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">{t.name}</th>
                                                <th scope="col">{t.phone}</th>
                                                <th scope="col">{t.date}</th>
                                                <th scope="col">{t.details}</th>
                                                <th scope="col">{t.action}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookByBooker.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item?.bookerId?.firstName + " " + item?.bookerId?.lastName}</td>
                                                    <td>{item?.bookerId?.phone}</td>
                                                    <td>{formatDate(item?.createdAt)}</td>
                                                    <td>
                                                        <a
                                                            className='btn btn-sm btn-info'
                                                            onClick={() => router.push(`/details/${item.bookerId?._id}`)}
                                                        >{t.details}</a>
                                                    </td>
                                                    <td>
                                                        {status === "initiate" ?
                                                            (<>
                                                                <a
                                                                    className='btn btn-sm btn-success'
                                                                    onClick={() => !isUpdateBookLoading && handleAccept(item)}
                                                                >
                                                                    {isUpdateBookLoading ? t.accepting : t.accept}
                                                                </a>
                                                                <a
                                                                    className='btn btn-sm btn-danger ml-2'
                                                                    onClick={() => !isUpdateBookLoading && handleReject(item)}
                                                                >
                                                                    {isUpdateBookLoading ? t.rejecting : t.reject}
                                                                </a>
                                                            </>) :
                                                            <span className='badge bg-secondary'>{item.status.toUpperCase()}</span>
                                                        }
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

export default WhoBookedMe