import React from 'react'
import pro from '../assets/images/pro3.jpg'
import cart from '../assets/icons/cart.png'
import Image from 'next/image'
const RemindProduct = () => {
    return (
        <div className='d-remind'>
            <div className='cart'>
                <div className='up'>
                    <i class="fa fa-chevron-up" aria-hidden="true"></i>
                </div>
                <Image src={pro} className='pro' />
                <div className='txt'>
                    Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit,
                    sed diam nonummy nibh euis
                    Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit,
                    sed diam nonummy nibh euis
                </div>
                <div className='price'>
                    <div className='item del'>1500/-</div>
                    <div className='item or'>1500/-</div>
                </div>
                <div className='bag'>
                    <Image src={cart} className='img' />
                </div>
                <div className='bag com'>
                    <Image src={cart} className='img' />
                </div>


            </div>
        </div>
    )
}

export default RemindProduct