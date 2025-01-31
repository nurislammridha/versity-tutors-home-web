import React, { useState } from 'react'
import PrimaText from './PrimaText'
import Image from 'next/image'
import instagram from '../assets/icons/instagram.png'
import VideoList from './VideoList'
const Tab = ({ shortDescriptions, longDescriptions, videoUrl = [] }) => {
    const [tab, setTab] = useState(0)
    // const videoUrls = [
    //     "https://www.youtube.com/embed/dQw4w9WgXcQ",
    //     "https://player.vimeo.com/video/76979871",
    //     // Add more video URLs here
    // ];
    return (
        <div className='container'>
            <div className='d-tab'>
                <div className='tab-head'>
                    <div className={tab === 0 && 'active'} onClick={() => setTab(0)}>Specification</div>
                    <div className={tab === 1 && 'active'} onClick={() => setTab(1)}>Description</div>
                    <div className={tab === 2 && 'active'} onClick={() => setTab(2)}>How to Buy</div>
                    <div className={tab === 3 && 'active'} onClick={() => setTab(3)}>Review</div>
                    <div className={tab === 4 && 'active'} onClick={() => setTab(4)}>Q & A</div>
                    <div className={tab === 5 && 'active'} onClick={() => setTab(5)}>Video</div>
                </div>
                <div className='tab-body'>
                    {tab === 0 &&
                        <div className='description'>{shortDescriptions}</div>
                    }
                    {tab === 1 &&
                        <div className='description'>{longDescriptions}</div>
                    }
                    {tab === 2 &&
                        <div className='htb'>
                            <PrimaText
                                content='Demo Text'
                                size='30px'
                                align='center'
                                color='#93278f'
                                top='5px'
                            />
                            <div className='demo'>
                                <ul className='d-left'>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <ul className='d-right'>
                                    <li>- You</li>
                                    <li>- Visit, circuitpointbd.com</li>
                                    <li>- Add to Cart</li>
                                    <li>- Coupon Code</li>
                                    <li>- Continue to confirm or Return to Shopping</li>
                                    <li>- Delivery Form (Order By / Delivery Address)</li>
                                    <li>- Confirm Your Order</li>
                                    <li>- Payment Option</li>
                                    <li>- Online Payment .. vs .. COD</li>
                                    <li>- Your Mobile Number/AC and Tranjection ID or COD Confirm YOur Order</li>
                                    <li>- ConFirm Order</li>
                                    <li>- Thanks For Ordering</li>
                                </ul>
                            </div>
                        </div>
                    }

                    {tab === 3 &&
                        <div className='d-review'>

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
                                                            A formal assessment of something sdfsdf sdsd the intension of..
                                                            <b>See More</b>
                                                        </div>
                                                        <div>
                                                            A formal assessment sds   of something with the intension of..
                                                            A formal assessment sds   of something with the intension of..
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
                    }

                    {tab === 4 &&
                        <div className='d-review d-qa'>
                            <div className='rqa'>
                                <div className='item'>
                                    <h1>Q & A</h1>
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                        <div className='users' key={index}>
                                            <Image src={instagram} className='img' />
                                            <div className='right'>
                                                <div className='top'>
                                                    <span>Abdus Kuddus</span>
                                                    <span>| 20/12/2024, 10.20PM</span>
                                                </div>
                                                <div className='bot'>
                                                    <span>Q:</span>
                                                    <span>
                                                        <div>
                                                            A formal assessment of something sdfsdf sdsd the intension of..
                                                            A formal assessment of something sdfsdf sdsd the intension of..
                                                            <b>See More</b>
                                                        </div>
                                                        <div>
                                                            <b>Ans:</b> A formal assessment sds   of something with the intension of..
                                                            Ans: A formal assessment sds   of something with the intension of..
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
                    }
                    {tab === 5 &&
                        <div>
                            {/* <h1>Live Videos</h1> */}
                            <VideoList videoUrls={videoUrl} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Tab