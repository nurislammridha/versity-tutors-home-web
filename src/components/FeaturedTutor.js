import { GetProfiles } from '@/redux/_redux/CommonAction'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { convertToBanglaNumber } from '../../public/function/globalFunction';
const FeaturedTutor = () => {
    const { language, t } = useLanguage()
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
                                <h4>{t.fInstructor}</h4>
                                <h2>{t.everyInstructor}</h2>
                                <p>{t.meetTop}</p>
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
                                                <span className="tu-featuretag">{t.featured}</span>
                                            </figure>
                                            <div className="tu-authorinfo">
                                                <div className="tu-authordetail">
                                                    <figure>
                                                        <img src={item?.avatar?.url} alt="image-description" />
                                                    </figure>
                                                    <div className="tu-authorname">
                                                        <h5><a onClick={() => router.push(`/details/${item._id}`)}> {`${item.firstName} ${item.lastName}`}</a>  <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                        <span>{language === "en" ? `${item?.districtInfo?.districtName}, ${item?.divisionInfo?.divisionName}` : `${item?.districtInfo?.districtNameBn}, ${item?.divisionInfo?.divisionNameBn}`}</span>
                                                    </div>
                                                    <ul className="tu-authorlist">
                                                        <li>
                                                            <span>{t.startingFrom}:<em>&#2547;{language === "en" ? item.hourlyFee : convertToBanglaNumber(item.hourlyFee)}/{t.month}</em></span>
                                                        </li>
                                                        <li>
                                                            <span>{t.mobile}:<em>{t.hideMobile}</em></span>
                                                        </li>
                                                        <li>
                                                            <span>{t.whatsapp}:<em>{t.hideMobile}</em></span>
                                                        </li>
                                                        <li>
                                                            <span>{t.title}:<em>{item?.tagline}</em></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tu-instructors_footer">
                                                    <div className="tu-rating">
                                                        <i className="fas fa-star"></i>
                                                        <h6>{language === "en" ? item?.averageRating : convertToBanglaNumber(item?.averageRating)}</h6>
                                                        <span>({language === "en" ? item?.totalComments : convertToBanglaNumber(item?.totalComments)})</span>
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
                        <a className="tu-primbtn-lg"><span>{t.exploreAll}</span><i className="icon icon-chevron-right"></i></a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedTutor