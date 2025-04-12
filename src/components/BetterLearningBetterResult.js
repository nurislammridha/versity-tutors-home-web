import { useLanguage } from '@/context/LanguageContext'
import React from 'react'
import { convertToBanglaNumber } from '../../public/function/globalFunction'

const BetterLearningBetterResult = ({ data }) => {
    const { totalActiveTutor, totalStudent, totalSubject, totalArea } = data || {}
    const { language, t } = useLanguage()
    return (
        <>
            {/* <!-- PLATFORM START --> */}
            <section class="tu-main-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="tu-maintitle text-center">
                                <img src="images/zigzag-line.svg" alt="img" />
                                <h4>{t.betterLearningBetterResult}</h4>
                                <h2>{t.onlineEducationPlatformForAll}</h2>
                                <p>{t.empoweringStudents}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a
                                // ="blog-detail-right.html"
                                >
                                    <img src="images/index/education/img-02.png" alt="img" />
                                    <h5>{t.onlineConsultation}</h5>
                                    <p>{t.onlineConsultationSub}</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-03.png" alt="img" />
                                    <h5>{t.greatInvestment}</h5>
                                    <p>{t.greatInvestmentSub}</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-04.png" alt="img" />
                                    <h5>{t.bestResultGuranteed}</h5>
                                    <p>{t.bestResultGuranteedSub}</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-05.png" alt="img" />
                                    <h5>{t.easyToConnectWith}</h5>
                                    <p>{t.easyToConnectWithSub}</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-06.png" alt="img" />
                                    <h5>{t.allVarifiedTutor}</h5>
                                    <p>{t.allVarifiedTutorSub}</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-06.png" alt="img" />
                                    <h5>{t.allStudentsForTutor}</h5>
                                    <p>{t.allStudentsForTutorSub}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* <div class="tu-mainbtn">
                        <a ><span>Join our Community</span><i class="icon icon-lock"></i></a>
                    </div> */}
                    <div class="tu-mainbtn">
                        <a class="tu-primbtn-lg"><span>{t.joinOurCommunity}</span><i class="icon icon-lock"></i></a>
                    </div>
                </div>
            </section>
            {/* <!-- PLATFORM END --> */}
            {/* <!-- COUNTER START --> */}
            <section>
                <div class="tu-statsholder">
                    <div class="container">
                        <ul id="tu-counter" class="tu-stats">
                            <li>
                                <img src="images/stats/img-01.png" alt="img" />
                                <div class="tu-stats_info">
                                    <h4><span data-from="0" data-to={totalActiveTutor} data-speed="8000" data-refresh-interval="50">{language === "en" ? totalActiveTutor : convertToBanglaNumber(totalActiveTutor)}</span></h4>
                                    <p>{t.totalInstructor}</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/stats/img-02.png" alt="img" />
                                <div class="tu-stats_info">
                                    <h4><span data-from="0" data-to={totalStudent} data-speed="8000" data-refresh-interval="50">{language === "en" ? totalStudent : convertToBanglaNumber(totalStudent)}</span></h4>
                                    <p>{t.totalStudent}</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/stats/img-03.png" alt="img" />
                                <div class="tu-stats_info">
                                    <h4><span data-from="0" data-to={totalSubject} data-speed="8000" data-refresh-interval="50">{language === "en" ? totalSubject : convertToBanglaNumber(totalSubject)}</span></h4>
                                    {/* <h4><span data-from="0" data-to="20" data-speed="8000" data-refresh-interval="50">20</span>+ Hours</h4> */}
                                    <p>{t.totalSubjects}</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/stats/img-04.png" alt="img" />
                                <div class="tu-stats_info">
                                    <h4><span data-from="0" data-to={totalArea} data-speed="8000" data-refresh-interval="50">{language === "en" ? totalArea : convertToBanglaNumber(totalArea)}</span></h4>
                                    {/* <h4><span data-from="0" data-to="7" data-speed="8000" data-refresh-interval="50">7</span>+ Million</h4> */}
                                    <p>{t.totalArea}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* <!-- COUNTER END --> */}
        </>
    )
}

export default BetterLearningBetterResult