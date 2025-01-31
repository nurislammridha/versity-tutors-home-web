import Image from 'next/image'
import React, { useState } from 'react'
import pro from '../assets/images/pro3.jpg'
import PrimaText from './PrimaText'
import PrimaButton from './PrimaButton'
import cart from '../assets/icons/cart.png'
import IncrementDec from './IncrementDec'
import LoadingSpinner from './LoadingSpinner'
import { useRouter } from 'next/navigation'
import { AddToCart } from '@/redux/_redux/CommonAction'
import { useDispatch, useSelector } from 'react-redux'
const HomeProducts = ({
    title = "Trending Products",
    isViewAll = true,
    isHeader = true,
    isViewMore = true,
    list = [],
    loading = false,
    isLogin = false,
    buyerData = {}
}) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [id, setId] = useState("")
    const isCartLoading = useSelector((state) => state.homeInfo.isCartLoading);
    // console.log('list', list)
    const handleAddCart = (data) => {
        setId(data?._id)
        const postData = { buyerId: buyerData?._id, productId: data?._id, quantity: 1, fullImg: data?.productIcon?.url, variantId: data?.variantProducts[0]._id }
        isLogin ? dispatch(AddToCart(postData)) : router.push('/user/login')
    }
    return (
        <div className='container'>
            <div className="home-product">
                {isHeader && <div className="head">
                    <div className="title-1">{title}</div>
                    <div className="title-2" onClick={() => router.push("/all")}>
                        {isViewAll && "View All"}
                    </div>
                </div>}
                {loading ?
                    <div className='dflex aic jcc'><LoadingSpinner /></div> :
                    <div className="products">
                        {list && list.length > 0 && list.map((item, index) => (
                            <div className="product" key={index}>

                                <div onClick={() => router.push(`/details/${item._id}`)}>
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
                                        content={item?._id === id && isCartLoading ? "Adding.." : "Add to Cart"}
                                        width='125px'
                                        height='25px'
                                        color='#FFF'
                                        size='13px'
                                        weight='bold'
                                        bgColor='#9966ff'
                                        bWidth='1px'
                                        bColor='#FFF'
                                        radius='30px'
                                        right='25px'
                                        onClick={() => !isCartLoading ? handleAddCart(item) : ""}
                                    />
                                    <IncrementDec
                                        width='38px'
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
                }

                {isViewMore && <div className='view-more-con'>
                    <div className="view-more">
                        <span>View More</span>
                        <i class="fa fa-caret-down"></i>
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default HomeProducts