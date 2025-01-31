import React from 'react'
import pro from '../assets/images/pro3.jpg'
import Image from 'next/image'
import PrimaText from './PrimaText'
const AllBrand = ({ list }) => {
    return (
        <div className='container'>
            <div className='all-brand'>
                <div className="head">
                    <div className="title-1">All Brands</div>
                    <div className="title-2">
                        View All
                    </div>
                </div>
                <div className='brands'>
                    {list && list.length > 0 && list.map(({ brandName, brandLogo }, index) => (
                        <div className='brand' key={index}>
                            <div className='img'>
                                <Image src={brandLogo?.url} style={{ borderRadius: '50%' }} layout='fill' />
                            </div>

                            <div className='txt'>
                                <PrimaText
                                    content={brandName}
                                    color='#FFF'
                                    size='14px'
                                    top='10px'
                                />
                            </div>
                            <div className='item'>
                                <PrimaText
                                    content='125'
                                    size='12px'
                                />
                                <PrimaText
                                    content='Item'
                                    size='12px'
                                    weight='bold'
                                    left='5px'
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className='view-more-con'>
                    <div className="view-more">
                        <span>View More</span>
                        <i class="fa fa-caret-down"></i>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default AllBrand