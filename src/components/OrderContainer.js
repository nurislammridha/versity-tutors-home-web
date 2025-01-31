"use client"
import React, { useEffect, useState } from 'react'
import pro from '../assets/images/pro3.jpg'
import Image from 'next/image'
import PrimaText from './PrimaText'
import UserCart from './UserCart'
import PrimaButton from './PrimaButton'
import Summary from './Summary'
import DeliveryLocation from './DeliveryLocation'
import free from '../assets/icons/free.png'
import OrderHeader from './OrderHeader'
import Payment from './Payment'
import { useDispatch, useSelector } from 'react-redux'
import { GetCartListByBuyer } from '@/redux/_redux/CommonAction'
import { getArea, getDeliveryFee, getTotalCartPrice } from '@/assets/function/globalFunction'
import { showToast } from '@/utils/ToastHelper'
import PlaceOrder from './PlaceOrder'
import { useRouter } from 'next/navigation'
const OrderContainer = () => {
    const router = useRouter()
    const [state, setState] = useState("cart") //cart address payment confirm
    const [address, setAddress] = useState({}) //cart address payment confirm
    const dispatch = useDispatch()
    const cartApiList = useSelector((state) => state.homeInfo.cartList);
    const addressInput = useSelector((state) => state.homeInfo.addressInput);
    const isQuantityLoading = useSelector((state) => state.homeInfo.isQuantityLoading);
    const isCartListCalled = useSelector((state) => state.homeInfo.isCartListCalled);
    const isRemovedFromCart = useSelector((state) => state.homeInfo.isRemovedFromCart);
    const [selected, setSelected] = useState([])
    const [subTotal, setSubtotal] = useState([])
    const newArr = () => {
        let arr = []
        let cart = JSON.parse(localStorage.getItem("cartList"))?.productInfo
        console.log('cart', cart)
        cartApiList?.productInfo.forEach(item => {
            selected.forEach(item2 => {
                if (item2._id === item._id) {
                    arr.push(item)
                }
            });
        });

        return arr
    }
    const handleSelect = (item) => {
        let isExistArr = selected.filter(el => el._id === item._id)
        if (isExistArr.length > 0) {
            setSelected(l => l.filter(el => el._id !== item._id));
        } else {
            setSelected(prevState => [...prevState, item]);
        }

    }
    const handleCart = () => {
        if (selected.length === 0) {
            showToast("error", "Please select at least 1 product to continue")
            return 0
        }
        setState("address")
    }
    useEffect(() => {
        const buyerId = JSON.parse(localStorage.getItem("buyerData") || {})?._id
        dispatch(GetCartListByBuyer(buyerId))

    }, [])
    useEffect(() => {
        if (isRemovedFromCart) {
            setSelected([])
        } else if (isCartListCalled && cartApiList?.productInfo?.length > 0 && selected?.length > 0) {
            setSelected(newArr())
            // dispatch(FalseCartCalled())
        }
    }, [cartApiList])
    useEffect(() => {
        setSubtotal(getTotalCartPrice(selected))
    }, [selected])
    useEffect(() => {
        setState("cart")
    }, [router])

    // console.log('sele', selected)
    return (
        <div className='container'>
            <div className='order'>
                <OrderHeader state={state} />
                {state === "cart" &&
                    <div className='cart-con'>
                        {/* <div className='free'>
                            <Image src={free} className='freeImg' />
                            <div className='taka'>
                                <div className='txt'>
                                    <span>2050 Taka :</span>
                                    <span>Add More For Free Delivery</span>
                                </div>
                                <div className='bar'></div>
                            </div>
                        </div> */}
                        <div className='cart-sum'>
                            <UserCart
                                isAddToCart={false}
                                obj={cartApiList}
                                isQuantityLoading={isQuantityLoading}
                                handleSelect={handleSelect}
                                selected={selected}
                                subTotal={subTotal}
                            />
                            <Summary subTotal={subTotal} itemNumber={selected.length} />
                        </div>
                        <div className='dflex jcc'>
                            <PrimaButton
                                top={10}
                                bottom={20}
                                content='Continue'
                                color='#fff'
                                bgColor='#29abe2'
                                width={300}
                                height='40px'
                                radius='20px'
                                onClick={() => handleCart()}
                            />
                        </div>
                    </div>
                }
                {state === "address" &&
                    <div className='del-con'>
                        <DeliveryLocation setState={setState} setAddress={setAddress} />
                        <Summary subTotal={subTotal} address={addressInput} isDetectFromAddress={true} itemNumber={selected.length} />
                    </div>
                }
                {state === "payment" &&
                    <Payment
                        address={address}
                        subTotal={subTotal}
                        deliveryFee={getDeliveryFee(getArea(address))}
                        products={selected}
                        setState={setState}
                    />
                }
                {state === "confirm" &&
                    <div className='con-con'>
                        <PlaceOrder />
                    </div>
                }


            </div>
        </div>
    )
}

export default OrderContainer