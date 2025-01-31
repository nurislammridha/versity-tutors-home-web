import PrimaButton from '@/components/PrimaButton'
import PrimaText from '@/components/PrimaText'
import React from 'react'
import icn from '../../assets/icons/TikTok.png'

import IncrementDec from '@/components/IncrementDec'
import Image from 'next/image'
import CapsulBanner from '@/components/CapsulBanner'
const page = () => {
    return (
        <>
            All Components List here
            <div style={{ marginTop: 50 }}>
                <i class="fa fa-search" aria-hidden="true"></i>
                <PrimaText />
            </div>
            <div style={{ marginTop: 50 }}>
                <PrimaButton
                    bgColor='yellow'
                    leftICon={icn}
                    rightICon={icn}
                />
            </div>
            <div style={{ marginTop: 50, marginLeft: "200px" }}>
                <IncrementDec />
            </div>
            <div style={{ marginTop: 50, marginLeft: "200px" }}>
                <CapsulBanner />
            </div>
            <div
                style={{ paddingBottom: "200px" }}
            >



            </div>
        </>
    )
}

export default page