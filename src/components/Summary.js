import React, { useEffect, useState } from 'react'
import PrimaText from './PrimaText'
import PrimaButton from './PrimaButton'
import { getArea, getDeliveryFee } from '@/assets/function/globalFunction'
import { useSelector } from 'react-redux'

const Summary = ({ subTotal, itemNumber = 0, isDetectFromAddress = false, address = {} }) => {
    const [area, setArea] = useState("dhaka")
    const addressInput = useSelector((state) => state.homeInfo.addressInput);
    useEffect(() => {
        setArea(getArea(address))
    }, [isDetectFromAddress, addressInput])

    return (
        <div>
            <div className='summary'>
                <div className='top'>
                    <PrimaText
                        content='Summary'
                        weight='bold'
                        size='20px'
                        color='#000'
                    />
                    <PrimaButton
                        content={itemNumber + ' Item'}
                        color='#fff'
                        width='50px'
                        height='30px'
                        radius='5px'
                        bgColor='#00ff33'
                    />
                </div>
                <h6>Delivery Locationl:</h6>

                <div className='add'>
                    <span onClick={() => !isDetectFromAddress && setArea("dhaka")} className={area === "dhaka" && "act"}>Dhaka City</span>
                    <span onClick={() => !isDetectFromAddress && setArea("gazi")} className={area === "gazi" && "act"}>Gazipur, Savar</span>
                    <span onClick={() => !isDetectFromAddress && setArea("all")} className={area === "all" && "act"}>All Bangladesh</span>
                </div>
                <div className='p-con'>
                    <div>
                        <span>Subtotal</span>
                        <span>{subTotal} TK</span>
                    </div>
                    <div>
                        <span>Tax</span>
                        <span>0 TK</span>
                    </div>
                    <div>
                        <span>Delivery Fee</span>
                        <span>{getDeliveryFee(area)} TK</span>
                    </div>
                    <div>
                        <span>Discount on Product</span>
                        <span>0 TK</span>
                    </div>
                    <div>
                        <span>Grand Total</span>
                        <span>{getDeliveryFee(area) + subTotal} TK</span>
                    </div>
                </div>
                {/* <PrimaText
                    content='Subtotal : 1234 TK'
                    color='#666'
                    size='16px'
                    top='50px'
                />
                <PrimaText
                    content='Tax : 1234 TK'
                    color='#666'
                    size='16px'
                    top='8px'
                />
                <PrimaText
                    content='Discount : 1234 TK'
                    color='#666'
                    size='16px'
                    top='8px'
                />
                <PrimaText
                    content='Subtotal : 1234 TK'
                    color='#666'
                    size='16px'
                    top='8px'
                /> */}
                <div className='cop-con'>
                    <input placeholder='Coupon Code' />
                    <PrimaButton
                        content='Apply'
                        color='#fff'
                        bgColor='#29abe2'
                        width='100%'
                        height='40px'
                        radius='20px'
                    />
                </div>
                <div className='cop-txt'>
                    <PrimaText
                        content='Coupne Discunt: 0 TK'
                        top='50px'
                        color='#000'
                        size='18px'
                        bottom='20px'
                    />
                </div>
            </div>
        </div>
    )
}

export default Summary