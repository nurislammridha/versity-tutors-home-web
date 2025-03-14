import { GetConnectionByClient, StatusSubmit } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Settings = ({ clientData }) => {
    const dispatch = useDispatch()
    const [index, setIndex] = useState(-1)
    const isStatusLoading = useSelector((state) => state.homeInfo.isStatusLoading);
    const handleBooked = (isBooked) => {
        setIndex(1)
        confirmAlert({
            title: `Confirm To ${isBooked ? "Free Me" : "Booked me"}`,
            message: `After ${isBooked ? "Free Me , You will receive ne request" : "Booked me you will not be able new request"}. Are you sure to ${isBooked ? "Free Me" : "Booked me"}?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => dispatch(StatusSubmit({ isBooked: !isBooked }, clientData?._id)),
                },
                {
                    label: "No",
                },
            ],
        });
    }
    const handleRequest = () => {
        setIndex(2)
        confirmAlert({
            title: `Confirm To Send request`,
            message: `After Request to admin, You will be approved. Are you sure to Request for approving"`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => dispatch(StatusSubmit({ isRequestToApprove: true }, clientData?._id)),
                },
                {
                    label: "No",
                },
            ],
        });
    }

    // console.log('subCategoryList', subCategoryList)
    return (
        <>
            <div class="col-lg-8 col-xl-9">
                <div class="tu-profilewrapper">

                    <div class="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div class="tu-boxarea">
                            <div class="tu-boxsm">
                                <div class="tu-boxsmtitle">
                                    <h4>Some of My Operational Status</h4>

                                </div>
                            </div>
                            <div class="tu-box">
                                <table class="table table-striped mt-2">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Operation Name</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <th scope="row">01</th>
                                            <td> {clientData?.isBooked ? "I'm booked now, Make My Status free" : "I'm free now,  Make My Status booked"}</td>
                                            <td>
                                                <a
                                                    className='btn btn-success btn-sm'
                                                    onClick={() => !isStatusLoading && handleBooked(clientData?.isBooked)}
                                                >{index === 1 && isStatusLoading ? "Loading..." : clientData?.isBooked ? "Free Me" : "Booked Me"}</a>
                                            </td>
                                        </tr>
                                        <tr >
                                            <th scope="row">02</th>
                                            <td>{clientData?.isRequestToApprove ? "Request was sent to admin for approving me" : "Send Request to admin for approving me"}</td>
                                            <td>
                                                <a
                                                    className='btn btn-success btn-sm'
                                                    onClick={() => !clientData?.isRequestToApprove && !isStatusLoading && handleRequest()}
                                                >{index === 2 && isStatusLoading ? "Loading" : clientData?.isRequestToApprove ? "Request sent" : "Send Request"}</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Settings