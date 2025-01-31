import React from 'react'
import pro from '../assets/images/pro3.jpg'
import Image from 'next/image'
import PrimaText from './PrimaText'
const HomePartner = () => {
    return (
        <div className='container'>
            <div className='partner_par'>
                <div className="head">
                    <div className="title-1">All Categories</div>
                    <div className="title-2">
                        View All
                    </div>
                </div>
                <div className='partners-con'>
                    <div className='txt'>
                        We are Supplier of
                    </div>
                    <div className='partners'>
                        {[1, 2, 3, 4, 5, 6, 7, 7].map((_, index) => (
                            <div className='partner' key={index}>
                                <Image src={pro} className='img' />
                                <div className='title'>
                                    <div>
                                        <PrimaText
                                            content='ABC Company'
                                            size='20px'
                                            weight='bold'
                                        />
                                        <PrimaText
                                            content='ABC Company Abc Comp'
                                            size='12px'
                                            top='3px'
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='view-more-con'>
                    <div className="view-more">
                        <span>View More</span>
                        <i class="fa fa-caret-down"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePartner