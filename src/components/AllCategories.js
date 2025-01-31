import React from 'react'
import Image from "next/image";
import tiktok from '../assets/icons/tik.png'
import LoadingSpinner from './LoadingSpinner';
const AllCategories = ({ list, loading }) => {
    return (
        <div className='container'>
            <div className="all-cat">
                <div className="head">
                    <div className="title-1">All Categories</div>
                    <div className="title-2">
                        View All
                    </div>
                </div>
                {loading ?
                    <div className='dflex aic'>
                        <LoadingSpinner />
                    </div> :
                    <div className="con">
                        {list !== null && list?.length > 0 && list.map((item, index) => (
                            <div className="item" key={index}>
                                <div className="img-con">
                                    <Image src={item?.subSubCategoryImg?.url} layout='fill' style={{ borderRadius: '50%' }} />

                                </div>
                                <span>{item?.subSubCategoryName}</span>
                            </div>
                        ))}

                    </div>
                }

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

export default AllCategories