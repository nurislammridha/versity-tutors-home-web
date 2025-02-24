"use client"
import PrimaFooter from '@/components/PrimaFooter';
import PrimaHeader from '@/components/PrimaHeader';
import { GetProfileDetails } from '@/redux/_redux/CommonAction';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = ({ params }) => {
    const { id } = params; // Get dynamic ID from URL
    const router = useRouter()
    const dispatch = useDispatch()
    const isProfileDetailsLoading = useSelector((state) => state.homeInfo.isProfileDetailsLoading);
    const profileDetails = useSelector((state) => state.homeInfo.profileDetails);
    const { avatar, firstName, lastName, hourlyFee, tagline, divisionInfo, districtInfo, website, tutorBriefIntroduction, education, subject, isTeachingLocationOnline, isTeachingLocationStudentHome, isTeachingLocationTutorHome, email, phone, skype, whatsapp } = profileDetails || {}
    useEffect(() => {
        dispatch(GetProfileDetails(id))
    }, [id])
    console.log('profileDetails', profileDetails)
    return (
        <>
            <PrimaHeader />
            {!isProfileDetailsLoading ?
                profileDetails &&
                <main className="tu-main tu-bgmain">
                    <section className="tu-main-section">
                        <div className="container">
                            <div className="row gy-4">
                                <div className="col-xl-8 col-xxl-9">
                                    <div className="tu-tutorprofilewrapp">
                                        <span className="tu-cardtag"></span>
                                        <div className="tu-profileview">
                                            <figure>
                                                <img src={avatar?.url} alt="image-description" />
                                            </figure>
                                            <div className="tu-protutorinfo">
                                                <div className="tu-protutordetail">
                                                    <div className="tu-productorder-content">
                                                        <figure>
                                                            <img src={avatar?.url} alt="images" />
                                                        </figure>
                                                        <div className="tu-product-title">
                                                            <h3>{`${firstName} ${lastName}`} <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h3>
                                                            <h5>{tagline}</h5>
                                                        </div>
                                                        <div className="tu-listinginfo_price">
                                                            <span>Starting from:</span>
                                                            <h4>${hourlyFee}/month</h4>
                                                        </div>
                                                    </div>
                                                    <ul className="tu-tutorreview">
                                                        <li>
                                                            <span><i className="fa fa-star tu-coloryellow"> <em>4.5<span>/5.0</span></em> </i>  <em>(4,448)</em></span>
                                                        </li>
                                                        <li>
                                                            <span><i className="fa fa-check-circle tu-colorgreen"><em>95%</em></i><em>Job compeletion</em></span>
                                                        </li>
                                                        <li>
                                                            <span><i className="icon icon-map-pin"><span>{districtInfo.districtName}, {divisionInfo?.divisionName}</span></i></span>
                                                        </li>
                                                    </ul>
                                                    <div className="tu-detailitem">
                                                        <h6>Languages I know</h6>
                                                        <div className="tu-languagelist">
                                                            <ul className="tu-languages">
                                                                <li>Bangla</li>
                                                                <li>English</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tu-actionbts">
                                            <div className="tu-userurl">
                                                <i className="icon icon-globe"></i>
                                                <a href>{website}<i className="icon icon-copy"></i></a>
                                            </div>
                                            <ul className="tu-profilelinksbtn">
                                                {/* <li>
                                                    <a className="tu-linkheart" href><i className="icon icon-heart"></i><span>Save</span></a>
                                                </li> */}
                                                {/* <li><a href="login.html" className="tu-secbtn">Let’s talk now</a></li> */}
                                                <li>
                                                    <a href className="tu-primbtn">Book a tution</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tu-detailstabs">
                                        <ul className="nav nav-tabs tu-nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><i className="icon icon-home"></i><span>Introduction</span></button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i className="icon icon-message-circle"></i><span>Reviews</span></button>
                                            </li>
                                        </ul>
                                        <div className="tab-content tu-tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="tu-tabswrapper">
                                                    <div className="tu-tabstitle">
                                                        <h4>A brief introduction</h4>
                                                    </div>
                                                    <div className="tu-description">
                                                        {tutorBriefIntroduction}
                                                    </div>

                                                </div>
                                                <div className="tu-tabswrapper">
                                                    <div className="tu-tabstitle">
                                                        <h4>Education</h4>
                                                    </div>
                                                    <div className="accordion tu-accordionedu" id="accordionFlushExampleaa">
                                                        <div id="tu-edusortable" className="tu-edusortable">
                                                            {education?.length && education.map((item, index) => (
                                                                <div className="tu-accordion-item" key={index}>
                                                                    <div className="tu-expwrapper">
                                                                        <div className="tu-accordionedu">
                                                                            <div className="tu-expinfo">
                                                                                <div className="tu-accodion-holder">
                                                                                    <h5 className="collapsed" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOneba${index}`} aria-expanded="true" aria-controls="flush-collapseOneba">{item?.degree}</h5>
                                                                                    <ul className="tu-branchdetail">
                                                                                        <li><i className="icon icon-home"></i><span>{item?.institute}</span></li>
                                                                                        <li><i className="icon icon-map-pin"></i><span>{item?.location}</span></li>
                                                                                        <li><i className="icon icon-calendar"></i><span>{item?.startDate} - {item?.isOngoing ? "Present" : item?.endDate}</span></li>
                                                                                    </ul>
                                                                                </div>
                                                                                <i className="icon icon-plus" role="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOneba${index}`} aria-expanded="true" aria-controls="flush-collapseOneba"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="flush-collapseOneba" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExampleaa">
                                                                        <div className="tu-edubodymain">
                                                                            <div className="tu-accordioneduc">
                                                                                <p>{item?.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}


                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tu-tabswrapper">
                                                    <div className="tu-tabstitle">
                                                        <h4>I can teach</h4>
                                                    </div>
                                                    <ul className="tu-icanteach">
                                                        {subject?.length > 0 && subject.map((item, index) => (
                                                            <li key={index}>
                                                                <div className="tu-tech-title">
                                                                    <h6>{item?.categoryInfo.categoryName}</h6>
                                                                </div>
                                                                <ul className="tu-serviceslist">
                                                                    {item?.subCategories?.length > 0 && item.subCategories.map((item2, index2) => (
                                                                        <li key={index2}>
                                                                            <a href>{item2?.subCategoryInfo.subCategoryName}</a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ))}


                                                    </ul>
                                                </div>
                                                {/* <div className="tu-tabswrapper">
                                                    <div className="tu-tabstitle">
                                                        <h4>Media gallery</h4>
                                                    </div>
                                                    <div className="tu-slider-holder">
                                                        <div id="tu_splide" className="tu-sync splide">
                                                            <div className="splide__track">
                                                                <ul className="splide__list">
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" href="images/tutordetail/slider/img-01.jpg">
                                                                                <img src="images/tutordetail/slider/img-01.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-vbtype="video" data-gall="gall" href="https://www.youtube.com/watch?v=XxxIEGzhIG8" data-autoplay="true">
                                                                                <img src="images/tutordetail/slider/img-02.jpg" alt="Image Description" />
                                                                                <span className="tu-servicesvideo"></span>
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" href="images/tutordetail/slider/img-03.jpg">
                                                                                <img src="images/tutordetail/slider/img-03.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" href="images/tutordetail/slider/img-04.jpg">
                                                                                <img src="images/tutordetail/slider/img-04.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" href="images/tutordetail/slider/img-05.jpg">
                                                                                <img src="images/tutordetail/slider/img-05.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" href="images/tutordetail/slider/img-06.jpg">
                                                                                <img src="images/tutordetail/slider/img-06.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" href="images/tutordetail/slider/img-07.jpg">
                                                                                <img src="images/tutordetail/slider/img-07.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div id="tu_splidev2" className="tu-syncthumbnail splide">
                                                            <div className="splide__track">
                                                                <ul className="splide__list">
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-syncthumbnail__content">
                                                                            <img src="images/tutordetail/slider/thumbnails/img-01.png" alt="Image Description" />
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-syncthumbnail__content">
                                                                            <span className="tu-servicesvideo"></span>
                                                                            <img src="images/tutordetail/slider/thumbnails/img-02.png" alt="Image Description" />
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-syncthumbnail__content">
                                                                            <img src="images/tutordetail/slider/thumbnails/img-03.png" alt="Image Description" />
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-syncthumbnail__content">
                                                                            <img src="images/tutordetail/slider/thumbnails/img-04.png" alt="Image Description" />
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-syncthumbnail__content">
                                                                            <img src="images/tutordetail/slider/thumbnails/img-05.png" alt="Image Description" />
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-syncthumbnail__content">
                                                                            <img src="images/tutordetail/slider/thumbnails/img-06.png" alt="Image Description" />
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-syncthumbnail__content">
                                                                            <img src="images/tutordetail/slider/thumbnails/img-07.png" alt="Image Description" />
                                                                        </figure>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <div className="tu-tabswrapper">
                                                    <div className="tu-boxtitle">
                                                        <h4>Reviews (4,448)</h4>
                                                    </div>
                                                    <div className="tu-commentarea">
                                                        <div className="tu-commentlist">
                                                            <figure>
                                                                <img src="images/tutordetail/review/img-01.png" alt="images" />
                                                            </figure>
                                                            <div className="tu-coomentareaauth">
                                                                <div className="tu-commentright">
                                                                    <div className="tu-commentauthor">
                                                                        <h6><span>Ronnie Montgomery</span>02 sec ago</h6>
                                                                        <div className="tu-listing-location tu-ratingstars">
                                                                            <span>5.0</span>
                                                                            <span className="tu-stars tu-sm-stars">
                                                                                <span></span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tu-description">
                                                                    <p>Elit amet ut dui nam enim consectetur arcu amet varius. Viverra ac nisl quam nec justo,
                                                                        posuere suspendisse consequat. Sit aliquam purus mattis libero, pellentesque tellus sed amet pretium.
                                                                        Porttitor massa lectus dolor at enim. Ultricies varius diam elementum quis id eleifend. Eu vulputate urna, nulla dignissim ultrices.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tu-commentlist">
                                                            <figure>
                                                                <img src="images/tutordetail/review/img-02.png" alt="images" />
                                                            </figure>
                                                            <div className="tu-coomentareaauth">
                                                                <div className="tu-commentright">
                                                                    <div className="tu-commentauthor">
                                                                        <h6><span>Margaret Hansen</span> 05 days ago</h6>
                                                                        <div className="tu-listing-location tu-ratingstars">
                                                                            <span>4.0</span>
                                                                            <span className="tu-stars tu-sm-stars tu-fourstar">
                                                                                <span></span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tu-description">
                                                                    <p>Hac lacus nulla tristique lectus lectus enim. Est eget penatibus et in tempus. Cursus habitant at mauris arcu sed pellentesque viverra massa. Facilisis tristique bibendum dictum amet posuere. Facilisis quis nisi facilisis orci nulla. Hac nullam ut tortor eget.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tu-commentlist">
                                                            <figure>
                                                                <img src="images/tutordetail/review/img-03.png" alt="images" />
                                                            </figure>
                                                            <div className="tu-coomentareaauth">
                                                                <div className="tu-commentright">
                                                                    <div className="tu-commentauthor">
                                                                        <h6><span>Yvonne Snyder</span> 01 year ago</h6>
                                                                        <div className="tu-listing-location tu-ratingstars">
                                                                            <span>4.0</span>
                                                                            <span className="tu-stars tu-sm-stars tu-fourstar">
                                                                                <span></span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tu-description">
                                                                    <p>Ipsum quisque risus nisl sed tortor nulla. Scelerisque neque, velit dui eget. Mi, viverra sagittis est sapien blandit. Sit mi erat turpis integer accumsan. Mi, quis eget tincidunt dictum. Lorem maecenas a faucibus mattis laoreet quis.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tu-commentlist">
                                                            <figure>
                                                                <img src="images/tutordetail/review/img-04.jpg" alt="images" />
                                                            </figure>
                                                            <div className="tu-coomentareaauth">
                                                                <div className="tu-commentright">
                                                                    <div className="tu-commentauthor">
                                                                        <h6><span>Bradley Gallagher</span> 01 mon ago</h6>
                                                                        <div className="tu-listing-location tu-ratingstars">
                                                                            <span>5.0</span>
                                                                            <span className="tu-stars tu-sm-stars">
                                                                                <span></span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tu-description">
                                                                    <p>Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris neimit utnaeliquip ex ea commodo consequat volupte ateian essemae cillume.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tu-commentlist" style={{ display: "none" }}>
                                                            <figure>
                                                                <img src="images/tutordetail/review/img-02.png" alt="images" />
                                                            </figure>
                                                            <div className="tu-coomentareaauth">
                                                                <div className="tu-commentright">
                                                                    <div className="tu-commentauthor">
                                                                        <h6><span>Ronnie Montgomery</span>02 sec ago</h6>
                                                                        <div className="tu-listing-location tu-ratingstars">
                                                                            <span>5.0</span>
                                                                            <span className="tu-stars tu-sm-stars">
                                                                                <span></span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tu-description">
                                                                    <p>Elit amet ut dui nam enim consectetur arcu amet varius. Viverra ac nisl quam nec justo,
                                                                        posuere suspendisse consequat. Sit aliquam purus mattis libero, pellentesque tellus sed amet pretium.
                                                                        Porttitor massa lectus dolor at enim. Ultricies varius diam elementum quis id eleifend. Eu vulputate urna, nulla dignissim ultrices.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="show-more">
                                                            <a hrefclassName="tu-readmorebtn tu-show_more">Show all</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tu-tabswrapper">
                                                    <div className="tu-boxtitle">
                                                        <h4>Add your review</h4>
                                                    </div>
                                                    <form className="tu-themeform" id="tu-reviews-form">
                                                        <fieldset>
                                                            <div className="tu-themeform__wrap">
                                                                <div className="form-group-wrap">
                                                                    <div className="form-group">
                                                                        <div className="tu-reviews">
                                                                            <label className="tu-label">Give rating to your review</label>
                                                                            <div className="tu-my-ratingholder">
                                                                                <h6>Good experience</h6>
                                                                                <div id="tu-addreview" className="tu-addreview"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group tu-message-text">
                                                                        <label className="tu-label">Review details</label>
                                                                        <div className="tu-placeholderholder">
                                                                            <textarea className="form-control tu-textarea" id="tu-reviews-content" name="reviews_content" required="" placeholder="Enter description" maxlength="500"></textarea>
                                                                            <div className="tu-placeholder">
                                                                                <span>Enter description</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tu-input-counter">
                                                                            <span>Characters left:</span>
                                                                            <b className="tu_current_comment">500</b>
                                                                            /                                        <em className="tu_maximum_comment"> 500</em>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group tu-formspacebtw">
                                                                        <div className="tu-check">
                                                                            <input type="hidden" name="termsconditions" value="" />
                                                                            <input type="checkbox" id="termsconditions" name="termsconditions" />
                                                                            <label for="termsconditions"><span>I have read and agree to all <a href="javascript:void(0);">Terms &amp; conditions</a></span></label>
                                                                        </div>
                                                                        <a href="tutor-detail.html" className="tu-primbtn-lg tu-submit-reviews" data-profile_id=""><span>Submit</span><i className="icon icon-chevron-right"></i></a>
                                                                        <input type="hidden" name="profile_id" value="584" />
                                                                        <input type="hidden" name="user_id" value="691" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="tu-Joincommunity">
                                        <div className="tu-particles">
                                            <div id="tu-particlev2"></div>
                                        </div>
                                        <div className="tu-Joincommunity_content">
                                            <h4>Trending tutor directory of 2022</h4>
                                            <p>Its Free, Join today and start spreading knowledge with students out there</p>
                                        </div>
                                        <div className="tu-Joincommunity_btn">
                                            <a href="login.html" className="tu-yellowbtn">Join our community</a>
                                        </div>
                                    </div>
                                    <div className="tu-explore-title">
                                        <h3>Explore related tutors</h3>
                                    </div>
                                    <div className="tu-explore-content row gy-4">
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
                                            <div className="tu-featureitem">
                                                <figure>
                                                    <a href="tutor-detail.html"><img src="images/index/qualified/img-04.jpg" alt="image-description" /></a>
                                                    <span className="tu-featuretag">FEATURED</span>
                                                </figure>
                                                <div className="tu-authorinfo">
                                                    <div className="tu-authordetail">
                                                        <figure>
                                                            <img src="images/index/professionol/img-04.jpg" alt="image-description" />
                                                        </figure>
                                                        <div className="tu-authorname">
                                                            <h5><a href="tutor-detail.html"> William Williams</a> <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                            <span>Nashville, IL</span>
                                                        </div>
                                                        <ul className="tu-authorlist">
                                                            <li>
                                                                <span>Starting from:<em>$1,198.12/hr</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Mobile:<em>xxx-xxxxx-54</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Whatsapp:<em>xxx-xxxxx-88</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Qualification:<em>B.Tech/B.E.</em></span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="tu-instructors_footer">
                                                        <div className="tu-rating">
                                                            <i className="fas fa-star"></i>
                                                            <h6>5.0</h6>
                                                            <span>(57,282)</span>
                                                        </div>
                                                        <div className="tu-instructors_footer-right">
                                                            <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
                                            <div className="tu-featureitem">
                                                <figure>
                                                    <a href="tutor-detail.html"><img src="images/index/qualified/img-02.jpg" alt="image-description" /></a>
                                                    <span className="tu-featuretag">FEATURED</span>
                                                </figure>
                                                <div className="tu-authorinfo">
                                                    <div className="tu-authordetail">
                                                        <figure>
                                                            <img src="images/index/professionol/img-02.jpg" alt="image-description" />
                                                        </figure>
                                                        <div className="tu-authorname">
                                                            <h5><a href="tutor-detail.html">Gwendolyn Parker</a> <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                            <span>Las Vegas, TN</span>
                                                        </div>
                                                        <ul className="tu-authorlist">
                                                            <li>
                                                                <span>Starting from:<em>$1,385.10/hr</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Mobile:<em>xxx-xxxxx-11</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Whatsapp:<em>xxx-xxxxx-80</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Qualification:<em>B.Tech/B.E.</em></span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="tu-instructors_footer">
                                                        <div className="tu-rating">
                                                            <i className="fas fa-star"></i>
                                                            <h6>5.0</h6>
                                                            <span>(38,494)</span>
                                                        </div>
                                                        <div className="tu-instructors_footer-right">
                                                            <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
                                            <div className="tu-featureitem">
                                                <figure>
                                                    <a href="tutor-detail.html"><img src="images/index/qualified/img-01.jpg" alt="image-description" /></a>
                                                    <span className="tu-featuretag">FEATURED</span>
                                                </figure>
                                                <div className="tu-authorinfo">
                                                    <div className="tu-authordetail">
                                                        <figure>
                                                            <img src="images/index/professionol/img-01.jpg" alt="image-description" />
                                                        </figure>
                                                        <div className="tu-authorname">
                                                            <h5><a href="tutor-detail.html"> Dwayne Garrett</a> <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
                                                            <span>Arlington, TN</span>
                                                        </div>
                                                        <ul className="tu-authorlist">
                                                            <li>
                                                                <span>Starting from:<em>$893.30/hr</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Mobile:<em>xxx-xxxxx-33</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Whatsapp:<em>xxx-xxxxx-11</em></span>
                                                            </li>
                                                            <li>
                                                                <span>Qualification:<em>B.Tech/B.E.</em></span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="tu-instructors_footer">
                                                        <div className="tu-rating">
                                                            <i className="fas fa-star"></i>
                                                            <h6>5.0</h6>
                                                            <span>(4,448)</span>
                                                        </div>
                                                        <div className="tu-instructors_footer-right">
                                                            <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="col-xl-4 col-xxl-3">
                                    <aside className="tu-asidedetail">
                                        <div className="tu-asideinfo text-center">
                                            <h6>Hello! You can have my teaching services direct at</h6>
                                        </div>
                                        <ul className="tu-featureinclude">
                                            <li>
                                                <span className="icon icon-home tu-colorgreen"> <i>My home</i> </span>
                                                {isTeachingLocationTutorHome && <em className="fa fa-check-circle tu-colorgreen"></em>}
                                            </li>
                                            <li>
                                                <span className="icon icon-map-pin tu-colorblue"> <i>Student's home</i> </span>
                                                {isTeachingLocationStudentHome && <em className="fa fa-check-circle tu-colorgreen"></em>}
                                            </li>
                                            <li>
                                                <span className="icon icon-video tu-colororange"> <i>Online</i> </span>
                                                {isTeachingLocationOnline && <em className="fa fa-check-circle tu-colorgreen"></em>}
                                            </li>
                                        </ul>
                                        <div className="tu-contactbox">
                                            <h6>Contact details</h6>
                                            <ul className="tu-listinfo">
                                                <li>
                                                    <span className="tu-bg-maroon"><i className="icon icon-phone-call "></i></span>
                                                    <h6>{phone}
                                                        {/* <em>*** - ***</em> */}
                                                    </h6>
                                                </li>
                                                <li>
                                                    <span className="tu-bg-voilet"><i className="icon icon-mail"></i></span>
                                                    <h6>{email}</h6>
                                                </li>
                                                <li>
                                                    <span className="tu-bg-blue"><i className="fab fa-skype"></i></span>
                                                    <h6>{skype}</h6>
                                                </li>
                                                <li>
                                                    <span className="tu-bg-green"><i className="fab fa-whatsapp"></i></span>
                                                    <h6>{whatsapp} </h6>
                                                </li>
                                                <li>
                                                    <span className="tu-bg-orange"><i className="icon icon-printer"></i></span>
                                                    <a href>{website}</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tu-unlockfeature text-center">
                                            <h6>
                                                Click the button below to buy a package & unlock the contact details
                                            </h6>
                                            <a href="package.html" className="tu-primbtn tu-btngreen"><span>Unlock feature</span><i className="icon icon-lock"></i></a>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                : <div>Loading</div>}

            <PrimaFooter />
        </>
    )
}

export default page