import React, { useEffect } from 'react'
import PrimaText from './PrimaText'
import Image from 'next/image'
import pro from '../assets/images/pro3.jpg'
import { FalseOrderCreated, SubmitOrder } from '@/redux/_redux/CommonAction'
import { useDispatch, useSelector } from 'react-redux'
const Payment = ({ address, subTotal, deliveryFee, products, setState }) => {
    const dispatch = useDispatch();
    const isOrderCreated = useSelector((state) => state.homeInfo.isOrderCreated);
    const isOrderLoading = useSelector((state) => state.homeInfo.isOrderLoading);
    const handleOrder = () => {
        dispatch(SubmitOrder({ address, subTotal, deliveryFee, products }))

    }
    useEffect(() => {
        if (isOrderCreated) {
            setState("confirm")
            dispatch(FalseOrderCreated())
        }
    }, [isOrderCreated])
    return (
        <div className='pay-con'>
            {/* <div className='item'>
                <div className='head'>
                    <PrimaText
                        content='Bank/Card Transfer'
                        size='20px'
                    />
                </div>
                <div className='banks'>
                    <Image src={pro} className='bank' />
                    <Image src={pro} className='bank' />
                    <Image src={pro} className='bank' />
                    <Image src={pro} className='bank' />
                </div>
            </div> */}
            {/* <div className='item'>
                <div className='head'>
                    <PrimaText
                        content='Bank/Card Transfer'
                        size='20px'
                    />
                    <PrimaText
                        content='[Nagad, bKash, Rocket]'
                        size='14px'
                        top='5px'
                    />
                </div>
                <div className='banks'>
                    <Image src={pro} className='bank mfs' />
                    <Image src={pro} className='bank mfs' />
                    <Image src={pro} className='bank mfs' />
                    <Image src={pro} className='bank mfs' />
                </div>
            </div> */}
            <div className='item' onClick={() => { !isOrderLoading && handleOrder() }}>
                <div className='head'>
                    <PrimaText
                        content='Cod'
                        size='30px'
                    />
                    <PrimaText
                        content='[Cash On Delivery]'
                        size='14px'
                        top='5px'
                    />
                </div>
                <div className='banks'>
                    <PrimaText
                        content={isOrderLoading ? "Ordering..." : 'Click here for confirm order with cod'}
                        size='14px'
                        top='5px'
                    />
                </div>
            </div>
            {/* <div className='res'>
                <ul>
                    <li>
                        <PrimaText
                            content='1450 TK'
                            size='30px'
                            color='#ffF'
                        />
                    </li>
                    <li>
                        <PrimaText
                            content='Nagad, bKash, Upay'
                            top='5px'
                        />
                        <PrimaText
                            content='Mobile Payment Number'
                            top='5px'
                        />
                        <PrimaText
                            content='01871808814'
                            size='20px'
                            top='5px'
                        />
                    </li>
                    <li>
                        <PrimaText
                            content='Bank/ Card Transfer...'
                            top='5px'
                        />
                        <PrimaText
                            content='A/C Number'
                            top='5px'
                        />
                        <PrimaText
                            content='01871808814'
                            size='20px'
                            top='5px'
                        />
                    </li>
                </ul>
            </div> */}
        </div>
    )
}

export default Payment