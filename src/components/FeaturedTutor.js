import { GetProfiles } from '@/redux/_redux/CommonAction'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useRouter } from 'next/navigation';
const FeaturedTutor = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const filteredProfile = useSelector((state) => state.homeInfo.filteredProfiles);
    const { pagination, result: filteredProfiles } = filteredProfile || { pagination: {}, result: null }
    useEffect(() => {
        if (filteredProfile !== null && filteredProfiles.length > 0) {
            const slider = new Splide('#tu-featurelist', {
                type: 'loop',
                perPage: 4,
                perMove: 1,
                gap: 24,
                pagination: true,
                arrows: false,
                breakpoints: {
                    1400: { perPage: 3 },
                    991: { perPage: 2 },
                    767: { perPage: 1 },
                },
            });
            slider.mount();
            // Cleanup function to destroy the slider on unmount
            return () => {
                slider.destroy();
            };
        }
    }, [filteredProfile]);
    useEffect(() => {
        dispatch(GetProfiles({ filters: { isFeatured: true }, limit: 20 }))
    }, [])

    return (
        <>
            <section className="tu-main-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="tu-maintitle text-center">
                                <img src="/images/zigzag-line.svg" alt="Image" />
                                <h4>Our featured instructors</h4>
                                <h2>Every instructor is professional and highly qualified</h2>
                                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
                            </div>
                        </div>
                    </div>
                    <div id="tu-featurelist" className="splide tu-featurelist  tu-splidedots ">
                        <div className="splide__track">
                            <ul className="splide__list">
                                {filteredProfile !== null && filteredProfiles.length > 0 && filteredProfiles.map((item, index) => (
                                    <li className="splide__slide" key={item}>
                                        <div className="tu-featureitem">
                                            <figure>
                                                <a ><img src={item?.subject[0].categoryInfo?.img?.url || `/images/index/qualified/img-01.jpg`} alt="image-description" style={{ width: 612, height: 300 }} /></a>
                                                <span className="tu-featuretag">FEATURED</span>
                                            </figure>
                                            <div className="tu-authorinfo">
                                                <div className="tu-authordetail">
                                                    <figure>
                                                        <img src={item.avatar.url} alt="image-description" />
                                                    </figure>
                                                    <div className="tu-authorname">
                                                        <h5><a onClick={() => router.push(`/details/${item._id}`)}> {`${item.firstName} ${item.lastName}`}</a>  <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                        <span>{item?.districtInfo?.districtName} ,{item?.divisionInfo?.divisionName}</span>
                                                    </div>
                                                    <ul className="tu-authorlist">
                                                        <li>
                                                            <span>Starting from:<em>&#2547;{item.hourlyFee}/Month</em></span>
                                                        </li>
                                                        <li>
                                                            <span>Mobile:<em>01XXXXXXXXX</em></span>
                                                        </li>
                                                        <li>
                                                            <span>Whatsapp:<em>01XXXXXXXXX</em></span>
                                                        </li>
                                                        <li>
                                                            <span>Title:<em>{item?.tagline}</em></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tu-instructors_footer">
                                                    <div className="tu-rating">
                                                        <i className="fas fa-star"></i>
                                                        <h6>{item?.averageRating}</h6>
                                                        <span>({item?.totalComments})</span>
                                                    </div>
                                                    {/* <div className="tu-instructors_footer-right">
                                                        <a ="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                    <div className="tu-mainbtn">
                        <a className="tu-primbtn-lg"><span>Explore all instructors</span><i className="icon icon-chevron-right"></i></a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedTutor