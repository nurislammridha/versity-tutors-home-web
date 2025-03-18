import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { StatusSubmit } from '@/redux/_redux/CommonAction';
const WishList = ({ clientData }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { wishList } = clientData || {}
    const handleRemove = (id) => {
        const updatedWishList = clientData?.wishList.filter(item => item._id.toString() !== id);
        confirmAlert({
            title: "Remove",
            message: `Are you sure you want to remove?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => dispatch(StatusSubmit({ wishList: updatedWishList }, clientData._id,)),
                },
                {
                    label: "No",
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
                                    <h4>My Savings List</h4>

                                </div>
                            </div>
                            <div class="tu-box">
                                {/* //here */}
                                {clientData !== null && wishList.length > 0 ? (
                                    <table class="table table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Tag Line</th>
                                                <th scope="col">Status</th>
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
                                ) : (<div>No savings found</div>)
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