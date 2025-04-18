import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { StatusSubmit } from '@/redux/_redux/CommonAction';
import { useLanguage } from '@/context/LanguageContext';
const WishList = ({ clientData }) => {
    const { t } = useLanguage()
    const router = useRouter()
    const dispatch = useDispatch()
    const { wishList } = clientData || {}
    const handleRemove = (id) => {
        const updatedWishList = clientData?.wishList.filter(item => item._id.toString() !== id);
        confirmAlert({
            title: t.remove,
            message: t.sureToRemove,
            buttons: [
                {
                    label: t.yes,
                    onClick: () => dispatch(StatusSubmit({ wishList: updatedWishList }, clientData._id,)),
                },
                {
                    label: t.no,
                },
            ],
        });
    }
    useEffect(() => {

    }, [])

    console.log('wishList', wishList)
    return (
        <>
            <div class="col-lg-8 col-xl-9">
                <div class="tu-profilewrapper">

                    <div class="tu-boxwrapper" style={{ marginTop: 0 }}>
                        <div class="tu-boxarea">
                            <div class="tu-boxsm">
                                <div class="tu-boxsmtitle">
                                    <h4>{t.mySavingsList}</h4>

                                </div>
                            </div>
                            <div class="tu-box">
                                {/* //here */}
                                {clientData !== null && wishList.length > 0 ? (
                                    <table class="table table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">{t.name}</th>
                                                <th scope="col">{t.tagLine}</th>
                                                <th scope="col">{t.status}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {wishList.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{`${item?.firstName} ${item?.lastName}`}</td>
                                                    <td>{item?.tagline}</td>
                                                    <td>
                                                        <a
                                                            className='btn btn-success btn-sm me-2'
                                                            onClick={() => router.push(`/details/${item?._id}`)}
                                                        >
                                                            <i className='fa fa-eye'></i></a>
                                                        <a
                                                            className='btn btn-danger btn-sm'
                                                            onClick={() => handleRemove(item?._id)}
                                                        ><i className='fa fa-trash'></i></a>
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

export default WishList