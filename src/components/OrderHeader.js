import React from 'react'
import pro from '../assets/images/pro3.jpg'
import activated from '../assets/icons/jactivated.png'
import inActive from '../assets/icons/jinactive.png'
import active from '../assets/icons/jactive.png'
import ok from '../assets/icons/jok.png'
import con from '../assets/icons/confirm.png'
import pay from '../assets/icons/payment.png'
import Image from 'next/image'
import PrimaText from './PrimaText'
const OrderHeader = ({ state }) => {
    return (
        <div className='header'>
            <div className='item'>
                <Image src={activated} className='header-img' />
                <PrimaText
                    content='1. My Cart'
                    color='#000'
                    size='16px'
                    top='3px'
                    weight='bold'
                />
            </div>
            {/* <i class="fa fa-long-arrow-right" aria-hidden="true"></i> */}
            <div className="arrow"></div>
            <div className='item'>
                <Image src={state === "cart" ? active : activated} className='header-img' />
                <PrimaText
                    content='2.Delivery Address'
                    color='#000'
                    size='16px'
                    top='3px'
                    weight='bold'
                />
            </div>
            <div className="arrow"></div>
            <div className='item'>
                <Image src={(state === "payment" || state === "confirm") ? pay : inActive} className='header-img' />
                <PrimaText
                    content='3.Payment'
                    color='#000'
                    size='16px'
                    top='3px'
                    weight='bold'
                />
            </div>
            <div className="arrow"></div>
            <div className='item'>
                <Image src={state === "confirm" ? con : ok} className='header-img' />
                <PrimaText
                    content='4. Confirm'
                    color='#000'
                    size='16px'
                    top='3px'
                    weight='bold'
                />
            </div>

        </div>
    )
}

export default OrderHeader