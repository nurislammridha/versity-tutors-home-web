import React from 'react'
import instagram from '../assets/icons/instagram.png'
import Image from 'next/image'
const ReviewAndQuestion = () => {
    return (
        <div className='container'>
            <div className='d-review'>
                <div className="head">
                    {/* <div className="title-1">Trending Products</div>
                    <div className="title-2">
                        View All
                    </div> */}
                </div>
                <div className='rqa'>
                    <div className='item'>
                        <h1>Product Review</h1>
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <div className='users' key={index}>
                                <Image src={instagram} className='img' />
                                <div className='right'>
                                    <div className='top'>
                                        <span>Abdus Kuddus</span>
                                        <span>| 20/12/2024, 10.20PM</span>
                                    </div>
                                    <div className='bot'>
                                        <span>4 Star</span>
                                        <span>
                                            <div>
                                                A formal assessment of something sdfsdf sdsd the intension of..
                                                <b>See More</b>
                                            </div>
                                            <div> A formal assessment sds   of something with the intension of..
                                                <b>See More</b>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='view-more-con'>
                            <div className="view-more">
                                <span>View More</span>
                                <i class="fa fa-caret-down"></i>
                            </div>
                        </div>
                        <div className='input-con'>
                            <Image src={instagram} className='img' />
                            <input
                                placeholder='enter text'
                            />
                            <span>Submit</span>
                        </div>
                    </div>
                    <div className='item'>
                        <h1>Product Review</h1>
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <div className='users' key={index}>
                                <Image src={instagram} className='img' />
                                <div className='right'>
                                    <div className='top'>
                                        <span>Abdus Kuddus</span>
                                        <span>| 20/12/2024, 10.20PM</span>
                                    </div>
                                    <div className='bot'>
                                        <span>4 Star</span>
                                        <span>
                                            <div>
                                                A formal assessment of something sdfsdf sdsd the intension of..
                                                <b>See More</b>
                                            </div>
                                            <div> A formal assessment sds   of something with the intension of..
                                                <b>See More</b>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='view-more-con'>
                            <div className="view-more">
                                <span>View More</span>
                                <i class="fa fa-caret-down"></i>
                            </div>
                        </div>
                        <div className='input-con'>
                            <Image src={instagram} className='img' />
                            <input
                                placeholder='enter text'
                            />
                            <span>Submit</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ReviewAndQuestion