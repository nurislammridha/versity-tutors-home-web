import React from 'react'
import s0 from '../assets/icons/share/s0.png'
import s1 from '../assets/icons/share/s1.png'
import s2 from '../assets/icons/share/s2.png'
import s3 from '../assets/icons/share/s3.png'
import s4 from '../assets/icons/share/s4.png'
import s5 from '../assets/icons/share/s5.png'
import s6 from '../assets/icons/share/s6.png'
import s7 from '../assets/icons/share/s7.png'
import s8 from '../assets/icons/share/s8.png'
import s9 from '../assets/icons/share/s9.png'
import s10 from '../assets/icons/share/s10.png'
import s11 from '../assets/icons/share/s11.png'
import s12 from '../assets/icons/share/s12.png'
import Image from 'next/image'
const Share = () => {
    return (
        <div className='container'>
            <div className='d-share'>
                <div className='left'>
                    <span>Share</span>
                    <Image src={s0} className='s0' />
                </div>
                <div className='right'>
                    <Image src={s1} className='s' />
                    <Image src={s2} className='s' />
                    <Image src={s3} className='s' />
                    <Image src={s4} className='s' />
                    <Image src={s5} className='s' />
                    <Image src={s6} className='s' />
                    <Image src={s7} className='s' />
                    <Image src={s8} className='s' />
                    <Image src={s9} className='s' />
                    <Image src={s10} className='s' />
                    <Image src={s11} className='s' />
                    <Image src={s12} className='s' />
                </div>
            </div>
        </div>
    )
}

export default Share