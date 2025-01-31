import React, { useState } from 'react'
import txt from '../assets/icons/txt.png'
import Image from 'next/image'
import PrimaText from './PrimaText'
import pro from '../assets/images/pro3.jpg'
import PrimaButton from './PrimaButton'
import cart from '../assets/icons/cart.png'
import IncrementDec from './IncrementDec'
const FlashSale = ({ list = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4; // Number of items to show per page
    const displayedItems = list.slice(currentIndex, currentIndex + itemsPerPage);

    // Handle "Next" button click
    const handleNext = () => {
        if (currentIndex + itemsPerPage < list.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    // Handle "Previous" button click (optional)
    const handlePrevious = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };
    return (
        <div className='container'>
            <div className='flash'>
                <div className='left'>
                    <div className='img-con'>
                        <Image src={txt} className='img' />
                        <span>21</span>
                    </div>
                    <PrimaText
                        content='Hurry Up! The Offer is Limited. Grab While it lasts'
                        color='#fff'
                        size='10px'
                        top='3px'
                    />
                    <div className='items'>
                        <div className='item'>
                            <div className='box-con'>
                                <div className='box'>00</div>
                                <PrimaText
                                    content='Days'
                                    color='#fff'
                                    size='10px'
                                    top='3px'
                                />
                            </div>
                            <span></span>
                        </div>
                        <div className='item'>
                            <div className='box-con'>
                                <div className='box'>00</div>
                                <PrimaText
                                    content='Hours'
                                    color='#fff'
                                    size='10px'
                                    top='3px'
                                />
                            </div>
                            <span></span>
                        </div>
                        <div className='item'>
                            <div className='box-con'>
                                <div className='box'>00</div>
                                <PrimaText
                                    content='Min'
                                    color='#fff'
                                    size='10px'
                                    top='3px'
                                />
                            </div>
                            <span></span>
                        </div>
                        <div className='item'>
                            <div className='box-con'>
                                <div className='box'>00</div>
                                <PrimaText
                                    content='Sec'
                                    color='#fff'
                                    size='10px'
                                    top='3px'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='long'></div>
                </div>
                <div className="products">
                    {list && list.length > 0 && displayedItems.map((item, index) => (
                        <div className="product" key={index}>
                            <div className='img'>
                                <Image src={item?.productIcon?.url} layout='fill' />
                            </div>
                            <div className='txt'>
                                <PrimaText
                                    content={item.productName}
                                    size='14px'
                                    top='5px'
                                />
                            </div>
                            <div className='stars-con'>
                                <div className='stars'>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                            </div>
                            <div className='prices-con'>
                                <div className='prices'>
                                    <span>{item.price}/-</span>
                                    <span>{item.discountPrice}/-</span>
                                </div>
                            </div>

                            <div className='cart-con'>
                                <PrimaButton
                                    isLeftICon
                                    leftICon={cart}
                                    content='Add to Cart'
                                    width='90px'
                                    height='25px'
                                    color='#FFF'
                                    size='9px'
                                    weight='bold'
                                    bgColor='#9966ff'
                                    bWidth='1px'
                                    bColor='#FFF'
                                    radius='30px'
                                    right='20px'
                                    imgWidth='25px'
                                    imgHeight='25px'
                                />
                                <IncrementDec
                                    width='35px'
                                    height='25px'
                                    iWidth='25px'
                                    iHeight='25px'
                                />
                            </div>
                            <div className='foot'>
                                <span>Model: {item.model}</span>
                                <span>Sold: {item.sold}</span>
                                <span>
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                    {item.viewCount > 1000 ? (item.viewCount / 1000) + "K" : item.viewCount}
                                </span>
                            </div>
                            <div className='offer'>
                                <span>OFF</span>
                                <span>20%</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='arr' onClick={() => handleNext()}>
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}

export default FlashSale