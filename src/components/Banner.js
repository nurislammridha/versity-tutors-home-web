import React, { useEffect, useState } from 'react'
import cart from '../assets/icons/cart.png'
import pc from '../assets/icons/pc.png'
import ret from '../assets/icons/return.png'
import free from '../assets/icons/free.png'
import support from '../assets/icons/support.png'
import quality from '../assets/icons/quality.png'
import slide1 from '../assets/images/slide1.png'
import slide2 from '../assets/images/slide3.jpg'
import slide3 from '../assets/images/slide3.png'
import slide4 from '../assets/images/slide4.jpg'
import Image from "next/image";
// Owl Carousel....
var $ = require("jquery");
if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import OwlCarousel from "react-owl-carousel";
import dynamic from "next/dynamic";
import { modifyCat } from '@/assets/function/globalFunction'
import LoadingSpinner from './LoadingSpinner'
import { useRouter } from 'next/navigation'
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

const Banner = ({ list, loading }) => {
    const router = useRouter()
    const [enter, setEnter] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([])
    const [subSubCategories, setSubSubCategories] = useState([])
    const [catId, setCatId] = useState("")
    const [subCatId, setSubCatId] = useState()
    // const [subSubCatId, setSubSubCatId] = useState()
    const handleCategoryHover = (item) => {
        // console.log('item', item)
        setHoveredCategory(item.name);
        setHoveredSubCategory(null);
        setSubCategories(item.subCategories)
        setSubSubCategories([])
        setCatId(item.id)
    };

    const handleSubCategoryHover = (item) => {
        setHoveredSubCategory(item.name);
        setSubSubCategories(item.subCategories)
        setSubCatId(item.id)
    };

    const handleSubSubCategoryHover = (category, subcategory) => {
        // setSelectedCategory({ category, subcategory });
    };
    const handelLeave = () => {
        setSubCategories([])
        setSubSubCategories([])
        setEnter(false)
    };

    return (
        <div className="hero">
            <div className="left-con" onMouseLeave={() => handelLeave()} onMouseEnter={() => setEnter(true)}>
                <div className=' left'>
                    <div className='menu'>
                        <i class="fa fa-bars"></i>
                        <span>All Categories</span>
                    </div>
                    {loading ? enter ? <LoadingSpinner /> : "" :
                        <ul>
                            {list !== null && list?.length > 0 && modifyCat(list).map((category, index) => (
                                <li key={index}
                                    onMouseEnter={() => handleCategoryHover(category)}
                                    className={hoveredCategory === category.name && "cat-selected"}
                                    onClick={() => router.push(`/all?catName=${category?.name}&catId=${category?.id}`)}
                                >
                                    <div>
                                        <Image src={pc} className='icn' />
                                        <span>{category.name}</span>
                                    </div>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                            ))}

                        </ul>
                    }


                </div>
                {subCategories.length > 0 &&
                    <div className='sub-cat'>
                        <ul>
                            {subCategories.map((item, index) => (
                                <li
                                    key={index}
                                    onMouseEnter={() => handleSubCategoryHover(item)}
                                    className={hoveredSubCategory === item.name ? "dflex jcsb aic cat-selected" : "dflex jcsb aic"}
                                    onClick={() => router.push(`/all?catName=${hoveredCategory}&catId=${catId}&subCatName=${item.name}&subCatId=${item.id}`)}
                                >
                                    {item.name}
                                    <i class="fa fa-angle-right"></i>
                                </li>
                            ))}

                        </ul>
                    </div>
                }

                {subSubCategories.length > 0 &&
                    <div className='sub-cat'>
                        <ul>
                            {subSubCategories.map((item, index) => (
                                <li
                                    key={index}
                                    onMouseEnter={() => handleSubSubCategoryHover(item)}
                                    onClick={() => router.push(`/all?catName=${hoveredCategory}&catId=${catId}&subCatName=${hoveredSubCategory}&subCatId=${subCatId}&subSubCatName=${item.name}&subSubCatId=${item.id}`)}
                                >
                                    {item.name}
                                </li>
                            ))}

                        </ul>
                    </div>
                }

            </div>
            <div className="mid">
                <div className="banner-card">
                    <div className="banner">
                        <OwlCarousel
                            className="owl-theme"
                            loop
                            margin={10}
                            items={1}
                            autoplay={true}
                            nav
                            autoplayHoverPause={true}
                        >
                            {
                                [slide1, slide2, slide3, slide4, slide1, slide2, slide3, slide4].map((item) => {
                                    return (
                                        <>

                                            <div class="item hero_carousel">
                                                <Image src={item} className='img' />
                                            </div>

                                        </>

                                    )
                                })
                            }

                        </OwlCarousel>
                    </div>
                    <div className="card">
                        <ul>
                            <li>
                                <div className="img-con"><Image src={free} className='img' /></div>
                                <span>Free Delivery Offer</span>
                            </li>
                            <li>
                                <div className="img-con"><Image src={ret} className='img' /></div>
                                <span>Return Facility</span>
                            </li>
                            <li>
                                <div className="img-con"><Image src={quality} className='img' /></div>
                                <span>Hi-Quality Product</span>
                            </li>
                            <li>
                                <div className="img-con"><Image src={support} className='img' /></div>
                                <span>Live Support 24/7</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="items">
                    <div className="item">
                        <h4>Express Delivery</h4>
                        <h6>In Dhaka City</h6>
                    </div>
                    <div className="item">
                        <h4>Cash On Delivery</h4>
                        <h6>Anywhere Bangladesh</h6>
                    </div>
                    <div className="item">
                        <h4>Online Payment</h4>
                        <h6>Anywhere Bangladesh</h6>
                    </div>
                    <div className="item">
                        <h4>Home Delivery</h4>
                        <h6>All Over Bangladesh</h6>
                    </div>
                    <div className="item">
                        <h4>Coupon Saving</h4>
                        <h6>5-105 Save</h6>
                    </div>
                </div>
            </div>
            <div className="right">
                <ul>
                    <li><Image src={cart} className='icn' /></li>
                    <li>  <i class="fa fa-angle-up"></i></li>
                    <li><Image src={free} className='icn' /></li>
                </ul>
            </div>
        </div>
    )
}

export default Banner