"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from '../assets/icons/user.png'
import PrimaText from './PrimaText'
import OrderList from './OrderList'
import UserCart from './UserCart'
import { useDispatch, useSelector } from 'react-redux'
import { GetCartListByBuyer, GetOrderByBuyer } from '@/redux/_redux/CommonAction'
import { getTotalCartPrice } from '@/assets/function/globalFunction'
import AddressList from './AddressList'
const UserContainer = () => {
    const dispatch = useDispatch()
    const [tab, setTab] = useState("dashboard")
    const [selected, setSelected] = useState([])
    const [subTotal, setSubtotal] = useState([])
    const [buyerData, setBuyerData] = useState({})
    const { buyerName, buyerEmail, addressInfo, _id } = buyerData
    const cartApiList = useSelector((state) => state.homeInfo.cartList);
    const isQuantityLoading = useSelector((state) => state.homeInfo.isQuantityLoading);
    const orderList = useSelector((state) => state.homeInfo.orderList);
    const handleSelect = (item) => {
        let isExistArr = selected.filter(el => el._id === item._id)
        if (isExistArr.length > 0) {
            setSelected(l => l.filter(el => el._id !== item._id));
        } else {
            setSelected(prevState => [...prevState, item]);
        }

    }
    useEffect(() => {
        dispatch(GetCartListByBuyer(_id))
    }, [buyerData])
    useEffect(() => {
        setSubtotal(getTotalCartPrice(selected))
    }, [selected])
    useEffect(() => {
        dispatch(GetOrderByBuyer())
    }, [tab])

    useEffect(() => {
        setBuyerData(JSON.parse(localStorage.getItem('buyerData')))
    }, [])
    // console.log('buyerData', _id)
    return (
        <div className='container'>
            <div className='user'>
                <div className='left'>
                    <div className='pro'>
                        <Image src={user} className='img' />
                        <PrimaText
                            content={buyerName}
                            color='#fff'
                            top='10px'
                        />
                        <PrimaText
                            content='Mob: 01XXXXXXXXX'
                            color='#fff'
                            top='10px'
                        />
                        <PrimaText
                            content={`Email: ${buyerEmail}`}
                            color='#fff'
                            top='10px'
                            size='12px'
                        />
                    </div>
                    <div className='menu'>
                        <PrimaText
                            color='#0071bc'
                            top='20px'
                            left='20px'
                            bottom='10px'
                            size='20px'
                            content='DASHBOARD'
                        />
                        <ul>
                            <li onClick={() => setTab("cart")} className={tab === "cart" && "active"}>Cart List(24)</li>
                            {/* <li onClick={() => setTab("wish")}>Wish List (24)</li> */}
                            <li onClick={() => setTab("All")} className={tab === "All" && "active"}>All Order</li>
                            <li onClick={() => setTab("Created")} className={tab === "Created" && "active"}>Pending Order</li>
                            <li onClick={() => setTab("Confirmed")} className={tab === "Confirmed" && "active"}>Confirmed Order</li>
                            <li onClick={() => setTab("Processing")} className={tab === "Processing" && "active"}>Processing Order</li>
                            <li onClick={() => setTab("Picked")} className={tab === "Picked" && "active"}>Picked Order</li>
                            <li onClick={() => setTab("Shipped")} className={tab === "Shipped" && "active"}>Shipped Order</li>
                            <li onClick={() => setTab("Delivered")} className={tab === "Delivered" && "active"}>Delivered Order</li>
                            <li onClick={() => setTab("Cancelled")} className={tab === "Cancelled" && "active"}>Cancelled Order</li>
                            {/* <li onClick={() => setTab("return")} className={tab === "return" && "active"}>Return request (24)</li> */}
                        </ul>
                        <PrimaText
                            color='#0071bc'
                            top='20px'
                            left='20px'
                            bottom='10px'
                            size='20px'
                            content='ACCOUNT SETTINGS'
                        />
                        <ul>
                            <li>Profile</li>
                            <li onClick={() => setTab("address")} className={tab === "address" && "active"}>Address</li>
                            {/* <li>Shipping methods</li>
                            <li>Payment Methods</li>
                            <li>Review</li> */}
                        </ul>
                    </div>
                </div>
                <div className='right'>
                    {tab === "dashboard" && <>
                        <h4>Get 1% Flat Discount in All Order</h4>
                        <div className='body'>
                            <div className='dflex jcc aic'><h1>Dashboard</h1></div>
                        </div>
                    </>}
                    {tab === "cart" && <>
                        <h4>Cart List</h4>
                        <div className='body'>
                            <UserCart
                                isAddToCart={true}
                                obj={cartApiList}
                                isQuantityLoading={isQuantityLoading}
                                handleSelect={handleSelect}
                                selected={selected}
                                subTotal={subTotal}
                            />
                        </div>
                    </>}
                    {tab === "wish" && <>
                        <h4>Wish List</h4>
                        <div className='body'>
                            <UserCart />
                        </div>
                    </>}
                    {(tab === "All" || tab === "Created" || tab === "Confirmed" || tab === "Processing" || tab === "Picked" || tab === "Shipped" || tab === "Delivered" || tab === "Cancelled") && <>
                        <h4>{tab === "Created" ? "Processing" : tab} Orders</h4>
                        <div className='body'>
                            <OrderList
                                orderList={orderList}
                                tab={tab}
                            />
                        </div>
                    </>}
                    {tab === "address" && <>
                        <h4>Address List</h4>
                        <div className='body'>
                            <AddressList
                                list={addressInfo}
                            />
                        </div>
                    </>}


                </div>
            </div>
        </div>
    )
}

export default UserContainer