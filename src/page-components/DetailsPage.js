"use client"
import PrimaFooter from '@/components/PrimaFooter';
import PrimaHeader from '@/components/PrimaHeader';
import Reviews from '@/components/Reviews';
import { FalseUpdatedProfile, GetProfileDetails, GetUnlock, StatusSubmit, SubmitBook } from '@/redux/_redux/CommonAction';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from 'react-toastify';
import { useLanguage } from '@/context/LanguageContext';
import { convertToBanglaNumber } from '../../public/function/globalFunction';

const DetailsPage = ({ id }) => {
    const { language, t } = useLanguage()
    const router = useRouter()
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(false)
    const [clientData, setClientData] = useState(null)
    const [isUnlocked, setUnlocked] = useState(false)
    const [isWished, setWished] = useState(false)
    const isProfileDetailsLoading = useSelector((state) => state.homeInfo.isProfileDetailsLoading);
    const profileDetails = useSelector((state) => state.homeInfo.profileDetails);
    const isBookLoading = useSelector((state) => state.homeInfo.isBookLoading);
    const isUnlockLoading = useSelector((state) => state.homeInfo.isUnlockLoading);
    const isUpdatedProfile = useSelector((state) => state.homeInfo.isUpdatedProfile);
    const isStatusLoading = useSelector((state) => state.homeInfo.isStatusLoading);
    const { isTutorAccount, isApproved, avatar, averageRating, totalComments, firstName, lastName, hourlyFee, tagline, areaInfo, address, subDistrictInfo, divisionInfo, districtInfo, website, tutorBriefIntroduction, education, subject, isTeachingLocationOnline, isTeachingLocationStudentHome, isTeachingLocationTutorHome, email, phone, skype, whatsapp, unlockInfo, isBooked } = profileDetails || {}
    const handleBook = () => {
        dispatch(SubmitBook({ clientId: id, bookerId: clientData._id, status: "initiate" }, clientData))
    }
    const handleUnlock = () => {
        let arr = unlockInfo || []
        arr.push(clientData?._id)
        confirmAlert({
            title: !isLogin ? t.youAreAdviseToLogin : isBooked ? t.unAbleUnlock : t.confirmUnlock,
            message: !isLogin ? t.areYouSure : isBooked ? t.thisProfileIsBusy : t.oneConnection,
            buttons: [
                {
                    label: !isLogin ? t.login : isBooked ? t.ok : t.yes,
                    onClick: () => !isLogin ? router.push('/login') : !isBooked && dispatch(GetUnlock(arr, id, clientData?._id)),
                },
                {
                    label: !isLogin ? t.notLogin : isBooked ? t.iWillWait : t.no,
                },
            ],
        });
    };
    const handlePreBook = () => {
        let arr = unlockInfo || []
        arr.push(clientData?._id)
        confirmAlert({
            title: !isLogin ? t.youAreAdviseToLogin : isBooked ? t.unAbleUnlock : isUnlocked ? t.confirmToBook : t.confirmUnlock,
            message: !isLogin ? t.areYouSure : isBooked ? t.thisProfileIsBusy : isUnlocked ? t.toBook : t.oneConnection,
            buttons: [
                {
                    label: !isLogin ? t.login : t.yes,
                    onClick: () => !isLogin ? router.push('/login') : isUnlocked ? handleBook() : dispatch(GetUnlock(arr, id, clientData?._id)),
                },
                {
                    label: !isLogin ? t.notLogin : t.no,
                },
            ],
        });
    };
    const handleWish = () => {
        let arr = clientData?.wishList || []
        isWished ? arr = arr.filter(item => item._id.toString() !== id) : arr.push(id)
        dispatch(StatusSubmit({ wishList: arr }, clientData._id,))
    }
    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === "true" ? true : false)
        setClientData(JSON.parse(localStorage.getItem("clientData")))
        dispatch(GetProfileDetails(id))
    }, [id])
    useEffect(() => {
        if (isUpdatedProfile) {
            setClientData(JSON.parse(localStorage.getItem("clientData")))
            dispatch(FalseUpdatedProfile())
        }
        clientData !== null && setWished(clientData?.wishList.some(wish => wish._id.toString() === id))
    }, [isUpdatedProfile, clientData])

    useEffect(() => {
        // console.log('unlockInfo', unlockInfo)
        // console.log('clientData?._id', clientData)
        profileDetails !== null && setUnlocked(unlockInfo.includes(clientData?._id))
    }, [profileDetails, unlockInfo])

    console.log('clientData', clientData)
    return (
        <>
            <PrimaHeader isLogin={isLogin} clientData={clientData} />
            {!isProfileDetailsLoading ?
                profileDetails &&
                <main className="tu-main tu-bgmain">
                    <section className="tu-main-section">
                        <div className="container">
                            <div className="row gy-4">
                                <div className="col-xl-8 col-xxl-9">
                                    <div className="tu-tutorprofilewrapp">
                                        {isApproved && <span className="tu-cardtag"></span>}
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
                                                            <span>{t.startingFrom}:</span>
                                                            <h4>${language === "en" ? hourlyFee : convertToBanglaNumber(hourlyFee)}/{t.month}</h4>
                                                        </div>
                                                    </div>
                                                    <ul className="tu-tutorreview">
                                                        <li>
                                                            <span><i className="fa fa-star tu-coloryellow"> <em>{language === "en" ? averageRating : convertToBanglaNumber(averageRating)}<span>/5.0</span></em> </i>  <em>({language === "en" ? totalComments : convertToBanglaNumber(totalComments)})</em></span>
                                                        </li>
                                                        <li>
                                                            <span><i className="fa fa-check-circle tu-colorgreen"><em>{language === "en" ? unlockInfo.length : convertToBanglaNumber(unlockInfo.length)}</em></i><em>{t.profileUnlockedHim}</em></span>
                                                        </li>
                                                        <li>
                                                            <span><i className="icon icon-map-pin"><span>{language === "en" ? `${districtInfo?.districtName}, ${divisionInfo?.divisionName}` : `${districtInfo?.districtNameBn}, ${divisionInfo?.divisionNameBn}`}</span></i></span>
                                                        </li>
                                                    </ul>
                                                    <div className="tu-detailitem">
                                                        <h6>{t.languageIKnow}</h6>
                                                        <div className="tu-languagelist">
                                                            <ul className="tu-languages">
                                                                <li>{t.bangla}</li>
                                                                <li>{t.english}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tu-actionbts">
                                            <div className="tu-userurl">
                                                <i className="icon icon-globe"></i>
                                                <a
                                                // 
                                                >{website}<i className="icon icon-copy"></i></a>
                                            </div>
                                            <ul className="tu-profilelinksbtn">
                                                {isLogin &&
                                                    <li>
                                                        <a
                                                            className="tu-linkheart"

                                                            onClick={() => !isStatusLoading && handleWish()}
                                                        >
                                                            <i className="icon icon-heart"></i><span>{isStatusLoading ? isWished ? t.removing : t.saving : isWished ? t.saved : t.save}</span></a>
                                                    </li>
                                                }
                                                {/* <li><a ="login.html" className="tu-secbtn">Let’s talk now</a></li> */}
                                                <li>
                                                    <a

                                                        className="tu-primbtn"
                                                        onClick={() => !isBookLoading && handlePreBook()}
                                                    >
                                                        {isBookLoading ? t.booking : t.bookATution}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tu-detailstabs">
                                        <ul className="nav nav-tabs tu-nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><i className="icon icon-home"></i><span>{t.introduction}</span></button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i className="icon icon-message-circle"></i><span>{t.reviews}</span></button>
                                            </li>
                                        </ul>
                                        <div className="tab-content tu-tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="tu-tabswrapper">
                                                    <div className="tu-tabstitle">
                                                        <h4>{t.aBriefIntroduction}</h4>
                                                    </div>
                                                    <div className="tu-description">
                                                        {tutorBriefIntroduction}
                                                    </div>

                                                </div>
                                                <div className="tu-tabswrapper">
                                                    <div className="tu-tabstitle">
                                                        <h4>{t.education}</h4>
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
                                                        {isTutorAccount ? <h4>{t.iCanTeach} </h4> : <h4>{t.iNeedLearn}</h4>}
                                                    </div>
                                                    <ul className="tu-icanteach">
                                                        {subject?.length > 0 && subject.map((item, index) => (
                                                            <li key={index}>
                                                                <div className="tu-tech-title">
                                                                    <h6>{language === "en" ? item?.categoryInfo.categoryName : item?.categoryInfo.categoryNameBn}</h6>
                                                                </div>
                                                                <ul className="tu-serviceslist">
                                                                    {item?.subCategories?.length > 0 && item.subCategories.map((item2, index2) => (
                                                                        <li key={index2}>
                                                                            <a
                                                                            //  
                                                                            >{language === "en" ? item2?.subCategoryInfo?.subCategoryName : item2?.subCategoryInfo?.subCategoryNameBn}</a>
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
                                                                            <a className="tu-themegallery" data-gall="gall" ="images/tutordetail/slider/img-01.jpg">
                                                                                <img src="images/tutordetail/slider/img-01.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-vbtype="video" data-gall="gall" ="https://www.youtube.com/watch?v=XxxIEGzhIG8" data-autoplay="true">
                                                                                <img src="images/tutordetail/slider/img-02.jpg" alt="Image Description" />
                                                                                <span className="tu-servicesvideo"></span>
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" ="images/tutordetail/slider/img-03.jpg">
                                                                                <img src="images/tutordetail/slider/img-03.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" ="images/tutordetail/slider/img-04.jpg">
                                                                                <img src="images/tutordetail/slider/img-04.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" ="images/tutordetail/slider/img-05.jpg">
                                                                                <img src="images/tutordetail/slider/img-05.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" ="images/tutordetail/slider/img-06.jpg">
                                                                                <img src="images/tutordetail/slider/img-06.jpg" alt="Image Description" />
                                                                            </a>
                                                                        </figure>
                                                                    </li>
                                                                    <li className="splide__slide">
                                                                        <figure className="tu-sync__content">
                                                                            <a className="tu-themegallery" data-gall="gall" ="images/tutordetail/slider/img-07.jpg">
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
                                            <Reviews clientId={id} commenterId={clientData?._id} isLogin={isLogin} />
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
                                            <a ="login.html" className="tu-yellowbtn">Join our community</a>
                                        </div>
                                    </div>
                                    <div className="tu-explore-title">
                                        <h3>Explore related tutors</h3>
                                    </div>
                                    <div className="tu-explore-content row gy-4">
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
                                            <div className="tu-featureitem">
                                                <figure>
                                                    <a ="tutor-detail.html"><img src="images/index/qualified/img-04.jpg" alt="image-description" /></a>
                                                    <span className="tu-featuretag">FEATURED</span>
                                                </figure>
                                                <div className="tu-authorinfo">
                                                    <div className="tu-authordetail">
                                                        <figure>
                                                            <img src="images/index/professionol/img-04.jpg" alt="image-description" />
                                                        </figure>
                                                        <div className="tu-authorname">
                                                            <h5><a ="tutor-detail.html"> William Williams</a> <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
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
                                                            <a ="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
                                            <div className="tu-featureitem">
                                                <figure>
                                                    <a ="tutor-detail.html"><img src="images/index/qualified/img-02.jpg" alt="image-description" /></a>
                                                    <span className="tu-featuretag">FEATURED</span>
                                                </figure>
                                                <div className="tu-authorinfo">
                                                    <div className="tu-authordetail">
                                                        <figure>
                                                            <img src="images/index/professionol/img-02.jpg" alt="image-description" />
                                                        </figure>
                                                        <div className="tu-authorname">
                                                            <h5><a ="tutor-detail.html">Gwendolyn Parker</a> <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
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
                                                            <a "><i className="icon icon-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-6 col-xxl-4">
                                            <div className="tu-featureitem">
                                                <figure>
                                                    <a><img src="images/index/qualified/img-01.jpg" alt="image-description" /></a>
                                                    <span className="tu-featuretag">FEATURED</span>
                                                </figure>
                                                <div className="tu-authorinfo">
                                                    <div className="tu-authordetail">
                                                        <figure>
                                                            <img src="images/index/professionol/img-01.jpg" alt="image-description" />
                                                        </figure>
                                                        <div className="tu-authorname">
                                                            <h5><a ="tutor-detail.html"> Dwayne Garrett</a> <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
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
                                                            <a ="javascript:void(0);"><i className="icon icon-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="col-xl-4 col-xxl-3">
                                    <aside className="tu-asidedetail" style={{ height: "100%" }}>
                                        <div className="tu-asideinfo text-center">
                                            <h6>{isBooked ? t.bookedNow : isTutorAccount ? t.myTeachingService : t.youMayContact}</h6>
                                        </div>
                                        <ul className="tu-featureinclude">
                                            <li>
                                                <span className="icon icon-home tu-colorgreen"> <i>{t.myHome}</i> </span>
                                                {isTeachingLocationTutorHome && <em className="fa fa-check-circle tu-colorgreen"></em>}
                                            </li>
                                            <li>
                                                <span className="icon icon-map-pin tu-colorblue"> <i>{t.studentHome}</i> </span>
                                                {isTeachingLocationStudentHome && <em className="fa fa-check-circle tu-colorgreen"></em>}
                                            </li>
                                            <li>
                                                <span className="icon icon-video tu-colororange"> <i>{t.online}</i> </span>
                                                {isTeachingLocationOnline && <em className="fa fa-check-circle tu-colorgreen"></em>}
                                            </li>
                                        </ul>
                                        <div style={{ position: "sticky", top: 0, zIndex: 999 }}>
                                            <div className="tu-contactbox">
                                                <h6>{t.contactDetails}</h6>
                                                <ul className="tu-listinfo">
                                                    <li>
                                                        <span className="tu-bg-maroon"><i className="icon icon-phone-call "></i></span>
                                                        <h6>{isUnlocked ? phone : t.hideMobile}
                                                            {/* <em>*** - ***</em> */}
                                                        </h6>
                                                    </li>
                                                    <li>
                                                        <span className="tu-bg-voilet"><i className="icon icon-mail"></i></span>
                                                        <h6>{isUnlocked ? email : "xyz@gmail.com"}</h6>
                                                    </li>
                                                    <li>
                                                        <span className="tu-bg-blue"><i className="fab fa-skype"></i></span>
                                                        <h6>{isUnlocked ? skype : "xyz"}</h6>
                                                    </li>
                                                    <li>
                                                        <span className="tu-bg-green"><i className="fab fa-whatsapp"></i></span>
                                                        <h6>{isUnlocked ? whatsapp : t.hideMobile} </h6>
                                                    </li>
                                                    <li>
                                                        <span className="tu-bg-orange"><i className="icon icon-printer"></i></span>
                                                        <a
                                                        // 
                                                        >{isUnlocked ? website : "www.xyz.com"}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {isUnlocked ?
                                                <div className="tu-unlockfeature text-center">
                                                    <h3 className='text-center'>{t.fullAddress}</h3>
                                                    <div>{language === "en" ? `${areaInfo?.areaName}>${subDistrictInfo?.subDistrictName}.${districtInfo?.districtName}>${divisionInfo?.divisionName}` : `${areaInfo?.areaNameBn}>${subDistrictInfo?.subDistrictNameBn}.${districtInfo?.districtNameBn}>${divisionInfo?.divisionNameBn}`}</div>
                                                    <div>{address}</div>
                                                </div> :
                                                <div className="tu-unlockfeature text-center">
                                                    <h6>
                                                        {t.clickTheButton}
                                                    </h6>
                                                    <a

                                                        className="tu-primbtn tu-btngreen"
                                                        onClick={() => !isUnlockLoading && handleUnlock()}
                                                    ><span>{isUnlockLoading ? t.unlocking : t.unlockFeature}</span><i className="icon icon-lock"></i></a>
                                                </div>
                                            }
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                :

                <div class="tu-preloader">
                    <div class="tu-preloader_holder">
                        <img src="../images/favicon.png" alt="laoder img" />
                        <div class="tu-loader"></div>
                    </div>
                </div>

            }

            <PrimaFooter />
            <ToastContainer />
        </>
    )
}

export default DetailsPage