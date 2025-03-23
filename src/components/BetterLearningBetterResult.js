import React from 'react'

const BetterLearningBetterResult = ({ data }) => {
    const { totalActiveTutor, totalStudent, totalSubject, totalArea } = data || {}
    return (
        <>
            {/* <!-- PLATFORM START --> */}
            <section class="tu-main-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="tu-maintitle text-center">
                                <img src="images/zigzag-line.svg" alt="img" />
                                <h4>Better Learning. Better Results</h4>
                                <h2>Online education platform for all</h2>
                                <p>accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
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
                                    <h5>Online consultation for all</h5>
                                    <p>Dignissimos ducimus qui blanditiis aeusentium voluptatum deleniti atque corruptiuos.</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-03.png" alt="img" />
                                    <h5>A great investment for future</h5>
                                    <p>Blanditiis praesntium voluptatum deleniti lorak atque corrupti quos dolores etquase.</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-04.png" alt="img" />
                                    <h5>Best results guranteed</h5>
                                    <p>Aeccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-05.png" alt="img" />
                                    <h5>Easy to connect with anyone</h5>
                                    <p>Blanditiis praesntium voluptatum deleniti lorak atque corrupti quos dolores etquase.</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-06.png" alt="img" />
                                    <h5>All verified tutors for students</h5>
                                    <p>Dignissimos ducimus qui blanditiis aeusentium voluptatum deleniti atque corruptiuos.</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-4">
                            <div class="tu-eduplatform">
                                <a >
                                    <img src="images/index/education/img-06.png" alt="img" />
                                    <h5>All students for tutors</h5>
                                    <p>Dignissimos ducimus qui blanditiis aeusentium voluptatum deleniti atque corruptiuos.</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* <div class="tu-mainbtn">
                        <a ><span>Join our Community</span><i class="icon icon-lock"></i></a>
                    </div> */}
                    <div class="tu-mainbtn">
                        <a class="tu-primbtn-lg"><span>Join our Community</span><i class="icon icon-lock"></i></a>
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
                                    <h4><span data-from="0" data-to={totalActiveTutor} data-speed="8000" data-refresh-interval="50">{totalActiveTutor}</span></h4>
                                    <p>Total active verified instructor available on the platform</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/stats/img-02.png" alt="img" />
                                <div class="tu-stats_info">
                                    <h4><span data-from="0" data-to={totalStudent} data-speed="8000" data-refresh-interval="50">{totalStudent}</span></h4>
                                    <p>Total active student available on the platform</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/stats/img-03.png" alt="img" />
                                <div class="tu-stats_info">
                                    <h4><span data-from="0" data-to={totalSubject} data-speed="8000" data-refresh-interval="50">{totalSubject}</span></h4>
                                    {/* <h4><span data-from="0" data-to="20" data-speed="8000" data-refresh-interval="50">20</span>+ Hours</h4> */}
                                    <p>Total subjects available on the platform</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/stats/img-04.png" alt="img" />
                                <div class="tu-stats_info">
                                    <h4><span data-from="0" data-to={totalArea} data-speed="8000" data-refresh-interval="50">{totalArea}</span></h4>
                                    {/* <h4><span data-from="0" data-to="7" data-speed="8000" data-refresh-interval="50">7</span>+ Million</h4> */}
                                    <p>Total area  available on the platform</p>
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