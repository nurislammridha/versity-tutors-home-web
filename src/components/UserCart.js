"use client"
import React from 'react'
import pro from '../assets/images/pro3.jpg'
import IncrementDec from './IncrementDec'
import PrimaButton from './PrimaButton'
import Image from 'next/image'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from 'react-redux'
import { CartProductQuantity, DeleteFromCart } from '@/redux/_redux/CommonAction'
import { getCartPrice, getTotalCartPrice } from '@/assets/function/globalFunction'
import { useRouter } from 'next/navigation'
const UserCart = ({ isAddToCart = true, obj = {}, isQuantityLoading, handleSelect, selected, subTotal }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { productInfo: arr, _id: cartId, buyerId } = obj || []
    const handleQuantity = (number, productInfoId) => {
        dispatch(CartProductQuantity(number, productInfoId, cartId, buyerId))
    }
    const handleDelete = (data) => {
        confirmAlert({
            title: "Confirm To Delete",
            message: `Are you sure to delete product from cart?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => { dispatch(DeleteFromCart(data)) },
                },
                {
                    label: "No",
                },
            ],
        });
    };
    return (
        <>
            <ul>
                <li>
                    <span>Select(7)</span>
                    <span>Image</span>
                    <span>Product Details</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Total</span>
                    <span>Action</span>
                </li>
                {arr?.length > 0 ? arr.map((item, index) => (
                    <li key={index}>
                        <span>
                            <input
                                type='checkbox'
                                checked={selected.find(v => v._id === item._id)}
                                onChange={() => handleSelect(item)}
                            />
                        </span>
                        <span>
                            <div className='product' style={{ position: "relative" }}>
                                <Image src={item.productImgUrl} layout='fill' />
                            </div>
                        </span>
                        <span>
                            {item?.productDetails?.productName}
                        </span>
                        <span><h3>Tk: {getCartPrice(item)}</h3></span>
                        <span>
                            <IncrementDec
                                width='70px'
                                height='30px'
                                iHeight='35px'
                                iWidth='35px'
                                quantity={item?.quantity}
                                decrement={() => !isQuantityLoading && item?.quantity > 1 ? handleQuantity(item?.quantity - 1, item._id) : {}}
                                increment={() => !isQuantityLoading ? handleQuantity(item?.quantity + 1, item._id) : {}}
                            />
                        </span>
                        <span><h3>Tk:{item?.quantity * getCartPrice(item)}</h3></span>
                        <span className='del' onClick={() => handleDelete([item])}><i class="fa fa-trash"></i></span>
                    </li>
                )) : (
                    <div>
                        No Cart Added
                    </div>
                )}
                <li><h3>All Total:{subTotal} TK</h3></li>
            </ul>
            {isAddToCart && <div className='convert'>
                <PrimaButton
                    width='300px'
                    radius='20px'
                    height='40px'
                    bgColor='#4d4d4d'
                    content='Order Now'
                    color='#fff'
                    onClick={() => router.push("/order")}
                />
            </div>}

        </>
    )
}

export default UserCart