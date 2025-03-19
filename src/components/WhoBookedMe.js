import { GetBookingByBooker, UpdateBooking } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';

const WhoBookedMe = ({ clientData }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [status, setStatus] = useState("initiate") //initiate accepted rejected
    const isBookByBookerLoading = useSelector((state) => state.homeInfo.isBookByBookerLoading);
    const bookByBooker = useSelector((state) => state.homeInfo.bookByBooker);
    const isUpdateBookLoading = useSelector((state) => state.homeInfo.isUpdateBookLoading);
    const handleAccept = (item) => {
        dispatch(UpdateBooking(item?._id, { status: "accepted" }, clientData?._id, status))
    }
    const handleReject = (item) => {
        dispatch(UpdateBooking(item?._id, { status: "rejected" }, clientData?._id, status))
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
                                    <h4>My Booking Management</h4>
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
                                            Initiate
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class={`nav-link ${status === "accepted" && "active"}`}
                                            aria-current="page"

                                            onClick={() => setStatus("accepted")}
                                        >
                                            Accepted
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class={`nav-link ${status === "rejected" && "active"}`}
                                            aria-current="page"

                                            onClick={() => setStatus("rejected")}
                                        >
                                            Rejected
                                        </a>
                                    </li>
                                </ul>
                                {!isBookByBookerLoading && bookByBooker !== null && bookByBooker.length > 0 ? (
                                    <table class="table table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Details</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookByBooker.map((item, index) => (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item?.bookerId?.firstName + " " + item?.bookerId?.lastName}</td>
                                                    <td>{item?.bookerId?.phone}</td>
                                                    <td>{formatDate(item?.createdAt)}</td>
                                                    <td>
                                                        <a
                                                            className='btn btn-sm btn-info'
                                                            onClick={() => router.push(`/details/${item.bookerId?._id}`)}
                                                        >Details</a>
                                                    </td>
                                                    <td>
                                                        {status === "initiate" ?
                                                            (<>
                                                                <a
                                                                    className='btn btn-sm btn-success'
                                                                    onClick={() => !isUpdateBookLoading && handleAccept(item)}
                                                                >
                                                                    {isUpdateBookLoading ? "Accepting" : "Accept"}
                                                                </a>
                                                                <a
                                                                    className='btn btn-sm btn-danger ml-2'
                                                                    onClick={() => !isUpdateBookLoading && handleReject(item)}
                                                                >
                                                                    {isUpdateBookLoading ? "Rejecting" : "Reject"}
                                                                </a>
                                                            </>) :
                                                            <span className='badge bg-secondary'>{item.status.toUpperCase()}</span>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (<div>No data found</div>)
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