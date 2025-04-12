"use client"; // Required for Next.js 14 App Router
import { FalseSubmitReview, GetReviewByClientId, SubmitReview } from '@/redux/_redux/CommonAction';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { convertToBanglaNumber, timeAgo } from '../../public/function/globalFunction';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
const Reviews = ({ clientId, commenterId, isLogin }) => {
    const { language, t } = useLanguage()
    const dispatch = useDispatch()
    const router = useRouter()
    const [rating, setRating] = useState(4); // Default rating
    const [review, setReview] = useState(""); // Default review
    const isReviewLoading = useSelector((state) => state.homeInfo.isReviewLoading);
    const isGetReviewLoading = useSelector((state) => state.homeInfo.isGetReviewLoading);
    const reviewList = useSelector((state) => state.homeInfo.reviewList);
    const isReviewSubmitted = useSelector((state) => state.homeInfo.isReviewSubmitted);
    const { result: list, pagination } = reviewList || {}
    const { page, total } = pagination || {}
    const handleSubmit = () => {
        dispatch(SubmitReview({ clientId, commenterId, comment: review, starRating: rating }))
    }
    const handleLogin = () => {
        confirmAlert({
            title: t.youAreAdviseToLogin,
            message: t.areYouSure,
            buttons: [
                {
                    label: t.login,
                    onClick: () => router.push('/login'),
                },
                {
                    label: t.notLogin,
                },
            ],
        });
    };
    const handleMore = () => {
        dispatch(GetReviewByClientId(clientId, page + 1))
    }
    const ratingChanged = (newRating) => {
        console.log(`New Rating: ${newRating}`);
        setRating(newRating);
    };
    useEffect(() => {
        // console.log('clientId', clientId)
        dispatch(GetReviewByClientId(clientId))
    }, [clientId])
    useEffect(() => {
        if (isReviewSubmitted) {
            setRating(4)
            setReview("")
            dispatch(GetReviewByClientId(clientId))
            dispatch(FalseSubmitReview())
        }
    }, [isReviewSubmitted])

    return (
        <>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="tu-tabswrapper">
                    <div className="tu-boxtitle">
                        <h4>{t.reviews} ({language === "en" ? total : convertToBanglaNumber(total)})</h4>
                    </div>
                    <div className="tu-commentarea">
                        {list && list.length > 0 ?
                            list.map((item, index) => (
                                <div className="tu-commentlist" key={index}>
                                    <figure>
                                        <img src={item?.commenterId?.avatar?.url} alt="images" />
                                    </figure>
                                    <div className="tu-coomentareaauth">
                                        <div className="tu-commentright">
                                            <div className="tu-commentauthor">
                                                <h6><span>{`${item?.commenterId?.firstName} ${item?.commenterId?.lastName}`}</span>{timeAgo(item?.createdAt)}</h6>
                                                <div className="tu-listing-location tu-ratingstars">
                                                    <span>{language === "en" ? item?.starRating : convertToBanglaNumber(item?.starRating)}</span>
                                                    <span className={`tu-stars tu-sm-stars star${item?.starRating}`}>
                                                        <span></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tu-description">
                                            <p>{item?.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <div>{t.noCommentFound}</div>
                        }


                        <div className="show-more">
                            <a
                                onClick={() => handleMore()}
                            >{t.showMore}</a>
                        </div>
                    </div>
                </div>
                <div className="tu-tabswrapper">
                    <div className="tu-boxtitle">
                        <h4>{t.addYourReview}</h4>
                    </div>
                    <form className="tu-themeform" id="tu-reviews-form">
                        <fieldset>
                            <div className="tu-themeform__wrap">
                                <div className="form-group-wrap">
                                    <div className="form-group">
                                        <div className="tu-reviews">
                                            <label className="tu-label">{t.giveRating}</label>
                                            <div className="tu-my-ratingholder">
                                                <h6>{t.goodExperience}</h6>
                                                <div className="tu-addreview">
                                                    <ReactStars
                                                        count={5} // Number of stars
                                                        value={rating} // Initial rating
                                                        onChange={ratingChanged} // Function when rating changes
                                                        size={24} // Size of stars
                                                        activeColor="#EAB308" // Star color
                                                        isHalf={false} // Allow half stars
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-group tu-message-text">
                                        <label className="tu-label">{t.reviewDetails}</label>
                                        <div className="tu-placeholderholder">
                                            <textarea
                                                className="form-control tu-textarea"
                                                id="tu-reviews-content"
                                                name="reviews_content"
                                                required=""
                                                placeholder="Enter description"
                                                maxlength="500"
                                                value={review}
                                                onChange={(e) => isLogin ? setReview(e.target.value) : handleLogin()}
                                            >

                                            </textarea>
                                            <div className="tu-placeholder">
                                                <span>{t.enterDescription}</span>
                                            </div>
                                        </div>
                                        <div className="tu-input-counter">
                                            <span>{t.charLeft}:</span>
                                            <b className="tu_current_comment">{language === "en" ? 500 - review.length : convertToBanglaNumber(500 - review.length)}</b>
                                            /<em className="tu_maximum_comment"> {t.fiveTh}</em>
                                        </div>
                                    </div>

                                    <div className="form-group tu-formspacebtw">
                                        <div className="tu-check invisible">
                                            <input type="hidden" name="termsconditions" value="" />
                                            <input type="checkbox" id="termsconditions" name="termsconditions" />
                                            <label for="termsconditions"><span>I have read and agree to all <a
                                            >Terms &amp; conditions</a></span></label>
                                        </div>
                                        <a

                                            className="tu-primbtn-lg tu-submit-reviews"
                                            data-profile_id=""
                                            onClick={() => !isReviewLoading && handleSubmit()}
                                        >
                                            <span>{isReviewLoading ? "Submitting.." : "Submit"}</span><i className="icon icon-chevron-right"></i></a>
                                        <input type="hidden" name="profile_id" value="584" />
                                        <input type="hidden" name="user_id" value="691" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Reviews