import React, { useEffect, useState } from 'react'
import pro from '../assets/images/pro3.jpg'
import facebook from '../assets/icons/facebook.png'
import you from '../assets/icons/you.png'
import instagram from '../assets/icons/instagram.png'
import tiktok from '../assets/icons/tik.png'
import twitter from '../assets/icons/twitter.png'
import blog from '../assets/icons/blog.png'
import star from '../assets/icons/star2.png'
import Image from 'next/image'
import CapsulBanner from './CapsulBanner'
import IncrementDec from './IncrementDec'
import PrimaButton from './PrimaButton'
import cart from '../assets/icons/cart.png'
import PrimaText from './PrimaText'
import { isDateExpired } from '@/assets/function/globalFunction'
import { useRouter } from 'next/navigation'
import { AddToCart, FalseCartAdded } from '@/redux/_redux/CommonAction'
import { useDispatch, useSelector } from 'react-redux'
//test
const DetailsBody = ({ data, isLogin }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isCartAdded = useSelector((state) => state.homeInfo.isCartAdded);
    const isCartLoading = useSelector((state) => state.homeInfo.isCartLoading);
    const { brandInfo, categoryInfo, productIcon, productImages, productName, variantProducts, price, discountPrice, model, viewCount, sold } = data || {}
    const [bigImg, setBigImg] = useState(pro)
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [buyerData, setBuyerData] = useState({})
    const [selectedVariant, setSelectedVariant] = useState([])
    const { isFromCampaign, campaignId, campaignEndDate, campaignEndTime, campaignPrice } = router.query || {}
    // const [price, setPrice] = useState({})
    const handleAddCart = () => {
        // let camData = {}
        // isFromCampaign ? camData = { campaignId, campaignEndTime, campaignEndDate, campaignPrice } : camData = {}
        const postData = { buyerId: buyerData?._id, productId: data?._id, quantity, fullImg: bigImg, variantId: selectedVariant?._id }
        isLogin ? dispatch(AddToCart(postData)) : router.push('/user/login')
        !isLogin && localStorage.setItem('redirect_details', data?._id)
        !isLogin && localStorage.setItem('redirect_url', "details")
    }
    const handleDecrement = () => {
        let x = quantity
        setQuantity(x > 1 ? --x : x)
    }
    const handleIncrement = () => {
        let x = quantity
        setQuantity(++x)
    }
    useEffect(() => {
        if (productIcon?.url) {
            setBigImg(productIcon?.url)
        }
        if (variantProducts?.length > 0) {
            setProducts(variantProducts[0]?.multipleProducts)
        }
        variantProducts?.length > 0 && setSelectedVariant(variantProducts[0])
    }, [data, variantProducts])
    useEffect(() => {
        setBuyerData(JSON.parse(localStorage.getItem('buyerData')))
        dispatch(FalseCartAdded())

    }, [])
    // console.log('selectedVariant', isLogin)
    return (
        <div className='container'>
            <div className='det-top'>
                <div className='left'>
                    <div className='img-big' >
                        <Image src={bigImg} alt="Random Image" layout="fill" objectFit='contain' />
                    </div>

                    <div className='img-con'>
                        {productImages?.length && productImages.map((item, index) => (
                            <div key={index} className={bigImg === item?.url ? 'img selected' : 'img'} onClick={() => setBigImg(item?.url)}>
                                <Image src={item?.url} layout="fill" />
                            </div>

                        ))}

                        {/* <Image src={pro} className='img selected' /> */}
                    </div>
                </div>
                <div className='mid'>
                    <div className='title'>
                        {productName}
                    </div>
                    <div className='star-con'>
                        <Image src={star} className='star' />
                        <Image src={star} className='star' />
                        <Image src={star} className='star' />
                        <Image src={star} className='star' />
                        <Image src={star} className='star' />
                    </div>
                    <div className='stock-con'>
                        <div className='item'>
                            <Image src={cart} className='s-img' />
                            <div className='txt'>Stock: In Stock</div>
                        </div>
                        <div className='item'>
                            <Image src={cart} className='s-img' />
                            <div className='txt'>Brand: {brandInfo?.brandName}</div>
                        </div>
                        <div className='item '>
                            <Image src={cart} className='s-img round' />
                            <div className='txt'>Add to Comparison</div>
                        </div>
                        <div className='item '>
                            <Image src={cart} className='s-img round' />
                            <div className='txt'>Add to Wishlist</div>
                        </div>
                    </div>
                    {/* <div className='share-con'>
                        <span>Share:</span>
                        <Image src={facebook} className='soc' />
                        <Image src={you} className='soc' />
                        <Image src={instagram} className='soc' />
                        <Image src={tiktok} className='soc' />
                        <Image src={twitter} className='soc' />
                    </div> */}
                    {/* <div className='brand-con'>
                        <span>Brand: Arduino</span>
                        <Image src={instagram} className='soc' />
                    </div> */}
                    <ul className='price'>
                        <li><span>Price:</span><span className='del'>{price}/-</span></li>
                        <li><span>{discountPrice}/-</span></li>
                        <li>Save Taka: {price - discountPrice}({Math.ceil((discountPrice * 100) / price)}%)</li>
                    </ul>
                    {/* <div className='caps'>
                        <CapsulBanner
                            content='In Stock'
                            width='140px'
                        />
                        <CapsulBanner
                            content='Add to Compare'
                            width='140px'
                        />
                        <CapsulBanner
                            content='Add to Wish List'
                            width='140px'
                        />
                    </div> */}
                    <div className='all-con'>
                        <div className='color-con'>
                            <div className='left'>{variantProducts && variantProducts[0]?.variantName}</div>
                            <div className='colors'>
                                {variantProducts?.length > 0 && variantProducts.map((item, index) => (
                                    <div key={index}
                                        onClick={() => {
                                            setProducts(item?.multipleProducts)
                                            setBigImg(item?.variantImg?.url)
                                            setSelectedVariant(item)
                                        }}
                                    >
                                        {item?.unitId.length > 0 &&
                                            <div className='c-item' >
                                                <div className={bigImg === item?.variantImg.url ? 'box-active' : 'box'}></div>
                                                <div className='txt'>{item?.unitName}</div>
                                            </div>
                                        }
                                        {item?.colorId.length > 0 &&
                                            <div className='c-item' >
                                                <div className={bigImg === item?.variantImg.url ? 'box-active' : 'box'} style={{ backgroundColor: item?.colorHexCode }}></div>
                                                <div className='txt'>{item?.colorName}</div>
                                            </div>
                                        }
                                        {item?.originId.length > 0 &&
                                            <div className='c-item' >
                                                <div className={bigImg === item?.variantImg.url ? 'box-active' : 'box'} >
                                                    <Image src={item?.originLogo.url} layout='fill' />
                                                </div>
                                                <div className='txt'>{item?.originName}</div>
                                            </div>
                                        }
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className='range-con'>
                            {products.length > 0 && products.map((item, index) => (
                                <div
                                    key={index}
                                    className='range'

                                >
                                    {item?.minQuantity}-{item?.maxQuantity} Pcs = {isDateExpired(item?.endDate) ? item?.discountPrice : item?.price}/-
                                </div>
                            ))}

                            {/* <div className='range'>1-10 Pcs = 200 /-</div>
                            <div className='range'>1-10 Pcs = 200 /-</div> */}

                        </div>
                        <div className='select-con'>
                            {products.length > 0 && products.map((item, index) => (
                                <div
                                    className='se'
                                    key={index}
                                    onClick={() => setQuantity(item?.maxQuantity)}
                                >
                                    {item?.maxQuantity}
                                </div>
                            ))}
                            <IncrementDec
                                right='20px'
                                left='20px'
                                width='110px'
                                height='30px'
                                iWidth='40px'
                                iHeight='40px'
                                quantity={quantity}
                                increment={handleIncrement}
                                decrement={handleDecrement}
                            />
                        </div>
                        <div className='btn-con'>
                            <PrimaButton
                                isLeftICon
                                leftICon={cart}
                                width='240px'
                                height='50px'
                                weight='bold'
                                size='18px'
                                content={isCartAdded ? "Already Added" : isCartLoading ? "Adding to Cart" : "Add to Cart"}
                                bgColor='#28a8e7'
                                color='#fff'
                                radius='20px'
                                onClick={() => !isCartAdded && !isCartLoading ? handleAddCart() : ""}
                            />
                            <PrimaButton
                                isLeftICon
                                leftICon={cart}
                                width='240px'
                                height='50px'
                                weight='bold'
                                size='18px'
                                content='Buy Now'
                                color='#fff'
                                bgColor='#ff66ff'
                                radius='20px'
                            />
                        </div>
                        <div className='g-info'>
                            <span>Model:{model}</span>
                            <span>Sold:{sold}</span>
                            <span>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                                {viewCount > 100 ? (viewCount / 1000) + "K" : viewCount}</span>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='item'>
                        <div className='title'>
                            Delivery Standard
                        </div>
                        <div className='sub-title'>
                            (After confirm Your Order)
                        </div>
                        <ul>
                            <li>Dhaka City:1-2 Day</li>
                            <li>Savar, Gazipur:1-2 Day</li>
                            <li>All Bangladesh:1-3 Day</li>
                            <li>Express Delivery: In 12 Hour
                                <div> (Only Dhaka City)</div>
                            </li>
                        </ul>
                    </div>
                    <div className='item'>
                        <div className='title'>
                            <span>Delivery Charge/Fee</span>
                        </div>
                        <ul>
                            <li>Dhaka City:60/- Taka</li>
                            <li>Savar, Gazipur:100/- Taka</li>
                            <li>All Bangladesh:120/- Takay</li>
                            <li>Express Delivery: 100/- Taka
                                <div> (Only Dhaka City)</div>
                            </li>
                        </ul>
                    </div>
                    <div className='item'>
                        <div className='title'>
                            <span>We Received</span>
                        </div>
                        <ul>
                            <li>COD: Cash On Delivery</li>
                            <li>Mobile Banking</li>
                            <li>Bank Transfer</li>
                            <li>Cash</li>
                        </ul>
                    </div>
                    <div className='item'>
                        <div className='title'>
                            <span>Feature By CIRCUIT POINT BD</span>
                        </div>
                        <ul>
                            <li>Flash Sale: Get more in offer Price</li>
                            <li>Free Delivery*</li>
                            <li>1% Flat Discount</li>
                            <li>Drone Builder, RC Car Builder</li>
                        </ul>
                    </div>
                    <div className='item'>
                        <PrimaText
                            align='center'
                            color='#666'
                            size='16px'
                            weight='bold'
                            content='Read and Write Blog/Project about component'
                        />
                        <PrimaButton
                            width='100px'
                            height='30px'
                            radius='20px'
                            isLeftICon={true}
                            leftICon={blog}
                            imgWidth={"20px"}
                            imgHeight={"20px"}
                            content='Blog'
                            weight='bold'
                            size='20px'
                            bgColor='#fff'
                            color='#666'
                            top='10px'
                            bottom='5px'

                        />
                    </div>
                    {/* <div className='item'>
                        <div className='title'>
                            <span>For any Query, Contact with Us:</span>
                        </div>
                        <div className='img-con'>
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                        </div>
                    </div> */}
                    {/* <div className='item'>
                        <div className='title'>
                            <span>Share This item Link</span>
                        </div>
                        <div className='img-con'>
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                            <Image src={instagram} className='img' />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default DetailsBody