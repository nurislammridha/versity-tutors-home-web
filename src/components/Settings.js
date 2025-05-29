import { GetClientById, GetConnectionByClient, StatusSubmit } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useLanguage } from '@/context/LanguageContext';
const Settings = ({ clientData }) => {
    const { t } = useLanguage()
    const dispatch = useDispatch()
    const [index, setIndex] = useState(-1)
    const isStatusLoading = useSelector((state) => state.homeInfo.isStatusLoading);
    const handleBooked = (isBooked) => {
        setIndex(1)
        confirmAlert({
            title: `${t.confirmTo} ${isBooked ? t.freeMe : t.bookedMe}`,
            message: `${t.after} ${isBooked ? t.receiveReq : t.youWillNot}. ${t.areYourSure} ${isBooked ? t.freeMe : t.bookedMe}?`,
            buttons: [
                {
                    label: t.yes,
                    onClick: () => dispatch(StatusSubmit({ isBooked: !isBooked }, clientData?._id)),
                },
                {
                    label: t.no,
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
                    label: t.yes,
                    onClick: () => dispatch(StatusSubmit({ reviewStatus: clientData?.reviewStatus == "created" ? "requestInitiated" : "receiveForReview", isApproved: false }, clientData?._id, clientData)),
                },
                {
                    label: t.no,
                },
            ],
        });
    }
    useEffect(() => {
        console.log('hello', 123)
        if (clientData !== null) {
            dispatch(GetClientById(clientData?._id))
        }
    }, [clientData])

    // console.log('clientData', clientData)
    return (
        <>
            <div class="col-lg-8 col-xl-9">
                <div class="tu-profilewrapper">

                    <div class="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div class="tu-boxarea">
                            <div class="tu-boxsm">
                                <div class="tu-boxsmtitle">
                                    <h4>{t.someOp}</h4>
                                    {/* <h4>{clientData?.isApproved ? t.approved : t.unApprove}</h4> */}
                                    <h4>{clientData?.reviewStatus}</h4>
                                </div>
                            </div>
                            <div class="tu-box">
                                <table class="table table-striped mt-2">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">{t.opName}</th>
                                            <th scope="col">{t.status}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <th scope="row">01</th>
                                            <td> {clientData?.isBooked ? t.bookedNowNow : t.freeNow}</td>
                                            <td>
                                                <a
                                                    className='btn btn-success btn-sm'
                                                    onClick={() => !isStatusLoading && handleBooked(clientData?.isBooked)}
                                                >{index === 1 && isStatusLoading ? t.loading : clientData?.isBooked ? t.freeMe : t.bookedMe}</a>
                                            </td>
                                        </tr>
                                        {/* {clientData?.isTutorAccount && */}
                                        <tr >
                                            <th scope="row">02</th>
                                            <td>{clientData?.reviewStatus === "requestInitiated" ? t.reqSent : t.reqToAdmin}</td>
                                            <td>
                                                <a
                                                    className='btn btn-success btn-sm'
                                                    onClick={() => ["created", "sendForReview"].includes(clientData?.reviewStatus) && !isStatusLoading && handleRequest()}
                                                >
                                                    {index === 2 && isStatusLoading
                                                        ? t.loading
                                                        : ["requestInitiated", "underReview", "approved", "rejected"].includes(clientData?.reviewStatus)
                                                            ? t.requestSent
                                                            : t.sendReq}

                                                </a>
                                            </td>
                                        </tr>
                                        {/* } */}

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