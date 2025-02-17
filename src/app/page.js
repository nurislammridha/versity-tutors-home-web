"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import Typed from 'typed.js';
import $ from 'jquery';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import PrimaHeader from "@/components/PrimaHeader";
import PrimaFooter from "@/components/PrimaFooter";
export default function Home({ navigation }) {
  const el = useRef(null); // Reference for the target element
  const typedInstance = useRef(null);
  // const homeData = useSelector((state) => state.homeInfo.homeData);
  useEffect(() => {
    // Check if the DOM element is mounted
    if (el.current) {
      typedInstance.current = new Typed(el.current, {
        strings: ["A bright future", "Equitable societies", "Self confidence"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true,
        showCursor: false,
      });
    }

    // Cleanup to prevent memory leaks
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);
  useEffect(() => {
    const responsive = () => {
      const width = $('body').width();
      if (width > 1200) {
        $(".menu-item-has-children, .sub-menu .menu-item-has-children").hover(
          function () {
            $(this).children("ul").stop().slideDown(450);
          },
          function () {
            $(this).children("ul").stop().slideUp(400);
          }
        );
      }
    };

    const collapseMenu = () => {
      $('.menu-item-has-children > a, .menu-item-has-children strong').on('click', function () {
        $(this).parent('li').toggleClass('tu-open-menu');
        $(this).next().slideToggle(300);
      });
    };

    responsive();
    collapseMenu();

    $(window).resize(function () {
      responsive();
    });
  }, []);
  useEffect(() => {
    const countUp = () => {
      $('[data-to]').each(function () {
        const $this = $(this);
        const from = parseInt($this.attr('data-from')) || 0;
        const to = parseInt($this.attr('data-to')) || 0;
        const speed = parseInt($this.attr('data-speed')) || 2000;
        const refreshInterval = parseInt($this.attr('data-refresh-interval')) || 50;
        const steps = Math.ceil(speed / refreshInterval);
        const increment = (to - from) / steps;
        let current = from;
        let stepCount = 0;

        const updateCounter = setInterval(() => {
          current += increment;
          stepCount++;
          $this.text(Math.floor(current).toLocaleString());

          if (stepCount >= steps) {
            clearInterval(updateCounter);
            $this.text(to.toLocaleString());
          }
        }, refreshInterval);
      });
    };

    countUp();
  }, []);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    const sliderElement = document.getElementById('tu-sucesstorslider');
    if (sliderElement) {
      const splideInstance = new Splide('#tu-sucesstorslider', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '100px',
        autoplay: true,
        interval: 3000,
        pagination: false,
        arrows: true,
        breakpoints: {
          1199: {
            pagination: true,
            arrows: false,
          },
        },
      });
      splideInstance.mount();
    }
  }, []);
  useEffect(() => {
    const sliderElement = document.getElementById('tu-categoriesslider');
    if (sliderElement) {
      const splideInstance = new Splide('#tu-categoriesslider', {
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: '24px',
        pagination: true,
        arrows: false,
        breakpoints: {
          1199: {
            perPage: 3,
          },
          991: {
            perPage: 2,
          },
          575: {
            perPage: 1,
          },
        },
      });
      splideInstance.mount();
    }
  }, []);
  return (<>
    {/* <!-- Preloader Start --> */}
    {/* <div className="tu-preloader">
      <div className="tu-preloader_holder">
        <img src="/images/favicon.png" alt="laoder Image" />
        <div className="tu-loader"></div>
      </div>
    </div> */}
    {/* <!-- Preloader End --> */}
    {/* <!-- HEADER START --> */}
    <PrimaHeader />
    {/* <!-- HEADER END --> */}
    {/* <!-- BANNER START --> */}
    <div className="tu-banner">
      <div className="container">
        <div className="row align-items-center g-0 gy-5">
          <div className="col-lg-6">
            <div className="tu-banner_title">
              <h1>A good <span>#education</span> is always a base of</h1>
              {/* <span className="tu-bannerinfo type"></span> */}
              <div className="tu-bannerinfo">
                <span className="type" ref={el}></span>
              </div>
              <p>Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate dolore magna aliqua ad minim veniamque.</p>
              <ul className="tu-banner_list">
                <li>
                  <div className="tu-starthere">
                    <span>Start from here</span>
                    <img src="/images/knob_line.svg" alt="logo" />
                  </div>
                  <a href="signup.html" className="tu-primbtn tu-primbtn-gradient"><span>Start as student</span><i className="icon icon-chevron-right"></i></a>
                </li>
                <li><a href="signup.html" className="tu-secbtn"><span>Join as Instructor</span><em>It’s Free!</em></a></li>
              </ul>
              <div className="tu-banner_explore">
                <i className="icon icon-shield"></i>
                <p>You can also join as parent to explore <a href="signup.html">Join today</a></p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="tu-bannerv1_Image">
              <img src="/images/index/banner/img-02.png" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- BANNER END --> */}
    {/* <!-- MAIN START --> */}
    <main className="tu-main">
      {/* <!-- BRANDS START --> */}
      <section>
        <div className="tu-brand">
          <div className="container">
            <ul className="tu-brand_list">
              <li><img src="/images/brand/img-01.png" alt="Image" /></li>
              <li><img src="/images/brand/img-02.png" alt="Image" /></li>
              <li><img src="/images/brand/img-03.png" alt="Image" /></li>
              <li><img src="/images/brand/img-04.png" alt="Image" /></li>
              <li><img src="/images/brand/img-05.png" alt="Image" /></li>
              <li><img src="/images/brand/img-06.png" alt="Image" /></li>
              <li><img src="/images/brand/img-07.png" alt="Image" /></li>
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- BRANDS END --> */}

      {/* <!-- PLATFORM START --> */}
      <section className="tu-main-section">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-md-12 col-lg-6">
              <div className="tu-maintitle p-0">
                <img src="/images/zigzag-line.svg" alt="Image" />
                <h4>Better Learning. Better Results</h4>
                <h2>Online education platform that fits for everyone</h2>
                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
                <a href="how-it-work.html" className="tu-primbtn-lg"><span>Explore more about us</span><i className="icon icon-chevron-right"></i></a>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="tu-betterresult">
                <figure>
                  <img src="/images/index/platform/img-01.png" alt="image-description" />
                </figure>
                <img src="/images/index/platform/img-02.png" alt="image-description" />
                <div className="tu-resultperson">
                  <h6>Founder & CEO</h6>
                  <h5>Allen wake</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- PLATFORM END --> */}
      {/* <!-- COUNTER START --> */}
      <section>
        <div className="tu-statsholder">
          <div className="container">
            <ul id="tu-counter" className="tu-stats">
              <li>
                <img src="/images/stats/img-01.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="560616" data-speed="8000" data-refresh-interval="50">560,616</span></h4>
                  <p>Courses available for verified and top tutors</p>
                </div>
              </li>
              <li>
                <img src="/images/stats/img-02.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="648482" data-speed="8000" data-refresh-interval="50">648,482</span></h4>
                  <p>Total tuition job posted on the platform till date</p>
                </div>
              </li>
              <li>
                <img src="/images/stats/img-03.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="20" data-speed="8000" data-refresh-interval="50">20</span>+ Hours</h4>
                  <p>User daily average time spent on the platform</p>
                </div>
              </li>
              <li>
                <img src="/images/stats/img-04.png" alt="Image" />
                <div className="tu-stats_info">
                  <h4><span data-from="0" data-to="7" data-speed="8000" data-refresh-interval="50">7</span>+ Million</h4>
                  <p>Active instructor and students available on the platform</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- COUNTER END --> */}
      {/* <!-- INSTRUCTOR START --> */}
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
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <li className="splide__slide" key={item}>
                    <div className="tu-featureitem">
                      <figure>
                        <a href="tutor-detail.html"><img src={`/images/index/qualified/img-0${item}.jpg`} alt="image-description" /></a>
                        <span className="tu-featuretag">FEATURED</span>
                      </figure>
                      <div className="tu-authorinfo">
                        <div className="tu-authordetail">
                          <figure>
                            <img src="/images/index/professionol/img-01.jpg" alt="image-description" />
                          </figure>
                          <div className="tu-authorname">
                            <h5><a href="tutor-detail.html"> Dwayne Garrett</a>  <i className="icon icon-check-circle tu-greenclr" data-tippy-trigger="mouseenter" data-tippy-html="#tu-verifed" data-tippy-interactive="true" data-tippy-placement="top"></i></h5>
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
                            <span>(66,951)</span>
                          </div>
                          <div className="tu-instructors_footer-right">
                            <a href="javascript:void(0);"><i className="icon icon-heart"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

              </ul>
            </div>
          </div>
          <div className="tu-mainbtn">
            <a href="search-listing.html" className="tu-primbtn-lg"><span>Explore all instructors</span><i className="icon icon-chevron-right"></i></a>
          </div>
        </div>
      </section>
      {/* <!-- INSTRUCTOR END --> */}

      {/* <!-- SUCCESS START --> */}
      <section id="tu-sucesstorsection">
        <div className="tu-success-stories">
          <div className="container">
            <div className="tu-sucesstor_pattren">
              <img src="/images/index/success_stories/pattren.svg" alt="Image" />
            </div>
            <div className="row tu-sucesstorslider_title">
              <div className="col-lg-8">
                <div className="tu-maintitle">
                  <h2>See how our visitors & members made their <span>#Success Stories</span></h2>
                </div>
              </div>
            </div>
            <div id="tu-sucesstorslider" className="splide tu-sucesstorslider tu-splidearrow">
              <div className="splide__track">
                <ul className="splide__list">
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <li className="splide__slide" key={index}>
                      <div className="tu-sucesstor">
                        <div className="tu-sucesstor_Image">
                          <figure>
                            <img src="/images/index/success_stories/img-01.jpg" alt="Image" />
                            <figcaption><img src="/images/index/success_stories/comma.svg" alt="Image" /></figcaption>
                          </figure>
                        </div>
                        <div className="tu-sucesstor_title">
                          <h3>I highly recommend this platform, amazing experience with fast delivery</h3>
                          <blockquote>“ Their teaching method is conceptual, motivating and friendly. I can clear my doubt any time. They have very deep knowledge of subject and exam pattern, with all the guidance of their tutos, I scored 98% in Mathematics and 96% in Physics. And yet qualified in IIT MAINS with 12th rank. ”</blockquote>
                          <h4>
                            Leonard Sullivan
                            <span>2nd Standard, Manchester UK</span>
                          </h4>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- SUCCESS END --> */}
      {/* <!-- CATEGORIES START --> */}
      <section className="tu-main-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="tu-maintitle text-center">
                <img src="/images/zigzag-line.svg" alt="Image" />
                <h4>Let’s make a quick start today</h4>
                <h2>Choose from the top visited categories you may like</h2>
                <p>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>
              </div>
            </div>
          </div>
          <div id="tu-categoriesslider" className="splide tu-categoriesslider tu-splidedots">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-09.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Music learning</h6>
                      <span>6,301 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-10.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Computer &amp; hardware</h6>
                      <span>4,329 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-11.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Beauty learning</h6>
                      <span>6,406 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-12.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>IT &amp; development</h6>
                      <span>5,925 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-13.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Islamic education</h6>
                      <span>4,157 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-09.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Music learning</h6>
                      <span>6,301 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-10.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Computer &amp; hardware</h6>
                      <span>4,329 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-11.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Beauty learning</h6>
                      <span>6,406 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-12.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>IT &amp; development</h6>
                      <span>5,925 Listings</span>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a className="tu-categories_content" href="search-listing-two.html">
                    <img src="/images/index/categories/img-13.jpg" alt="Image" />
                    <div className="tu-categories_title">
                      <h6>Islamic education</h6>
                      <span>4,157 Listings</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tu-mainbtn">
            <a href="search-listing-two.html" className="tu-primbtn-lg"><span>Explore All categories</span><i className="icon icon-chevron-right"></i></a>
          </div>
        </div>
      </section>
      {/* <!-- CATEGORIES END --> */}
    </main>
    {/* <!-- MAIN END --> */}
    {/* <!-- FOOTER START --> */}
    <PrimaFooter />
    {/* <!-- FOOTER END --> */}
    {/* <!-- Custom Tooltip Render Here --> */}
    {/* <div className="tu-tippysm">
      <span id="tu-verifed" className="d-none">
        <span className="tu-tippytooltip">
          <span>Verified</span>
        </span>
      </span>
    </div> */}

  </>);
}
