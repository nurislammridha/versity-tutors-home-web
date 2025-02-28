import { GetConnectionByClient } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../public/function/globalFunction';
import { useRouter } from 'next/navigation';

const MyConnections = ({ clientData }) => {
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
                                    <h4>My Connections Status</h4>
                                </div>
                            </div>
                            <div class="tu-box">
                                {/* //here */}
                                {!icConnectionByClientLoading && connectionByClientData !== null && connectionByClientData.length > 0 ? (
                                    <table class="table table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Package</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Spend Connections</th>
                                                <th scope="col">Remaining</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {connectionByClientData.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item?.connectionPackageId?.name}</td>
                                                    <td>{item?.connectionPackageId?.price}</td>
                                                    <td>{item?.spendConnection}</td>
                                                    <td>{item?.remainingConnection}</td>
                                                    <td>{formatDate(item?.createdAt)}</td>
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

export default MyConnections